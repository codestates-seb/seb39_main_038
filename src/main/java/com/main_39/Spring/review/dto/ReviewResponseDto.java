package com.main_39.Spring.review.dto;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReviewResponseDto {
    private long reviewId;
    //카카오 Id 일치 여부
    private boolean auth;
    private String reviewContent;

    // 추가
    private String nickname;
    private String reviewImage;
    private int reviewGrade;
    private LocalDateTime createdAt;

    /**
     * Entity 사용시 무한 루프 발생
     */
    private CommentResponseDto comment;

    @Builder
    public ReviewResponseDto(long reviewId, boolean auth, String reviewContent, String reviewImage, int reviewGrade,
                             String nickname, LocalDateTime createdAt, CommentResponseDto comment) {
        this.reviewId = reviewId;
        this.auth = auth;
        this.reviewContent = reviewContent;
        this.nickname = nickname;
        this.reviewImage = reviewImage;
        this.reviewGrade = reviewGrade;
        this.createdAt = createdAt;
        this.comment = comment;
    }
}