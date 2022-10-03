package com.main_39.Spring.review.controller;

import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.review.dto.ReviewPostDto;
import com.main_39.Spring.review.dto.ReviewResponseDto;
import com.main_39.Spring.review.dto.ReviewsResponseDto;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.review.mapper.ReviewMapper;
import com.main_39.Spring.review.service.ReviewService;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.service.StoreService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;
    private final StoreService storeService;
    private final MemberService memberService;



    public ReviewController(ReviewService reviewService,
                            ReviewMapper mapper,
                            StoreService storeService,
                            MemberService memberService) {
        this.reviewService = reviewService;
        this.mapper = mapper;
        this.storeService = storeService;
        this.memberService = memberService;

    }

//    @PostMapping("/store/{store-id}/review/ask")
//    public ResponseEntity postReview(@PathVariable("store-id") long storeId,
//                                     @Valid @RequestBody ReviewPostDto reviewPostDto) {
//
//        Review review =
//                reviewService.createdReview(storeId, mapper.reviewPostDtoToReview(reviewPostDto));
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(review)),
//                HttpStatus.CREATED);
//    }

        @PostMapping("/store/{store-id}/review/ask")
        public ResponseEntity postReview(@PathVariable("store-id") long storeId,
                                         @Valid @RequestBody ReviewPostDto reviewPostDto) {

            Review review = mapper.reviewPostDtoToReview(reviewPostDto);

            Kakao kakao = memberService.findVerifiedKakao(reviewPostDto.getKakaoId());
            review.setKakao(kakao);

            Review posted = reviewService.createdReview(storeId, review);
            ReviewResponseDto response = mapper.reviewToReviewResponseDto(posted);


            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.CREATED);
        }

    /**
     * 상점별 리뷰 불러오기
     */
    @GetMapping("/store/{store-id}/reviews")
    public ResponseEntity<ReviewsResponseDto> getReviewByStore(@PathVariable("store-id") long storeId) {
        Store store = storeService.findStore(storeId);

        return new ResponseEntity<>(mapper.reviewToStoreResponseDto(store), HttpStatus.OK);
    }

//    @PatchMapping("/review/{review-id}")
//    public ResponseEntity patchReview(
//            @PathVariable("review-id") @Positive long reviewId,
//            @Valid @RequestBody ReviewPatchDto reviewPatchDto) {
//
//        reviewPatchDto.setReviewId(reviewId);
//
//        Review response =
//                reviewService.updateReview(mapper.reviewPatchDtoToReview(reviewPatchDto));
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(response)),
//                HttpStatus.OK);
//    }

    @GetMapping("/review")
    public ResponseEntity getReviews(@Positive @RequestParam int page,
                                    @Positive @RequestParam(required = false, defaultValue = "15") int size){
        Page<Review> pageReviews = reviewService.findReviews(page -1, size);
        List<Review> reviews = pageReviews.getContent();
        List<ReviewResponseDto> responses = mapper.reviewToReviewResponseDtos(reviews);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responses, pageReviews),
                HttpStatus.OK);
    }

//    @GetMapping("/{kakao-id}")
//    public ResponseEntity getReview(@PathVariable("kakao-id") @Positive long kakaoId,
//                                    @Positive @RequestParam int page,
//                                    @Positive @RequestParam(required = false, defaultValue = "15")
//        Page<Kakao> pageKakaos = kakao


    @DeleteMapping("/review/{review-id}")
    public ResponseEntity deleteReview(
            @PathVariable("review-id") @Positive long reviewId) {
        System.out.println("#delete Review");
        reviewService.deleteReview(reviewId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
