package com.main_39.Spring.review.dto;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewsResponseDto {
    private long storeId;
    private List<ReviewStoreResponseDto> reviews;
    private List<CommentResponseDto> comment;
    private int totalReview;
    private double totalGrade;
    private int totalComment;

    @Builder
    public ReviewsResponseDto(Long storeId, int totalReview, double totalGrade, int totalComment,
                              List<ReviewStoreResponseDto> reviews, List<CommentResponseDto> comment) {
        this.storeId = storeId;
        this.reviews = reviews;
        this.comment = comment;
        this.totalReview = totalReview;
        this.totalGrade = totalGrade;
        this.totalComment = totalComment;
    }
}
