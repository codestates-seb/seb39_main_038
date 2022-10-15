package com.main_39.Spring.member.mapper;

import com.main_39.Spring.member.dto.KakaoDto;
import com.main_39.Spring.member.dto.KakaoProfile;
import com.main_39.Spring.member.dto.LocalDto;
import com.main_39.Spring.member.dto.OAuthToken;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.store.dto.StoreResponseDto;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;

@Mapper(componentModel =  "spring")
public interface MemberMapper {
    Local localPostToLocal(LocalDto.Post localPost);
    LocalDto.postResponse localToLocalPostResponse(Local local);
    default LocalDto.response localToLocalDtoResponse(Local local){
        Store store = local.getStore();
        StoreResponseDto storeResponseDto = null;
        // store 수정으로 인한 수정
        if(store != null) { //가게 등록 하신 사장님만 가게 등록
            storeResponseDto = new StoreResponseDto(
                    store.getStoreId(), store.getStorePhone(), store.getStoreNumber(), store.getStoreStatus(), store.getStoreName(), store.getStoreContent(),
                    store.getStoreImage(), store.getStoreType(), store.getStoreTime(), store.getStoreWaitTime(), store.getStoreAddress(),
                    store.getStorePayment(), store.getStoreTag(), store.getTotalReview(), store.getTotalGrade(), store.getTotalComment(), store.getTotalMenu()
            );
        }
        LocalDto.response response = new LocalDto.response(
                local.getLocalId(),storeResponseDto,local.getAvatar(),local.getName(),local.getEmail(),local.getPhone(),
                local.getRole()
        );
        return response;
    }
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

    KakaoDto.response kakaoToKakaoDtoResponse(Kakao kakao);

    default LocalDto.searchIdResponse localToLocalDtoSearchIdResponse(Local local){
        return new LocalDto.searchIdResponse(local.getEmail());
    }

    KakaoDto.mileageDto kakaoToKakaoDtoMileage(Kakao kakao);
}