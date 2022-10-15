package com.main_39.Spring.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ExceptionCode {
    /**
     * 회원가입
     */
    MEMBER_NOT_FOUND(226,404,"Member not found"),
    SIGNUP_INVALID_EMAIL(226,  1001, "잘못된 이메일 형식입니다."),
    SIGNUP_INVALID_PASSWORD(226, 1002, "잘못된 비밀번호 형식입니다."),
    SIGNUP_EMAIL_DUPLICATE(226, 1003, "이미 사용중인 이메일 입니다."),
    SIGNUP_MEMBERID_NOT_EXISTS(226, 1004, "존재하지 않는 memberId 입니다."),
    /**
     * 토큰
     */
    AUTH_EXPIRED_TOKEN(226,2001, "유효기간이 만료된 토큰입니다."),
    AUTH_INVALID_TOKEN(226, 2002,"유효하지 않은 토큰입니다."),
    AUTH_NOT_MATCH_TOKEN(226, 2003,"일치하지 않는 토큰입니다."),
    TOKEN_INVALID_REISSUE(226,2004,"잘못된 토큰 재발행 요청 입니다."),
    TOKEN_INVALID_SIGNATURE(226,2005, "잘못된 토큰 서명입니다."),
    TOKEN_NOT_SUPPORTED(226,006, "지원하지 않는 토큰입니다."),
    /**
     * OAuth
     */
    OAUTH_TOKEN_REQUEST_FAILED(226,3001, "서버로의 토큰 요청이 실패했습니다."),
    OAUTH_USERINFO_REQUEST_FAILED(226,3002, "서버로의 회원정보 요청이 실패했습니다."),
    /**
     * 회원
     */
    LOGIN_INVALID_LOGIN_INFO(226,4001, "아이디나 비밀번호가 다릅니다.."),
    AUTH_REQUIRED_LOGIN(226,4002, "로그인이 필요합니다."),
    NOT_MATCH_USER_INFO	(226,4003, "유저 정보가 일치하지 않습니다."),
    NOT_EXISTS_USER_INFO(226,4004, "해당 유저 정보가 존재하지 않습니다."),
    NOT_EXITS_NICKNAME(226, 4005, "해당 닉네임이 존재하지 않습니다."),
    /**
     * 가게
     */
    STORE_NOT_EXISTS(226,5001, "해당 가게를 찾을 수 없습니다."),
    STORE_ALL_LOAD_FAILED(226,5002, "가게리스트 불러오기를 실패했습니다."),
    STORE_UPDATED_LOAD_FAILED(226,5003, "가게 최신순 정렬에 실패했습니다."),
    STORE_RATING_LOAD_FAILED(226,5004, "가게 평점순 정렬에 실패했습니다."),
    STORE_POST_NO_AUTHORITY(226,5005, "판매자만 가게 등록이 가능합니다."),
    STORE_PATCH_WRONG_ACCESS(226,5006, "본인의 가게만 수정할 수 있습니다."),
    STORE_DELETE_WRONG_ACCESS(226,5007, "본인의 가게만 삭제할 수 있습니다."),
    STORE_POST_INVALID_TITLE(226,5008, "잘못된 가게명 형식입니다."),
    STORE_POST_INVALID_CATEGORY(226,5009, "잘못된 카테고리입니다."),
    STORE_NAME_DUPLICATE(226,5010, "이미 사용중인 가게명 입니다."),
    STORE_NUMBER_DUPLICATE(226,5011,"이미 사용중인 사업자 번호 입니다."),
    STORE_PHONE_DUPLICATE(226,5012, "이미 사용중인 가게 번호 입니다."),
    /**
     * 리뷰
     */
    REVIEW_INVALID_CONTENT(226,6001, "댓글을 입력해주세요."),
    REVIEW_INVALID_GRADE(226,6002, "별점을 등록해주세요"),
    REVIEW_NOT_EXISTS(226,6003, "해당 리뷰를 찾을 수 없습니다."),
    REVIEW_PATCH_WRONG_ACCESS(226,6004, "본인의 리뷰만 수정할 수 있습니다."),
    REVIEW_DELETE_NO_AUTHORITY(226,6005, "리뷰 삭제 권한이 없습니다."),
    /**
     * 메뉴
     */
    MENU_NOT_EXISTS(226,7001, "존재하지 않는 메뉴입니다."),
    MENU_PATCH_WRONG_ACCESS(226,7002,"자신의 가게 메뉴만 수정할 수 있습니다."),
    MENU_DELETE_WRONG_ACCESS(226,7003,"자신의 가게 메뉴만 삭제할 수 있습니다." ),
    MENU_POST_INVALID_NAME(226,7004,"잘못된 메뉴 이름입니다."),
    MENU_POST_INVALID_PRICE(226,7005,"잘못된 메뉴 가격입니다."),
    /**
     * 주문
     */
    ORDER_NOT_FOUND(226,8001, "존재하지 않는 주문입니다."),
    /**
     * 답변
     */
    COMMENT_NOT_EXITS(226, 9001, "존재하지 않는 답변입니다.");

    @Getter
    private final int status;
    @Getter
    private final int custom;
    @Getter
    private final String message;
}
