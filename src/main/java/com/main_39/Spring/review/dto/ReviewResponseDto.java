package com.main_39.Spring.review.dto;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReviewResponseDto {
    private long reviewId;
    private String reviewContent;
    private String nickname;
    private String reviewImage;
    private int reviewGrade;
    private LocalDateTime createdAt;

    /**
     * Entity 사용시 무한 루프 발생
     */
    private CommentResponseDto comment;

    @Builder
    public ReviewResponseDto(long reviewId, String reviewContent, String reviewImage, int reviewGrade,
                             String nickname, LocalDateTime createdAt, CommentResponseDto comment) {
        this.reviewId = reviewId;
        this.reviewContent = reviewContent;
        this.nickname = nickname;
        this.reviewImage = reviewImage;
        this.reviewGrade = reviewGrade;
        this.createdAt = createdAt;
        this.comment = comment;
    }
}