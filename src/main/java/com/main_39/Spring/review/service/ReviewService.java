package com.main_39.Spring.review.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.review.repository.ReviewRepository;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.service.StoreService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final StoreService storeService;

    private final MemberService memberService;

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public ReviewService(ReviewRepository reviewRepository,
                         StoreService storeService,
                         MemberService memberService,
                         AmazonS3 amazonS3) {

        this.reviewRepository = reviewRepository;
        this.storeService = storeService;
        this.memberService = memberService;
        this.amazonS3 = amazonS3;
    }

    public Review createdReview(long storeId, Review review) {
//        verifyExistsGrade(review.getReviewGrade());
        Store store = storeService.findStore(storeId);
        review.addStore(store);

        if(review.getReviewImage() != null) saveImageToS3(review);
        return reviewRepository.save(review);

    }



    public Review updateReview(Review review) {
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getReviewContent())
                .ifPresent(content -> findReview.setReviewContent(content));
        Optional.ofNullable(review.getReviewImage())
                .ifPresent(image -> {findReview.setReviewImage(image);
                                    saveImageToS3(findReview);});
        Optional.ofNullable(review.getReviewGrade())
                .ifPresent(grade -> findReview.setReviewGrade(grade));


        return reviewRepository.save(findReview);
    }

    private void saveImageToS3(Review review){
        String data = review.getReviewImage().split(",")[1];
        String s3FileName = "reviews/"+ review.getReviewId();

        byte[] decodeByte = Base64.getDecoder().decode(data);
        InputStream inputStream = new ByteArrayInputStream(decodeByte);
        ObjectMetadata objectMetadata = new ObjectMetadata();

        try {
            objectMetadata.setContentLength(inputStream.available());
        } catch (IOException e) {
            System.out.println("리뷰 이미지 삽입 실패");
            throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXISTS);
        }
        amazonS3.putObject(bucket,s3FileName,inputStream,objectMetadata);
        review.setReviewImage(amazonS3.getUrl(bucket,s3FileName).toString());
    }

    public Review findReview(long reviewId) { return findVerifiedReview(reviewId); }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public void deleteReview(long reviewId) {
        Review findReview = findVerifiedReview(reviewId);
        if(findReview.getReviewImage() != null) amazonS3.deleteObject(bucket,findReview.getReviewImage());
        reviewRepository.delete(findReview);
    }

    /**
     * 리뷰가 존재하는지 확인
     */
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
