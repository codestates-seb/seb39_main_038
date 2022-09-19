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
public class PrincipalDetails implements OAuth2User, UserDetails{
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;
    private Kakao kakao;
    private Map<String,Object> attributes;

    public PrincipalDetails(Kakao kakao){
        this.kakao = kakao;
    }

    public PrincipalDetails(Kakao kakao, Map<String,Object> attributes){
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
        return String.valueOf(kakao.getKakao_id());
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
