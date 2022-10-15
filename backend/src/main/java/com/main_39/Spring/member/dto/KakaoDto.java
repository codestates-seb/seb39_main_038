package com.main_39.Spring.member.dto;

import com.main_39.Spring.member.entity.Kakao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;


public class KakaoDto {
    @Getter
    @NoArgsConstructor
    public static class CodeDto{
        private String code;
    }

    @Getter
    @NoArgsConstructor
    public static class logoutDto{
        @NotBlank
        private Long id;
    }

    @Getter
    @AllArgsConstructor
    public static class mileageDto{
        private long mileage;
    }

    @Getter
    @AllArgsConstructor
    public static class response{
        private Long kakaoId;
        private String connectedAt;
        private String nickname;
        private String profileImage;
        private String thumbnailImage;
        private String email;
        private long mileage;
        private Kakao.Role role;
    }
}
