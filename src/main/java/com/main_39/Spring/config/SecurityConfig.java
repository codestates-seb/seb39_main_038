package com.main_39.Spring.config;


import com.main_39.Spring.config.filter.JwtAuthorizationFilter;
import com.main_39.Spring.config.oauth.KakaoOAuth2UserService;
import com.main_39.Spring.member.repository.KakaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final CorsFilter corsFilter;
    private final KakaoRepository kakaoRepository;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
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
                .antMatchers("/login/**","/oauth2/**","/oauth/**","/h2/**","/v2/**").permitAll()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/login");
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

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder
                    .addFilter(corsFilter) //cors 설정
//                    .addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager,kakaoRepository));
        }
    }
}