package com.main_39.Spring.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewPostDto {
//    private long kakaoId;
//    private long storeId;
    private String reviewContent;
    private String reviewImage;
    private int reviewGrade;
}