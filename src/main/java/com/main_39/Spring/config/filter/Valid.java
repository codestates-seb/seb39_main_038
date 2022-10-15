package com.main_39.Spring.config.filter;

import lombok.Data;

public class Valid {
    /**
     * 인가 시 회원정보를 사용자 또는 인증서버로 부터 받는 DTO
     * @author 유태형
     * */
    @Data
    public static class Access{
        private Long id;
        private Integer expires_in;
        private Integer app_id;
        private Integer expiresInMillis;
        private Integer appId;
    }

    @Data
    public static class Refresh{
        private String token_type;
        private String access_token;
        private Integer expires_in;
    }

    @Data
    public static class Login{
        private String email;
        private String password;
    }
}
