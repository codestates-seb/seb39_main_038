package com.main_39.Spring.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;


public class KakaoDto {
    @Getter
    @NoArgsConstructor
    public static class CodeDto{
        private String code;
    }

    @Getter
    @NoArgsConstructor
    public static class logoutDto{
        private Long id;
    }
}
