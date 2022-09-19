package com.main_39.Spring.config.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.main_39.Spring.config.oauth.PrincipalDetails;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.repository.KakaoRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private String SECRET_KEY = "secret_jwt_key";
    private KakaoRepository kakaoRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,KakaoRepository kakaoRepository){
        super(authenticationManager);
        this.kakaoRepository = kakaoRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증 권한이 필요한 리소스에 접근");

        //토큰 존재여부 확인
        String jwtHeader = request.getHeader("Authorization");

        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")){
            chain.doFilter(request,response);
            return;
        }

        //토큰 해독
        String jwtToken = jwtHeader.replace("Bearer ", "");
        long id = Long.parseLong(JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(jwtToken).getClaim("id").asString());
        String email = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(jwtToken).getClaim("email").asString();
        String access_token = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(jwtToken).getClaim("access_token").asString();

        //유효성 검증
        Kakao kakao = kakaoRepository.findByEmail(email).get(); //후보키로 찾은 데이터
        System.out.println("access_token : " + access_token);

        if(id == kakao.getKakao_id()){ //일치 여부 확인
            PrincipalDetails principalDetails = new PrincipalDetails(kakao);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("인증 성공");
            chain.doFilter(request,response);
        }
        super.doFilterInternal(request, response, chain);
    }
}
