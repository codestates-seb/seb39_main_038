package com.main_39.Spring.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewsResponseDto {
    private long storeId;
    private List<ReviewResponseDto> reviews;

    private int totalReview;
    private double totalGrade;
    private int totalComment;

    @Builder
    public ReviewsResponseDto(Long storeId, int totalReview, double totalGrade, int totalComment,
                              List<ReviewResponseDto> reviews) {
        this.storeId = storeId;
        this.reviews = reviews;
        this.totalReview = totalReview;
        this.totalGrade = totalGrade;
        this.totalComment = totalComment;
    }
}
