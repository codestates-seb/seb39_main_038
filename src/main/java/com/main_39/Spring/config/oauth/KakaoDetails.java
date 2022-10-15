package com.main_39.Spring.config.oauth;

import com.main_39.Spring.member.entity.Kakao;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class KakaoDetails implements OAuth2User, UserDetails{
    /**
     * 카카오 유저 정보 객체를 인증객체로 관리하기 위해 감싸는 클래스
     * @author 유태형
     * @see OAuth2User OAuth2.0 인증 관련 인터페이스
     * @see UserDetails 회원 가입 인증 관련 인터페이스
     * */

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;
    private Kakao kakao;
    private Map<String,Object> attributes;

    public KakaoDetails(Kakao kakao){
        this.kakao = kakao;
    }

    public KakaoDetails(Kakao kakao, Map<String,Object> attributes){
        this.kakao = kakao;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority(){
            @Override
            public String getAuthority() {
                return kakao.getRole().getStatus();
            }
        });
        return collection;
    }

    @Override
    public String getPassword() {
        return CLIENT_SECRET;
    }

    @Override
    public String getUsername() {
        return String.valueOf(kakao.getKakaoId());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public String getName() {
        return kakao.getNickname();
    }
}
