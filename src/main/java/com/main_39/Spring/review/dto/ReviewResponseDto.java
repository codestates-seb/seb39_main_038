package com.main_39.Spring.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReviewResponseDto {
    private long reviewId;
    private String reviewContent;
    private String reviewImage;
    private int reviewGrade;
    private LocalDateTime createdAt;
}
