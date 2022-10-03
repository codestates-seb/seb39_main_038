package com.main_39.Spring.review.mapper;

import com.main_39.Spring.review.dto.ReviewPatchDto;
import com.main_39.Spring.review.dto.ReviewPostDto;
import com.main_39.Spring.review.dto.ReviewResponseDto;
import com.main_39.Spring.review.dto.ReviewsResponseDto;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);

    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);

    default ReviewsResponseDto reviewToStoreResponseDto(Store store) {
        List<Review> reviews = store.getReviews();

        ReviewsResponseDto reviewsResponseDto = new ReviewsResponseDto(
                store.getStoreId(),
                reviewToStoreResponseDtos(reviews),
                store.getTotalReview(),
                store.getTotalComment(),
                store.getTotalGrade());
        return reviewsResponseDto;

    }

    default List<ReviewResponseDto> reviewToStoreResponseDtos(List<Review> storereviews) {
        return storereviews.stream()
                .map(review -> ReviewResponseDto
                        .builder()
                        .reviewId(review.getReviewId())
                        .reviewContent(review.getReviewContent())
                        .reviewImage(review.getReviewImage())
                        .reviewGrade(review.getReviewGrade())
                        .createdAt(review.getCreatedAt())
                        .build()).collect(Collectors.toList());

        }


//    default List<ReviewResponsesDto> reviewToReviewResponseDtos(List<Review> reviews) {
//        return reviews
//                .stream()
//                .map(review -> ReviewResponsesDto
//                        .builder()
//                        .reviewId(review.getReviewId())
//                        .reviewContent(review.getReviewContent())
//                        .reviewImage(review.getReviewImage())
//                        .reviewGrade(review.getReviewGrade())
//                        .createdAt(review.getCreatedAt())
//                        .comments(review.getComments().size())
//                        .build())
//                        .collect(Collectors.toList());
//    }
}