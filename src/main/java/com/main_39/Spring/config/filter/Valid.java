package com.main_39.Spring.config.filter;

import lombok.Data;

public class Valid {
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
}
