package com.main_39.Spring.config.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main_39.Spring.config.oauth.LocalDetails;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.dto.LocalDto;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.mapper.MemberMapper;
import com.main_39.Spring.member.repository.LocalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    /**
     * 회원가입 유저의 로그인(인증)시 필터를 발급하는 클래스
     * @author 유태형
     * @see AuthenticationManager 인증 관리 구현체
     * @see com.main_39.Spring.member.repository.LocalRepository 로컬 회원 레포지토리
     */

    private final String SECRET_KEY = "cos jwt token";

    private final AuthenticationManager authenticationManager;
    private final LocalRepository localRepository;
    private final MemberMapper memberMapper;

    /**
     * 로컬 회원 로그인시 아이디,비밀번호 확인 후 토큰 발급
     * @author 유태형
     * @exception AuthenticationException 인증 예외
     * @throw IOException 입출력 예외
     * @return Authentication 인증객체
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("로그인 과정 시작");
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            Valid.Login login = objectMapper.readValue(request.getInputStream(),Valid.Login.class); //아이디, 비밀번호

            //로컬 회원 정보 불러오기

            System.out.println("비밀번호 : " + login.getPassword());

            //이메일 비교
            Local local = localRepository.findByEmail(login.getEmail()).orElseThrow(
                    () -> new BusinessLogicException(ExceptionCode.LOGIN_INVALID_LOGIN_INFO));

            //비밀번호 비교
            if(!local.getPassword().equals(login.getPassword())) throw new BusinessLogicException(ExceptionCode.LOGIN_INVALID_LOGIN_INFO);

            //세션에 로그인 처리
            LocalDetails localDetails = new LocalDetails(local);
            Authentication authentication   = new UsernamePasswordAuthenticationToken(localDetails,localDetails.getPassword(),localDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("로그인 완료");
            return authentication;
        }catch(IOException e){
            System.out.println("회원 정보가 올바른 지 확인 해주세요");
        }

        return null;
    }

    /**
     * 로그인 인증 성공시 토큰 발급하는 메서드
     * @author 유태형
     * @exception IOException 입출력 예외
     * @exception ServletException 서블릿 관련 예외
     * @return void 없음
     * */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("로컬 토큰 발행 시작");
        LocalDetails localDetails = (LocalDetails)authResult.getPrincipal();
        Local local = localDetails.getLocal();

        //refresh_token 생성
        String local_refresh_token = JWT.create()
                .withClaim("local_id",local.getLocalId())
                .withClaim("email",local.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + (2 * 30 * 24 * 60 * 60 * 1000)))
                .sign(Algorithm.HMAC512(SECRET_KEY));

        //DB에 저장
        local.setRefreshToken(local_refresh_token);
        localRepository.save(local);

        //access_token 생성
        String local_access_token = JWT.create()
                .withClaim("refresh_token",local_refresh_token)
                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 60 * 1000)))
                .sign(Algorithm.HMAC512(SECRET_KEY));

        System.out.println("local_access_token : " + local_access_token);
        System.out.println("local_refresh_token : " + local_refresh_token);

        //실제 통신에선 httpOnly, secure 설정 추가할 것(Postman 이슈)

        //access_token 쿠키 추가
        ResponseCookie local_access_cookie = ResponseCookie.from("local_access_token",local_access_token)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(10 * 60) // 10분
                .build();
        response.addHeader("Set-Cookie", local_access_cookie.toString());

        //refresh_token 쿠키 추가
        ResponseCookie local_refresh_cookie = ResponseCookie.from("local_refresh_token",local_refresh_token)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60 * 24 * 30 * 2) // 2달
                .build();
        response.addHeader("Set-Cookie",local_refresh_cookie.toString());

        //로컬 회원정보 반환
        LocalDto.response posted = memberMapper.localToLocalDtoResponse(local);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(posted);
        response.getWriter().write(json);


        System.out.println("로컬 토큰 발행 완료");
    }
}
