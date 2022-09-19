package com.main_39.Spring.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"Member not found"),
    SIGNUP_EMAIL_DUPLICATE(1003, "이미 사용중인 이메일 입니다.");
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
