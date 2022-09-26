package com.main_39.Spring.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
    private final CorsFilter corsFilter;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        /**
         * 스프링 백엔드 보안 설정, 경로별 권한 지정, 로그인과 로그아웃을 설정하는 체인 메서드
         * @author 유태형
         * @exception Exception 설정 관련 예외
         * @param HttpSecurity 리소스 권한, 로그인 로그아웃, 필터, csrf 호출등 스프링시큐리티의 거의 대부분설정을 담당하는 객체
         * @return SecurityFilterChain 설정을 담당하는 필터들을 체인형식으로 묶어놓은 인터페이스
         * */
        http.csrf().disable()
                .httpBasic().disable();
        http.headers().frameOptions().disable();
        http
                /*
                * On = Session : OAuth2.0 + Security
                * OFF = 토큰 : OAuth2.0 + JWT
                * */
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
             .and()
                .apply(new CustomDsl())
                .and()
//                .formLogin().disable()
                .authorizeRequests()
                //권한 설정
                .antMatchers("/css/**","/image/**","/js/**","/h2-console/**","/favicon.ico").permitAll()
                .antMatchers("/signup","/login/**","/oauth2/**","/oauth/**","/h2/**","/v2/**").permitAll()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/login")
                .and()
                .logout()
                .deleteCookies("local_access_token","local_refresh_token"); //로컬 access_token, refresh_token 쿠키 삭제

                /*
                * SpringSecurity5 + OAuth2 + JWT -> Refresh_token 해결할 것
                * */
//                // SpringSecurity의 OAuth2.0
//                .and()
//                .oauth2Login()
//                .loginPage("/login")
//                // 코드 받음
//                .authorizationEndpoint()
//                .baseUri("/oauth2/authorization/**")
//                //코드 -> 토큰 받음
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/login/oauth2/code/**")
//                // 토큰 -> 유저 정보 받음
//                .and()
//                .userInfoEndpoint()
//                .userService(kakaoOAuth2UserService)
//                .and()
//                .successHandler(new MyOAuth2SuccessHandler());

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        /**
         * 비밀번호를 단방향 암호화 하기위한 클래스
         * @deprecated
         * */
        return new BCryptPasswordEncoder();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            /**
             * CORS 설정, 인증 설정, 인가 설정 필터들을 묶어 놓는 메서드
             * @author 유태형
             * @exception Exception 설정 관련 예외
             * @param HttpSecurity 리소스 권한, 로그인 로그아웃, 필터, csrf 호출등 스프링시큐리티의 거의 대부분설정을 담당하는 객체
             * @return void
             * */
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder
                    .addFilter(corsFilter); //cors 설정
        }
    }
}