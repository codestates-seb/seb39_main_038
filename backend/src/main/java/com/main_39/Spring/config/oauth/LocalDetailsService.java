package com.main_39.Spring.config.oauth;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.repository.LocalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocalDetailsService implements UserDetailsService {
    /**
     * 로컬 회원 정보를 레포지토리로 부터 관리하는 서비스
     * @author 유태형
     * @see LocalRepository 회원 정보 레포지토리
     * */
    private final LocalRepository localRepository;

    /**
     * DB로 부터 회원정보를 불러들여와 UserDetails를 생성하는 메서드
     * @author 유태형
     * @param username 회원 아이디
     * @exception UsernameNotFoundException 회원정보를 찾을 수 없을 때 발생하는 예외
     * @throw BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO) 회원정보를 찾을 수 없을 때 발생하는 예외
     * @return LocalDetails UserDetails를 구현하고 로컬 회원정보를 감싸는 구현체
     * */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Local localEntity = localRepository.findByEmail(username).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NOT_EXISTS_USER_INFO)
        );
        return new LocalDetails(localEntity);
    }
}
