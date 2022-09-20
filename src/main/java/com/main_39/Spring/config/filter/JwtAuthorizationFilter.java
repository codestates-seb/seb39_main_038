package com.main_39.Spring.config.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main_39.Spring.config.oauth.PrincipalDetails;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.repository.KakaoRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private KakaoRepository kakaoRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,KakaoRepository kakaoRepository){
        super(authenticationManager);
        this.kakaoRepository = kakaoRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증 권한이 필요한 리소스에 접근");

        /*
        * 카카오 유저 정보 확인 로직 분기
        * 1. access_token으로 토큰 정보 보기 -> 사용자 정보 가져오기
        * 2. 사용자 정보 가져오기 실패 시 refresh_token으로 토큰 갱신하기 -> 새로운 access_token으로 사용자 정보 가져오기
        * 3. 그 외(토큰 정보 가져오기 -> 401외 다른 에러, access_token 갱신 실패)토큰 갱신 실패 -> 로그인 redirect
        */

        //RestTemplate
        RestTemplate rt = new RestTemplate();

        //JSON -> Object
        ObjectMapper objectMapper = new ObjectMapper();

        // 1. access_token으로 토큰 정보 보기 -> 사용자 정보 가져오기

        //Request Header에서 access_token ,refresh_token 수령
        String access_token = request.getHeader("access_token");
        String refresh_token = request.getHeader("refresh_token");

        Kakao kakao = null;

        //Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + access_token);

        //HttpEntity
        HttpEntity<MultiValueMap<String,String>> accessEntity = new HttpEntity<>(headers);


        try{
            //Http 요청
            ResponseEntity<String> accessValid = rt.exchange(
                    "https://kapi.kakao.com/v1/user/access_token_info",
                    HttpMethod.GET,
                    accessEntity,
                    String.class
            );

            //토큰 정보 보기 respnoseBody
            Valid.Access access = null;
            try {
                access = objectMapper.readValue(accessValid.getBody(),Valid.Access.class);
            } catch (JsonMappingException e) {
                e.printStackTrace();
            } catch (JsonProcessingException e){
                e.printStackTrace();
            }

            //사용자 인증 (카카오 서버의 id값과 DB의 id값이 다르면 일치하지 않으면 AUTH_NOT_MATCH_TOKEN 예외)
            long id = access.getId();
            kakao = kakaoRepository.findById(id).orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN));

        }catch(HttpClientErrorException e){
            System.out.println("유효한 access_token 없음");
            //access_token은 안 되지만 refresh_token은 될 수 있으므로 계속함
        }

        // 2. code: -401 -> refresh_token으로 토큰 갱신하기 -> access_token쿠키에 담기 사용자 정보 가져오기
        if(kakao == null) { //access_token으로 유저정보를 못 찾았다면 -> refresh_token으로 access_token다시 받고 다시 받은 acess_token으로 유저정보 찾기
            //헤더
            HttpHeaders refreshHeader = new HttpHeaders();
            refreshHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            //바디
            MultiValueMap<String, String> refreshParams = new LinkedMultiValueMap<>();
            refreshParams.add("grant_type", "refresh_token");
            refreshParams.add("client_id", "704ec763b63cc0eb75e0f897b8f91ed0");
            refreshParams.add("client_secret", "uJ06mEQStcdLrcUyuzdyt4YN2oO1X4NO");
            refreshParams.add("refresh_token", refresh_token);

            //HttpEntity
            HttpEntity<MultiValueMap<String, String>> refreshEntity =
                    new HttpEntity<>(refreshParams, refreshHeader);


            try {
                //Http 요청하기
                ResponseEntity<String> refreshValid = rt.exchange(
                        "https://kauth.kakao.com/oauth/token",
                        HttpMethod.POST,
                        refreshEntity,
                        String.class
                );

                //토큰 정보 보기 respnoseBody
                Valid.Refresh refresh = null;
                try {
                    refresh = objectMapper.readValue(refreshValid.getBody(), Valid.Refresh.class);
                } catch (JsonMappingException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

                //access_token 새로 재 발급
                access_token = refresh.getAccess_token();
                System.out.println(access_token);

                //쿠키 수정
                ResponseCookie access_cookie = ResponseCookie.from("access_token", access_token)
                        .path("/")
                        .sameSite("None")
                        .httpOnly(true)
                        .maxAge(60 * 60)
                        .build();
                response.setHeader("Set-Cookie", access_cookie.toString());

            } catch (HttpClientErrorException e) { //access_token(x) and refresh_token(x) -> 로그인 실패
                System.out.println("유효한 refresh_token 없음, access_token 재 발행 실패했으므로 인증권한이 없습니다.");
                chain.doFilter(request, response);
                return;
            }

            //access_token(x) and refresh_token(o)
            //access_token 재발행 -> 다시 사용자 정보 가져오기

            //Header 생성
            HttpHeaders newHeader = new HttpHeaders();
            newHeader.add("Authorization", "Bearer " + access_token);

            //HttpEntity
            HttpEntity<MultiValueMap<String, String>> newAccessEntity = new HttpEntity<>(newHeader);


            try {
                //Http 요청
                ResponseEntity<String> newAccessValid = rt.exchange(
                        "https://kapi.kakao.com/v1/user/access_token_info",
                        HttpMethod.GET,
                        newAccessEntity,
                        String.class
                );

                //토큰 정보 보기 respnoseBody
                Valid.Access newAccess = null;
                try {
                    newAccess = objectMapper.readValue(newAccessValid.getBody(), Valid.Access.class);
                } catch (JsonMappingException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                //사용자 인증 (카카오 서버의 id값과 DB의 id값이 다르면 일치하지 않으면 AUTH_NOT_MATCH_TOKEN 예외)
                long id = newAccess.getId();
                kakao = kakaoRepository.findById(id).orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN));

            } catch (HttpClientErrorException e) { //기타 에러 -> 로그인 실패
                System.out.println("로그인 실패");
                chain.doFilter(request, response);
                return;
            }
        }
        //로그인(세션에 추가)
        PrincipalDetails principalDetails = new PrincipalDetails(kakao);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,null,principalDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        super.doFilterInternal(request, response, chain);
    }
}
