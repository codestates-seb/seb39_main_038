package com.main_39.Spring.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewPatchDto {
    private long reviewId;
    private String reviewContent;
    private String reviewImage;
    private int reviewGrade;

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }
}
