package com.main_39.Spring.review.service;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.review.repository.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review createdReview(Review review) {
//        verifyExistsGrade(review.getReviewGrade());
        return reviewRepository.save(review);

    }

    public Review updateReview(Review review) {
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getReviewContent())
                .ifPresent(content -> findReview.setReviewContent(content));
        Optional.ofNullable(review.getReviewImage())
                .ifPresent(image -> findReview.setReviewImage(image));
        Optional.ofNullable(review.getReviewGrade())
                .ifPresent(grade -> findReview.setReviewGrade(grade));

        return reviewRepository.save(findReview);
    }

    public Review findReview(long reviewId) { return findVerifiedReview(reviewId); }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public void deleteReview(long reviewId) {
        Review findReview = findVerifiedReview(reviewId);

        reviewRepository.delete(findReview);
    }

    public Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview =
                reviewRepository.findById(reviewId);
        Review findReview =
                optionalReview.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXISTS));
        return findReview;
    }

//    private void verifyExistsGrade(Number reviewGrade) {
//        Optional<Review> review = reviewRepository.findByGrade(reviewGrade);
//        if(review.isPresent())
//            throw new BusinessLogicException(ExceptionCode.REVIEW_INVALID_GRADE);
//    }
}
