package com.main_39.Spring.member.service;

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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    /**
     * 회원관련 비즈니스 로직을 처리하는 Service
     * @author 유태형
     * @see com.main_39.Spring.member.repository.KakaoRepository 카카오 레포지토리
     * @see com.main_39.Spring.member.repository.LocalRepository 로컬 레포지토리
     * @see org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder 암호화 Encoder
     * */
    private final KakaoRepository kaKaoRepository;
    private final LocalRepository localRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final String SECRET_KEY = "cos jwt token";

    /**
     * 토큰을 획득하는 메서드
     * */
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
//        params.add("redirect_uri","http://localhost:8080/login/oauth2/code/kakao"); //로컬 확인용
//        params.add("redirect_uri","http://127.0.0.1:3000");
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
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

    }


    /**
     * 로컬 회원가입
     * */
    public Local createLocal(Local local){
        verifyExistsLocal(local.getEmail());
        // 비밀번호 암호화(Security가 암호화 강제함)
//        String rawPass = local.getLocalPassword();
//        String encPass = bCryptPasswordEncoder.encode(rawPass);
//        local.setLocalPassword(encPass);
        return localRepository.save(local);
    }

    /**
     * 로컬Id로 회원 찾기
     * */
    @Transactional(readOnly = true)
    public Local findVerifiedLocal(long localId){
        Optional<Local> optionalLocal = localRepository.findById(localId);
        Local findLocal =
                optionalLocal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO));
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
                        new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN));
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
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO));
        return findLocal;
    }

   /**
    * 이미 존재하는 로컬회원인지 확인
    * */
    private void verifyExistsLocal(String email){
        Optional<Local> local = localRepository.findByEmail(email);
        if(local.isPresent())
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EMAIL_DUPLICATE);
    }

    /**
     * 이름, 휴대폰 번호로 계정 찾기
     * */
    public Local verifyEmail(String name, String phone){
        Local findLocal = localRepository.findByNameAndPhone(name,phone).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO)
        );
        return findLocal;
    }

    /**
     * 이메일, 이름, 휴대폰 번호로 비밀번호 찾기
     * */
    public Local verifyPassword(String email, String name, String phone){
        Local findLocal = localRepository.findByEmailAndNameAndPhone(email, name, phone).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO)
        );
        return findLocal;
    }

    /**
     * 카카오 마이 페이지
     * */
    public Kakao getKakaoInfo(String access_token){

        //RestTemplate
        RestTemplate rt = new RestTemplate();

        //헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + access_token);

        //바디

        //HttpEntity
        HttpEntity<MultiValueMap<String,String>> kakaoUserInfo = new HttpEntity<>(headers);
        //exchange
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

        Kakao findKakao = findVerifiedKakao(access.getId());
        return findKakao;
    }

    /**
     * 로컬 마이페이지
     * */
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
            throw new BusinessLogicException(ExceptionCode.AUTH_EXPIRED_TOKEN);
        }

        Local localByEmail = findVerifiedLocalByEmail(accountEmail); //이메일로 찾은 회원

        if(localId != localByEmail.getLocalId()) throw new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN);

        return localByEmail;
    }

}
