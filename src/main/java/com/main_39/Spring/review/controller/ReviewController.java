package com.main_39.Spring.review.controller;

import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.review.dto.ReviewPatchDto;
import com.main_39.Spring.review.dto.ReviewPostDto;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.review.mapper.ReviewMapper;
import com.main_39.Spring.review.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/review")
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;

    public ReviewController(ReviewService reviewService, ReviewMapper mapper) {
        this.reviewService = reviewService;
        this.mapper = mapper;
    }

    @PostMapping("/ask")
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto reviewPostDto) {
        Review review =
                reviewService.createdReview(mapper.reviewPostDtoToReview(reviewPostDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(review)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(
            @PathVariable("review-id") @Positive long reviewId,
            @Valid @RequestBody ReviewPatchDto reviewPatchDto) {

        reviewPatchDto.setReviewId(reviewId);

        Review response =
                reviewService.updateReview(mapper.reviewPatchDtoToReview(reviewPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(response)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getStores(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Review> pageReviews = reviewService.findReviews(page -1, size);
        List<Review> reviews = pageReviews.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.reviewToReviewResponseDtos(reviews),
                        pageReviews),
                HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(
            @PathVariable("review-id") @Positive long reviewId) {
        System.out.println("#delete Review");
        reviewService.deleteReview(reviewId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
