package com.main_39.Spring.member.mapper;

import com.main_39.Spring.member.dto.KakaoProfile;
import com.main_39.Spring.member.dto.LocalDto;
import com.main_39.Spring.member.dto.OAuthToken;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import org.mapstruct.Mapper;

@Mapper(componentModel =  "spring")
public interface MemberMapper {

    Local localPostToLocal(LocalDto.Post localPost);
    LocalDto.postResponse localToLocalPostResponse(Local local);
    default Kakao kakaoProfileToKakao(KakaoProfile kakaoProfile, OAuthToken oAuthToken){
        return Kakao.builder()
                .kakaoId(kakaoProfile.getId())
                .nickname(kakaoProfile.getProperties().getNickname())
                .connectedAt(kakaoProfile.getConnected_at())
                .profileImage(kakaoProfile.getProperties().getProfile_image())
                .thumbnailImage(kakaoProfile.getProperties().getThumbnail_image())
                .email(kakaoProfile.getKakao_account().getEmail())
                .refreshToken(oAuthToken.getRefresh_token())
                .build();
    }
}
