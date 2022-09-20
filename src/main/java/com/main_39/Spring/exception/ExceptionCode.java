package com.main_39.Spring.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"Member not found"),
    SIGNUP_EMAIL_DUPLICATE(1003, "이미 사용중인 이메일 입니다."),
    AUTH_NOT_MATCH_TOKEN(2003,"일치하지 않는 토큰입니다."),
    TOKEN_INVALID_REISSUE(2004,"잘못된 토큰 재발행 요청 입니다."),
    AUTH_INVALID_TOKEN(2002,"유효하지 않은 토큰입니다.");
    //에러 코드 추가


    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
