package com.main_39.Spring.advice;

import com.main_39.Spring.exception.ExceptionCode;
import lombok.Getter;

@Getter
public class ErrorResponse {
    private int status;
    private int custom;
    private String message;

    private ErrorResponse(int status, int custom, String message){
        this.status = status;
        this.custom = custom;
        this.message = message;
    }

    public static ErrorResponse of(ExceptionCode exceptionCode){
        return new ErrorResponse(exceptionCode.getStatus(),exceptionCode.getCustom(),exceptionCode.getMessage());
    }
}
