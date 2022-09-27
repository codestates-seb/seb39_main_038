package com.main_39.Spring.review.mapper;

import com.main_39.Spring.review.dto.ReviewPatchDto;
import com.main_39.Spring.review.dto.ReviewPostDto;
import com.main_39.Spring.review.dto.ReviewResponseDto;
import com.main_39.Spring.review.entity.Review;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);
}
