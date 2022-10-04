package com.main_39.Spring.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewsResponseDto {
    private long storeId;
    private List<ReviewResponseDto> stores;
    private int totalReview;
    private double totalGrade;
    private int totalComment;

//    private CommentResponseDto comment;


    @Builder
    public ReviewsResponseDto(Long storeId, List<ReviewResponseDto> stores, int totalReview, int totalComment, double totalGrade) {
        this.storeId = storeId;
        this.stores = stores;
        this.totalReview = totalReview;
        this.totalGrade = this.totalGrade;
        this.totalComment = this.totalComment;
    }
}
