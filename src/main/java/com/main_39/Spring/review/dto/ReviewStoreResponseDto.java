package com.main_39.Spring.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReviewStoreResponseDto {
    private long reviewId;
    private String reviewContent;
    private String reviewImage;
    private int reviewGrade;
    private LocalDateTime createdAt;
    @Builder
    public ReviewStoreResponseDto(long reviewId, String reviewContent, String reviewImage, int reviewGrade, LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.reviewContent = reviewContent;
        this.reviewImage = reviewImage;
        this.reviewGrade = reviewGrade;
        this.createdAt = createdAt;
    }
}