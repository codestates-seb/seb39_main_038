package com.main_39.Spring.config.oauth;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.repository.KakaoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;



/*
* OAuth2.0 + Security + JWT는 이론상 불가능 -> OAUTH2.0 서버의 access_token, refresh_token을 이용못함 ㅜㅜ
* */

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoOAuth2UserService extends DefaultOAuth2UserService {

    private final KakaoRepository kakaoRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println("userRequest = " + userRequest.getAccessToken().getTokenValue());
        // 구글 로그인버튼 클릭 -> 구글 로그인창 -> 로그인을 완료 -> code 를 리턴(Oauth-client 라이브러리) -> AccessToken 요청
        // userRequest 정보 -> loadUser함수 호출 -> 구글로부터 회원프로필을 받아준다.
        System.out.println("userRequest = " + userRequest.getClientRegistration());
        System.out.println("oAuth2User = " + userRequest.getAdditionalParameters());
        System.out.println("oAuth2User.getAttributes() = " + oAuth2User.getAttributes());
        System.out.println("oAuth2User.getAuthorities() = " + oAuth2User.getAuthorities());
        System.out.println("oAuth2User.getName() = " + oAuth2User.getName());



        // 서비스 구분(kakao, google, naver 등)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        // OAuth2.0 로그인 시 키 값
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        System.out.println("oAuth2User.userNameAttributeName = " + userNameAttributeName);
        // OAuth2.0 속성 값
        Map<String,Object> attributes = oAuth2User.getAttributes();
        Map<String,Object> properties = oAuth2User.getAttribute("properties");
        Map<String,Object> kakao_account = oAuth2User.getAttribute("kakao_account");
        //Id값 -> null x
        long id = Long.parseLong(oAuth2User.getName());

        //존재하는 회원인지 찾고 없으면 새로 만들기
        Kakao kakaoEntity = kakaoRepository.findById(id).orElse(
                Kakao.builder()
                        .kakaoId((Long) attributes.get("id"))
                        .nickname((String) properties.get("nickname"))
                        .connectedAt((String) attributes.get("connected_at"))
                        .profileImage((String) properties.get("profile_image"))
                        .thumbnailImage((String) properties.get("thumbnail_image"))
                        .email((String) kakao_account.get("email"))
                        .build()
        );
        kakaoRepository.save(kakaoEntity);



        //access_token 추가
        Map<String,Object> principal_attribute = new LinkedHashMap<>(attributes);
        principal_attribute.put("access_token",userRequest.getAccessToken().getTokenValue());




        return new KakaoDetails(kakaoEntity,principal_attribute);
    }
}