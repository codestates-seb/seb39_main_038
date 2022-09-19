package com.main_39.Spring.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class LocalDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank(message = "닉네임은 고백이 아니어야 합니다.")
        private String profile_nickname;

        private String profile_image;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank
        @Email
        private String account_email;

        @Pattern(regexp = "^\\w{6,16}$",
                message = "비밀번호느 6자리이상 16자리 이하로 가능합니다!")
        private String local_password;
    }

    @Getter
    @AllArgsConstructor
    public static class postResponse{
        private String profile_nickname;
        private String profile_image;
    }
}
