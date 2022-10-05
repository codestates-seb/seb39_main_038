package com.main_39.Spring.review.mapper;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.review.dto.*;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);

    /**
     * 푸드트럭별 상점 조회
     */
    default ReviewsResponseDto reviewToStoreResponseDto(Store store) {
        List<Review> reviews = store.getReviews();

        ReviewsResponseDto reviewsResponseDto = new ReviewsResponseDto(
                store.getStoreId(),
                store.getTotalReview(),
                store.getTotalGrade(),
                store.getTotalComment(),
                reviewToReviewResponseDtos(reviews));
        return reviewsResponseDto;
    }
}