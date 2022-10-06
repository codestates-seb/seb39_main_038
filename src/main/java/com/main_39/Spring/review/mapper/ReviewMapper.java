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
//    Review reviewToStoreResponseDto(ReviewResponseDto reviewResponseDto); //수정

    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);

    /**
     * 푸드트럭별 상점 조회
     */
    default ReviewsResponseDto reviewsToStoreResponseDto(Store store) {
        List<Review> reviews = store.getReviews();

        ReviewsResponseDto reviewsResponseDto = new ReviewsResponseDto(
//            reviewsResponseDto = new ReviewsResponseDto(
                store.getStoreId(),
                store.getTotalReview(),
                store.getTotalGrade(),
                store.getTotalComment(),
                store.getTotalMenu(),
                reviewToReviewResponseDtos(reviews));
        return reviewsResponseDto;
    }
}