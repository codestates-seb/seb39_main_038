package com.main_39.Spring.member.dto;

import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.store.dto.StoreResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class LocalDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        //base64입력
        private String avatar;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String phone;
    }

    @Getter
    @AllArgsConstructor
    public static class response{
        private Long localId;
        private StoreResponseDto store;
        private String avatar; //S3 저장 URL
        private String name;
        private String email;
        private String phone;
        private Local.Role role;
    }

    @Getter
    @AllArgsConstructor
    public static class Login{
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class postResponse{
        private String name;
        private String avatar; //S3 저장 URL
    }

    @Getter
    @AllArgsConstructor
    public static class searchIdDto{
        private String name;
        private String phone;
    }

    @Getter
    @AllArgsConstructor
    public static class searchIdResponse{
        private String email;
    }

    @Getter
    @AllArgsConstructor
    public static class mailDto{
        @Email
        private String email;
    }

    @Getter
    @AllArgsConstructor
    public static class searchPwDto{
        private String email;
        private String code;
    }

    @Getter
    @AllArgsConstructor
    public static class changePwDto{
        private String email;
        private String password;
    }
}
