package com.main_39.Spring.review.mapper;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.review.dto.*;
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
        List<Comment> comments = store.getComments();

        ReviewsResponseDto reviewsResponseDto = new ReviewsResponseDto(
                store.getStoreId(),
                store.getTotalReview(),
                store.getTotalComment(),
                (int) store.getTotalGrade(),
                reviewToStoreResponseDtos(reviews),
                reviewToCommandResponseDtos(comments));
        return reviewsResponseDto;
    }
    default List<ReviewStoreResponseDto> reviewToStoreResponseDtos(List<Review> storeReviews) {
        return storeReviews.stream()
                .map(review -> ReviewStoreResponseDto
                        .builder()
                        .reviewId(review.getReviewId())
                        .reviewContent(review.getReviewContent())
                        .reviewImage(review.getReviewImage())
                        .reviewGrade(review.getReviewGrade())
                        .createdAt(review.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    default List<CommentResponseDto> reviewToCommandResponseDtos(List<Comment> commentReviews) {
        return commentReviews.stream()
                .map(review -> CommentResponseDto
                        .builder()
                        .commentId(review.getCommentId())
                        .commentContent(review.getCommentContent())
                        .createdAt(review.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}