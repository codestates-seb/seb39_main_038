package com.main_39.Spring.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final KakaoRepository kaKaoRepository;
    private final LocalRepository localRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //토큰 얻는 메서드
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
        params.add("redirect_uri","http://127.0.0.1:3000");
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


    //토큰 -> 유저 정보
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



    //카카오 회원 가입
    public Kakao createKakao(Kakao kakao){
        return kaKaoRepository.save(kakao);
    }

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


    //로컬 회원 가입
    public Local createLocal(Local local){
        verifyExistsLocal(local.getAccountEmail());
        // 비밀번호 암호화(Security가 암호화 강제함)
        String rawPass = local.getLocalPassword();
        String encPass = bCryptPasswordEncoder.encode(rawPass);
        local.setLocalPassword(encPass);
        return localRepository.save(local);
    }

    @Transactional(readOnly = true)
    public Local findVerifiedLocal(long localId){
        Optional<Local> optionalLocal = localRepository.findById(localId);
        Local findLocal =
                optionalLocal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO));
        return findLocal;
    }

    @Transactional(readOnly = true)
    public Kakao findVerifiedKakao(long kakao_id){
        Optional<Kakao> optionalKakao = kaKaoRepository.findById(kakao_id);
        Kakao findKakao =
                optionalKakao.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN));
        return findKakao;
    }

    @Transactional(readOnly = true)
    public Local findVerifiedLocalByEmail(String email){
        Optional<Local> optionalLocal = localRepository.findByAccountEmail(email);
        Local findLocal =
                optionalLocal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.NOT_MATCH_USER_INFO));
        return findLocal;
    }

    // 로컬 회원 중복 확인
    private void verifyExistsLocal(String email){
        Optional<Local> local = localRepository.findByAccountEmail(email);
        if(local.isPresent())
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EMAIL_DUPLICATE);
    }

}
