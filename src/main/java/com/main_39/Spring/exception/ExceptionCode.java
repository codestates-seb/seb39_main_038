package com.main_39.Spring.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ExceptionCode {
    /**
     * 회원가입
     */
    MEMBER_NOT_FOUND(404,"Member not found"),
    SIGNUP_INVALID_EMAIL(1001, "잘못된 이메일 형식입니다."),
    SIGNUP_INVALID_PASSWORD(1002, "잘못된 비밀번호 형식입니다."),
    SIGNUP_EMAIL_DUPLICATE(1003, "이미 사용중인 이메일 입니다."),
    SIGNUP_MEMBERID_NOT_EXISTS(1004, "존재하지 않는 memberId 입니다."),
    /**
     * 토큰
     */
    AUTH_EXPIRED_TOKEN(2001, "유효기간이 만료된 토큰입니다."),
    AUTH_INVALID_TOKEN(2002,"유효하지 않은 토큰입니다."),
    AUTH_NOT_MATCH_TOKEN(2003,"일치하지 않는 토큰입니다."),
    TOKEN_INVALID_REISSUE(2004,"잘못된 토큰 재발행 요청 입니다."),
    TOKEN_INVALID_SIGNATURE(2005, "잘못된 토큰 서명입니다."),
    TOKEN_NOT_SUPPORTED(2006, "지원하지 않는 토큰입니다."),
    /**
     * OAuth
     */
    OAUTH_TOKEN_REQUEST_FAILED(3001, "서버로의 토큰 요청이 실패했습니다."),
    OAUTH_USERINFO_REQUEST_FAILED(3002, "서버로의 회원정보 요청이 실패했습니다."),
    /**
     * 회원
     */
    LOGIN_INVALID_LOGIN_INFO(4001, "아이디나 비밀번호가 다릅니다.."),
    AUTH_REQUIRED_LOGIN(4002, "로그인이 필요합니다."),
    NOT_MATCH_USER_INFO	(4003, "유저 정보가 일치하지 않습니다."),
    NOT_EXISTS_USER_INFO(4004, "해당 유저 정보가 존재하지 않습니다."),
    /**
     * 가게
     */
    STORE_NOT_EXISTS(5001, "해당 가게를 찾을 수 없습니다."),
    STORE_ALL_LOAD_FAILED(5002, "가게리스트 불러오기를 실패했습니다."),
    STORE_UPDATED_LOAD_FAILED(5003, "가게 최신순 정렬에 실패했습니다."),
    STORE_RATING_LOAD_FAILED(5004, "가게 평점순 정렬에 실패했습니다."),
    STORE_POST_NO_AUTHORITY(5005, "판매자만 가게 등록이 가능합니다."),
    STORE_PATCH_WRONG_ACCESS(5006, "본인의 가게만 수정할 수 있습니다."),
    STORE_DELETE_WRONG_ACCESS(5007, "본인의 가게만 삭제할 수 있습니다."),
    STORE_POST_INVALID_TITLE(5008, "잘못된 가게명 형식입니다."),
    STORE_POST_INVALID_CATEGORY(5009, "잘못된 카테고리입니다."),
    STORE_NAME_DUPLICATE(5010, "이미 사용중인 가게명 입니다."),
    /**
     * 리뷰
     */
    REVIEW_INVALID_CONTENT(6001, "댓글을 입력해주세요."),
    REVIEW_INVALID_GRADE(6002, "별점을 등록해주세요"),
    REVIEW_NOT_EXISTS(6003, "해당 리뷰를 찾을 수 없습니다."),
    REVIEW_PATCH_WRONG_ACCESS(6004, "본인의 리뷰만 수정할 수 있습니다."),
    REVIEW_DELETE_NO_AUTHORITY(6005, "리뷰 삭제 권한이 없습니다."),
    /**
     * TODO : 정리 필요
     */
    MENU_NOT_FOUND(404, "찾을수 없는 메뉴입니다."),
    ORDER_NOT_FOUND(404, "주문을 찾을 수 없습니다.");

    @Getter
    private final int status;
    @Getter
    private final String message;
}
