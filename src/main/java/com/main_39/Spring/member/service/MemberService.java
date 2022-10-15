package com.main_39.Spring.member.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.main_39.Spring.config.filter.Valid;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.dto.KakaoDto;
import com.main_39.Spring.member.dto.KakaoProfile;
import com.main_39.Spring.member.dto.OAuthToken;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.repository.KakaoRepository;
import com.main_39.Spring.member.repository.LocalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    /**
     * 회원관련 비즈니스 로직을 처리하는 Service
     * @author 유태형
     * @see KakaoRepository 카카오 레포지토리
     * @see LocalRepository 로컬 레포지토리
     * @see JavaMailSenderImpl 인증 메일 전송
     * */
    private final KakaoRepository kaKaoRepository;
    private final LocalRepository localRepository;
    private final JavaMailSenderImpl mailSender;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final String AUTH_EMAIL = "yapick38@gmail.com";

    private final String SECRET_KEY = "cos jwt token";

    /**
     * 토큰을 획득하는 메서드
     * */
    @Transactional
    public OAuthToken getToken(String code){
        //Post방식으로 key=value 데이터를 요청 (카카오쪽으로)
        //Retrofit2
        //OkHttp
        //RestTemplate

        RestTemplate rt = new RestTemplate();

        //HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

        //HttpBody 오브젝트 생성
        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id","704ec763b63cc0eb75e0f897b8f91ed0");
        params.add("client_secret","uJ06mEQStcdLrcUyuzdyt4YN2oO1X4NO");
        params.add("redirect_uri","https://yapick.netlify.app");
        params.add("code",code);

        //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest =
                new HttpEntity<>(params,headers);

        //Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받기
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        //Gson, Json Simple, ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(response.getBody(),OAuthToken.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        System.out.println("카카오 엑세스 토큰 : " + oauthToken.getAccess_token());
        return oauthToken;
    }


    /**
     * 토큰 -> 유저정보
     * */
    @Transactional
    public KakaoProfile getKaKaoProfile(OAuthToken oauthToken){
        RestTemplate rt = new RestTemplate();

        //HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + oauthToken.getAccess_token());
        headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

        //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String,String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        //Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받기
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );


        //Gson, Json Simple, ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(response.getBody(),KakaoProfile.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }
        System.out.println("카카오 아이디(번호) : " + kakaoProfile.getId());
        System.out.println("카카오 이메일 : " + kakaoProfile.getKakao_account().getEmail());

        return kakaoProfile;
    }



    /**
     * 카카오 로그인 (처음 로그인 시 회원가입)
     * */
    @Transactional
    public Kakao createKakao(Kakao kakao){
        Optional<Kakao> optionalKakao = kaKaoRepository.findById(kakao.getKakaoId());
        //마일리지 보존
        if(optionalKakao.isPresent()){
            Kakao findKakao = optionalKakao.get();
            kakao.setMileage(findKakao.getMileage());
        }

        return kaKaoRepository.save(kakao);
    }

    /**
     * 카카오 로그아웃
     * */
    @Transactional
    public void logoutKakao(String access_token){
        //RestTemplate
        RestTemplate rt = new RestTemplate();

        //RequestHeader
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type","application/x-www-form-urlencoded");
        headers.add("Authorization", "Bearer " + access_token);

        //HttpEntity
        HttpEntity<MultiValueMap<String,Object>> kakaoLogoutRequest = new HttpEntity<>(headers);

        //요청(rt.exchange)
        ResponseEntity<String> logout = rt.exchange(
                "https://kapi.kakao.com/v1/user/logout",
                HttpMethod.POST,
                kakaoLogoutRequest,
                String.class
        );

        //ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoDto.logoutDto logoutDto = null;
        try {
            logoutDto = objectMapper.readValue(logout.getBody(),KakaoDto.logoutDto.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        kaKaoRepository.findById(logoutDto.getId()).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)); //404, Member not found

    }


    /**
     * 로컬 회원가입
     * */
    @Transactional
    public Local createLocal(Local local){
        //회원이 중복인지 확인
        verifyExistsLocal(local.getEmail());
        //S3에 이미지 저장 후 DB에 URL 저장
        if(local.getAvatar() != null) saveAvatarToS3(local);
        return localRepository.save(local);
    }

    /**
     * S3에 이미지 저장 후 URL 반환
     * */

    private void saveAvatarToS3(Local local){
        //BASE64에서 데이터부분만
        String data;
        try{
            data = local.getAvatar().split(",")[1];
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("S3에 회원 프로필 입력 실패");
            throw new BusinessLogicException(ExceptionCode.OAUTH_USERINFO_REQUEST_FAILED); //3002, 서버로의 회원정보 요청이 실패했습니다.
        }
        //S3내 파일 명
        String s3FileName =  "avatar/" + local.getEmail();
        //Base64 디코딩
        byte[] decodeByte = Base64.getDecoder().decode(data);
        InputStream inputStream = new ByteArrayInputStream(decodeByte);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        try {
            objectMetadata.setContentLength(inputStream.available());
        } catch (IOException e) {
            System.out.println("S3에 회원 프로필 입력 실패");
            throw new BusinessLogicException(ExceptionCode.OAUTH_USERINFO_REQUEST_FAILED); //3002, 서버로의 회원정보 요청이 실패했습니다.
        }

        //S3에 저장
        amazonS3.putObject(bucket,s3FileName,inputStream,objectMetadata);
        //URL 가져옴
        local.setAvatar(amazonS3.getUrl(bucket,s3FileName).toString());
    }


    /**
     * 로컬 로그아웃
     * */
    @Transactional
    public void logoutLocal(String access_token){

        //토큰 정보로 로컬 회원정보 찾기
        String refresh_token = "";
        long localId = -1;
        String accountEmail = "";

        try{
            //access_token -> refresh_token
            refresh_token = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(access_token).getClaim("refresh_token").asString();
            //refresh_token -> id, email
            localId = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("local_id").asLong();
            accountEmail = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("email").asString();
        }catch(Exception e){
            throw new BusinessLogicException(ExceptionCode.AUTH_EXPIRED_TOKEN); //2001, 유효기간이 만료된 토큰입니다.
        }
        Local local = findVerifiedLocalByEmail(accountEmail);
        if(localId != local.getLocalId()) throw new BusinessLogicException(ExceptionCode.AUTH_INVALID_TOKEN); //2002, 유효하지 않은 토큰입니다.

        //DB에 존재하는 로컬의 refresh_token 초기화
        local.setRefreshToken("");
        localRepository.save(local);
    }

    /**
     * 로컬Id로 회원 찾기
     * */
    @Transactional(readOnly = true)
    public Local findVerifiedLocal(long localId){
        Optional<Local> optionalLocal = localRepository.findById(localId);
        Local findLocal =
                optionalLocal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO)); //4003, 유저 정보가 일치하지 않습니다.
        return findLocal;
    }

    /**
     * 카카오Id로 회원 찾기
     * */
    @Transactional(readOnly = true)
    public Kakao findVerifiedKakao(long kakao_id){
        Optional<Kakao> optionalKakao = kaKaoRepository.findById(kakao_id);
        Kakao findKakao =
                optionalKakao.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN)); //2003, 일치하지 않는 토큰입니다.
        return findKakao;
    }


    /**
     * 로컬 이메일로 회원 찾기
     * */
    @Transactional(readOnly = true)
    public Local findVerifiedLocalByEmail(String email){
        Optional<Local> optionalLocal = localRepository.findByEmail(email);
        Local findLocal =
                optionalLocal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO)); //4003, 유저 정보가 일치하지 않습니다.
        return findLocal;
    }

   /**
    * 이미 존재하는 로컬회원인지 확인
    * */
    private void verifyExistsLocal(String email){
        Optional<Local> local = localRepository.findByEmail(email);
        if(local.isPresent())
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EMAIL_DUPLICATE); //1003, 이미 사용중인 이메일 입니다.
    }

    /**
     * 이름, 휴대폰 번호로 계정 찾기
     * */
    @Transactional
    public Local verifyEmail(String name, String phone){
        Local findLocal = localRepository.findByNameAndPhone(name,phone).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO) //4004, 해당 유저 정보가 존재하지 않습니다.
        );
        return findLocal;
    }

    /**
     * 인증 메일 전송
     * */
    @Transactional
    public void sendMail(Local local){
        //난수 생성
        Random r = new Random();
        int checksum = r.nextInt(888888) + 111111;
        System.out.println("인증 번호 : " + checksum);
        String authNumber = String.valueOf(checksum); //문자열로 저장

        //이메일 양식
        String title = "야 픽 비밀번호 찾기 인증 이메일 입니다.";
        String content =
                "야픽을 방문해주셔서 감사합니다." + 	//html 형식으로 작성 !
                        "<br><br>" +
                        "인증 번호는 " + authNumber + "입니다." +
                        "<br>" +
                        "해당 인증번호를 인증번호 확인란에 기입하여 주세요."; //이메일 내용 삽입

        //이메일 전송
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");
            helper.setFrom(AUTH_EMAIL);
            helper.setTo(local.getEmail());
            helper.setSubject(title);
            helper.setText(content,true);
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("이메일 인증 요청 실패");
            throw new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO); //4004, 해당 유저 정보가 존재하지 않습니다.
        }

        //인증번호를 refresh_token에 저장 -> 로그인 전까지 필요 없음 but 이메일 인증은 로그인 하면 할 수 없는 작업 -> refresh_token 필드 사용 가능
        local.setRefreshToken(authNumber);
        localRepository.save(local);

        System.out.println("인증번호 : " + local.getRefreshToken());
    }

    /**
     * 이메일, 이름, 휴대폰 번호로 비밀번호 찾기
     * */
    @Transactional
    public Local verifyExistLocalToStatus(String email,String authCode){
        Local findLocal = localRepository.findByEmailAndRefreshToken(email,authCode).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO)); //4004, 해당 유저 정보가 존재하지 않습니다.

        return findLocal;
    }

    /**
     * 카카오 마이 페이지
     * */
    @Transactional
    public Kakao getKakaoInfo(String access_token){

        //RestTemplate
        RestTemplate rt = new RestTemplate();

        //헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + access_token);

        //바디

        //HttpEntity
        HttpEntity<MultiValueMap<String,String>> kakaoUserInfo = new HttpEntity<>(headers);
        //exchange : access_token -> 카카오id
        ResponseEntity<String> userInfo = rt.exchange(
                "https://kapi.kakao.com/v1/user/access_token_info",
                HttpMethod.GET,
                kakaoUserInfo,
                String.class
        );

        //ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper().setPropertyNamingStrategy(PropertyNamingStrategy.LOWER_CAMEL_CASE);
        Valid.Access access = null;
        try {
            access = objectMapper.readValue(userInfo.getBody(), Valid.Access.class);
        }catch (JsonMappingException e){
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 카카오 ID -> 카카오 유저 정보
        Kakao findKakao = findVerifiedKakao(access.getId());
        return findKakao;
    }

    /**
     * 로컬 마이페이지
     * */
    @Transactional
    public Local getLocalInfo(String access_token){
        String refresh_token = "";
        long localId = 0;
        String accountEmail = "";

        try{
            //access_token -> refresh_token
            refresh_token = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(access_token).getClaim("refresh_token").asString();
            //refresh_token -> id, email
            localId = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("local_id").asLong();
            accountEmail = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("email").asString();
        }catch(Exception e){
            throw new BusinessLogicException(ExceptionCode.AUTH_EXPIRED_TOKEN); //2001, 유효기간이 만료된 토큰입니다.
        }

        Local localByEmail = findVerifiedLocalByEmail(accountEmail); //이메일로 찾은 회원
        if(localId != localByEmail.getLocalId()) throw new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN); //2003, 일치하지 않는 토큰입니다.

        return localByEmail;
    }

    /**
     * 비밀번호 변경
     * */
    @Transactional
    public void changePassword(String email, String password){
        try{
            Local findLocal = findVerifiedLocalByEmail(email);
            findLocal.setPassword(password);
            localRepository.save(findLocal); //새로운 비밀번호 저장
            System.out.println("이메일 변경 : " + findLocal.getPassword()); //바뀐 비밀번호
        }catch(Exception e){ //에러 발생 시
            System.out.println("회원이 존재하지 않습니다!");
            throw new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO); //4003, 유저 정보가 일치하지 않습니다.
        }
    }
}
