package com.main_39.Spring.member.dto;

import com.main_39.Spring.member.entity.Local;

import com.main_39.Spring.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class LocalDto {
    @Getter
    @AllArgsConstructor
    public static class Post{

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
        private StoreDto.response store;
        private String avatar;
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
        private String avatar;
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
    public static class searchPwDto{
        private String email;
        private String name;
        private String phone;
    }

    @Getter
    @AllArgsConstructor
    public static class searchPwResponse{
        private String password;
    }
}
