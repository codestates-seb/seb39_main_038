package com.main_39.Spring.config.oauth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.LinkedHashMap;

@Component
public class MyOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private String SECRET_KEY = "secret_jwt_key";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication authentication) {
        String id = authentication.getName();
        System.out.println("id : " + id);
        LinkedHashMap<String, Object> kakao_account = (LinkedHashMap<String, Object>) ((KakaoDetails)authentication.getPrincipal()).getAttributes().get("kakao_account");
        String email = (String) kakao_account.get("email");
        System.out.println("email : " + email);

        String token = JWT.create()
                .withClaim("id", id)
                .withClaim("email", email)
                .withExpiresAt(new Date(System.currentTimeMillis() + (6*60*60*1000))) //토큰 시간 : 카카오 6시간과 일치시킴
                .sign(Algorithm.HMAC512(SECRET_KEY));

        // JWT -> BE
        res.addHeader("Authorization", "Bearer " + token);
        //access_token -> 카카오
        res.addHeader("access_token",(String)((KakaoDetails)authentication.getPrincipal()).getAttributes().get("access_token"));
    }
}