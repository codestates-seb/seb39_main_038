package com.main_39.Spring.config.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main_39.Spring.config.oauth.KakaoDetails;
import com.main_39.Spring.config.oauth.LocalDetails;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.repository.KakaoRepository;
import com.main_39.Spring.member.repository.LocalRepository;
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
import java.util.Date;


public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    /**
     * 인증된 사용자를 인가 처리하는 클래스
     * @author 유태형
     * @see com.main_39.Spring.member.repository.KakaoRepository 카카오 회원 레포지토리
     * @see com.main_39.Spring.member.repository.LocalRepository 로컬 회원 레포지토리
     * @see AuthenticationManager 인증 관리 구현체
     * */
    private final String SECRET_KEY = "cos jwt token";

    private KakaoRepository kakaoRepository;
    private LocalRepository localRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,KakaoRepository kakaoRepository,LocalRepository localRepository){
        super(authenticationManager);
        this.kakaoRepository = kakaoRepository;
        this.localRepository = localRepository;
    }

    /**
     * 인증된 사용자의 인가를 처리하는 메서드
     * @author 유태형
     * @exception IOException 입출력 예외
     * @exception ServletException 서블릿 관련 에러
     * @throw BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO) 회원 아이디로 회원 정보를 찾을 수 없는 예외
     * @throw new BusinessLogicException(ExceptionCode.AUTH_NOT_MATCH_TOKEN) 토큰에 해당하는 사용자 정보가 없는 예외
     * @return void
     * */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증 권한이 필요한 리소스에 접근");

        /*
        * Request 헤더의 인자로 로그인 구분(Local, Kakao)
        */

        String login = request.getHeader("login");
        if(login == null) login = "guest";

        if(login.equals("local")){ // 로컬 로그인

            /*
            * 로컬 유저 정보 확인 로직 분기
            * 1. access_token 복호화한 다음 id, email 교차 검증 -> 인가
            * 2. refresh_token 검증 -> access_token 재발급, 인가
            * 3. access_token, refresh_token 모두 다르면 인가 x
            */

            // 로컬 회원
            Local local = null;

            //Cookie에서 access_token ,refresh_token 수령
            Cookie[] cookies = request.getCookies();

            Cookie access_cookie = null;
            Cookie refresh_cookie = null;
            String access_token = "";
            String refresh_token = "";

            if(cookies != null)
                for(Cookie cookie: cookies){
                    if(cookie.getName().equals("local_access_token")) access_cookie = cookie;
                    if(cookie.getName().equals("local_refresh_token")) refresh_cookie = cookie;
                }

            if(access_cookie != null) access_token = access_cookie.getValue();
            if(refresh_cookie != null) refresh_token = refresh_cookie.getValue();

            //refresh_token으로 정보 가져오기
            long local_id =  0;
            String account_email = "";

            // 1. access_token 복호화한 다음 id, email 교차 검증 -> 인가
            String decode_access_token = "";
            long decode_local_id =  -1;
            String decode_account_email = "-1";

            try{
                //refresh_token으로 정보 가져오기
                local_id =  JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("local_id").asLong();
                account_email = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(refresh_token).getClaim("email").asString();
            }catch(Exception e){
                System.out.println("유효한 refresh_token 없음, access_token 재 발행 실패했으므로 인증권한이 없습니다.");
                chain.doFilter(request,response);
                return;
            }

            try{
                // 1. access_token 복호화한 다음 id, email 교차 검증 -> 인가
                decode_access_token = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(access_token).getClaim("refresh_token").asString();
                decode_local_id =  JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(decode_access_token).getClaim("local_id").asLong();
                decode_account_email = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(decode_access_token).getClaim("email").asString();
            }catch(Exception e){
                System.out.println("유효한 access_token 없음");
                //access_token은 안되면 재발급
            }

            //access_token -> refresh_token, id, email 검증
            //access_token이 만료 or 손상 되었다면
            if(!(decode_access_token.equals(refresh_token)) || !(decode_local_id == local_id) || !(decode_account_email.equals(account_email))){
                // 2. refresh_token 검증 -> access_token 재발급, 인가
                local = localRepository.findByEmail(account_email).orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO));

               //refresh_token의 email, id와 데이터베이스의 Id값을 비교
                if(local_id != local.getLocalId()){
                    // 3. access_token(x), refresh_token(x) -> 로그인 실패
                    System.out.println("유효한 refresh_token 없음, access_token 재 발행 실패했으므로 인증권한이 없습니다.");
                    chain.doFilter(request, response);
                    return;
                }

                //access_token(x), refresh_token(o) -> access_token 재 발급
                access_token = JWT.create()
                        .withClaim("refresh_token",refresh_token)
                        .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 60 * 1000)))
                        .sign(Algorithm.HMAC512("cos jwt token"));
                System.out.println("access_token 재발급 : " + access_token);

                //access_token 쿠키 수정
                ResponseCookie local_access_cookie = ResponseCookie.from("local_access_token",access_token)
                        .path("/")
                        .sameSite("None")
                        .secure(true)
                        .httpOnly(true)
                        .maxAge(10 * 60) // 10분
                        .build();
                response.addHeader("Set-Cookie", local_access_cookie.toString());
            }
            // 1. access_token(o), refresh_token(o)
            if(local == null) {
                local = localRepository.findByEmail(account_email).orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO));
                System.out.println("access_token 유효함 : " + access_token);
            }

            System.out.println("로컬 로그인 성공, 엑세스 토큰 : " + access_token);

            //Authorization (세션에 추가)
            LocalDetails localDetails = new LocalDetails(local);
            Authentication authentication = new UsernamePasswordAuthenticationToken(localDetails,localDetails.getPassword(),localDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);


        }else if(login.equals("kakao")){ //카카오 로그인

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

            //Cookie에서 access_token ,refresh_token 수령
            Cookie[] cookies = request.getCookies();

            Cookie access_cookie = null;
            Cookie refresh_cookie = null;
            String access_token = "";
            String refresh_token = "";

            if(cookies != null)
                for(Cookie cookie: cookies){
                    if(cookie.getName().equals("kakao_access_token")) access_cookie = cookie;
                    if(cookie.getName().equals("kakao_refresh_token")) refresh_cookie = cookie;
                }

            if(access_cookie != null) access_token = access_cookie.getValue();
            if(refresh_cookie != null) refresh_token = refresh_cookie.getValue();

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
                    ResponseCookie update_access_cookie = ResponseCookie.from("kakao_access_token", access_token)
                            .path("/")
                            .sameSite("None")
                            .secure(true)
                            .httpOnly(true)
                            .maxAge(60 * 60)
                            .build();
                    response.addHeader("Set-Cookie", update_access_cookie.toString());

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

            System.out.println("카카오 로그인 성공, 엑세스 토큰 : " + access_token);

            //Authorization (세션에 추가)
            KakaoDetails kakaoDetails = new KakaoDetails(kakao);
            Authentication authentication = new UsernamePasswordAuthenticationToken(kakaoDetails,null,kakaoDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }else{ //로컬 x, 카카오 x -> 에러
            System.out.println("로그인을 선택하지 않았습니다. 비인가만 가능");
            chain.doFilter(request, response);
            return;
        }

        super.doFilterInternal(request, response, chain);
    }



}
