package com.main_39.Spring.config.oauth;

import com.main_39.Spring.member.entity.Local;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class LocalDetails implements UserDetails {
    /**
     * 카카오 유저 정보 객체를 인증객체로 관리하기 위해 감싸는 클래스
     * @author 유태형
     * @see UserDetails 회원 가입 인증 관련 인터페이스
     * */

    private Local local;

    public LocalDetails(Local local){
        this.local = local;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(
                new GrantedAuthority(){
                    @Override
                    public String getAuthority() {
                        return local.getRole().getStatus();
                    }
                }
        );
        return collection;
    }

    @Override
    public String getPassword() {
        return local.getPassword();
    }

    @Override
    public String getUsername() {
        return local.getEmail();
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
}
