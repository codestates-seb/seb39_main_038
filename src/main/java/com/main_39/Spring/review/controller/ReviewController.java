package com.main_39.Spring.review.controller;

import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.config.oauth.KakaoDetails;
import com.main_39.Spring.config.oauth.LocalDetails;
import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.repository.KakaoRepository;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.review.dto.ReviewPatchDto;
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
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;
    private final StoreService storeService;
    private final KakaoRepository kakaoRepository;
    private final MemberService memberService;

    public ReviewController(ReviewService reviewService,
                            ReviewMapper mapper,
                            StoreService storeService,
                            KakaoRepository kakaoRepository,
                            MemberService memberService) {
        this.reviewService = reviewService;
        this.mapper = mapper;
        this.storeService = storeService;
        this.kakaoRepository = kakaoRepository;
        this.memberService = memberService;
    }

    /**
     * 리뷰 등록
     */
    @PostMapping("/store/{store-id}/review/ask")
    public ResponseEntity postReview(@PathVariable("store-id") long storeId,
                                     @Valid @RequestBody ReviewPostDto reviewPostDto,
                                     @RequestHeader(value = "login") String login,
                                     Authentication authentication) {

        LocalDetails localDetails;
        KakaoDetails kakaoDetails;
        Local local = null;
        Kakao kakao = null;
        long Id = -1;
        if(login.equals("kakao")){
            if(authentication != null){
                kakaoDetails = (KakaoDetails) authentication.getPrincipal();
                kakao = kakaoDetails.getKakao();
            }
            if(kakao != null) Id = kakao.getKakaoId();
        }else if(login.equals("local")){
            if(authentication != null){
                localDetails = (LocalDetails) authentication.getPrincipal();
                local = localDetails.getLocal();
            }
            if(local != null) Id = local.getLocalId();
        }


        Review review = mapper.reviewPostDtoToReview(reviewPostDto);
        Review posted = reviewService.createdReview(storeId, review, Id, login);

        ReviewResponseDto response = mapper.reviewToReviewResponseDto(posted);


        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 상점별 리뷰 불러오기
     */
//    @GetMapping("/store/{store-id}/reviews")
//    public ResponseEntity<ReviewsResponseDto> getReviewByStore(@PathVariable("store-id") long storeId) {
//        Store store = storeService.findStore(storeId);
//
//        return new ResponseEntity<>(mapper.reviewToStoreResponseDto(store), HttpStatus.OK);
//    }

    @GetMapping("/store/{store-id}/review")
    public ResponseEntity<ReviewsResponseDto> getReviewByStore(@PathVariable("store-id") long storeId,
                                                               @RequestHeader(value = "login") String login,
                                                               Authentication authentication) {
        KakaoDetails kakaoDetails;
        LocalDetails localDetails;
        Kakao kakao = null;
        Local local = null;
        long Id = -1;
        if(login.equals("kakao")){
            if(authentication != null) {
                kakaoDetails = (KakaoDetails) authentication.getPrincipal();
                kakao = kakaoDetails.getKakao();
            }
            if(kakao != null)
                Id = kakao.getKakaoId();
        }else if(login.equals("local")){
            if(authentication != null){
                localDetails = (LocalDetails) authentication.getPrincipal();
                local = localDetails.getLocal();
            }
            if(local != null)
                Id = local.getLocalId();
        }
        Store store = storeService.findStore(storeId);
        System.out.println("로그인한 아이디: " + Id);
        return new ResponseEntity<>(mapper.reviewsToStoreResponseDto(store,Id,login), HttpStatus.OK);
    }

    /**
     * 전체 리뷰(답변 포함) 불러오기
     */
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

    /**
     * 리뷰 수정
     */
    @PatchMapping("/store/{store-id}/review/{review-id}")
    public ResponseEntity patchReview(@PathVariable("store-id") long storeId,
                                      @PathVariable("review-id") @Positive long reviewId,
                                      @Valid @RequestBody ReviewPatchDto reviewPatchDto,
                                      @RequestHeader(value="login") String login,
                                      Authentication authentication) {
        KakaoDetails kakaoDetails;
        LocalDetails localDetails;
        Kakao kakao = null;
        Local local = null;
        long Id = -1;
        if(login.equals("kakao")){
            if(authentication != null) {
                kakaoDetails = (KakaoDetails) authentication.getPrincipal();
                kakao = kakaoDetails.getKakao();
            }
            if(kakao != null)
                Id = kakao.getKakaoId();
        }else if(login.equals("local")){
            if(authentication != null){
                localDetails = (LocalDetails) authentication.getPrincipal();
                local = localDetails.getLocal();
            }
            if(local != null)
                Id = local.getLocalId();
        }

        reviewPatchDto.setReviewId(reviewId);

        Review response =
                reviewService.updateReview(mapper.reviewPatchDtoToReview(reviewPatchDto),Id,login);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(response)),
                HttpStatus.OK);
    }

    /**
     * 리뷰 삭제
     */
    @DeleteMapping("/store/{store-id}/review/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("store-id") long storeId,
                                       @PathVariable("review-id") @Positive long reviewId,
                                       @RequestHeader(value="login") String login,
                                       Authentication authentication) {

        KakaoDetails kakaoDetails;
        LocalDetails localDetails;
        Kakao kakao = null;
        Local local = null;
        long Id = -1;
        if(login.equals("kakao")){
            if(authentication != null) {
                kakaoDetails = (KakaoDetails) authentication.getPrincipal();
                kakao = kakaoDetails.getKakao();
            }
            if(kakao != null)
                Id = kakao.getKakaoId();
        }else if(login.equals("local")){
            if(authentication != null){
                localDetails = (LocalDetails) authentication.getPrincipal();
                local = localDetails.getLocal();
            }
            if(local != null)
                Id = local.getLocalId();
        }

        System.out.println("#delete Review");
//        Store store = storeService.findStore(storeId);
//        reviewService.deleteReview(store, reviewId);  // 1009 수정
        reviewService.deleteReview(storeId, reviewId, Id,login);
        System.out.println("삭제된 리뷰 : " + reviewId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}