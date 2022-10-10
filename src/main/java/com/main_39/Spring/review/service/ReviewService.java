package com.main_39.Spring.review.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
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

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
@Transactional
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

    /**
     * 리뷰 작성
     */
    public Review createdReview(long storeId, Review review, long Id, String login) {
        Store store = storeService.findStore(storeId);
        review.addStore(store);
        if(review.getReviewImage() != null) saveImageToS3(review);
        if(login.equals("local")){
            Local local = memberService.findVerifiedLocal(Id);
            review.setLocal(local);
        }else if(login.equals("kakao")){
            Kakao kakao = memberService.findVerifiedKakao(Id);
            review.setKakao(kakao);
        }

        return reviewRepository.save(review);
    }

    /**
     * 리뷰 이미지 저장
     */
    private void saveImageToS3(Review review){
        String data;
        try{
            data = review.getReviewImage().split(",")[1];
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("리뷰 이미지 삽입 실패");
            throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXISTS);
        }
        String s3FileName = "review/"+ review.getStore().getStoreId() + "/" + LocalDateTime.now();
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

    /**
     * 리뷰 불러오기
     */
    public Review findReview(long reviewId) { return findVerifiedReview(reviewId); }

    /**
     * 전체 리뷰 불러오기
     */
    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    /**
     * 리뷰 수정
     */
    public Review updateReview(Review review,long Id, String login) {
        Review findReview = findVerifiedReview(review.getReviewId());
        if(login.equals("kakao")){
            if(findReview.getKakao() == null || Id != findReview.getKakao().getKakaoId()) throw new BusinessLogicException(ExceptionCode.REVIEW_PATCH_WRONG_ACCESS);
        }else if(login.equals("local")){
            if(findReview.getLocal() == null || Id != findReview.getLocal().getLocalId()) throw new BusinessLogicException(ExceptionCode.REVIEW_PATCH_WRONG_ACCESS);
        }else{
            throw new BusinessLogicException(ExceptionCode.REVIEW_PATCH_WRONG_ACCESS);
        }

        Optional.ofNullable(review.getReviewContent())
                .ifPresent(content -> findReview.setReviewContent(content));
        Optional.ofNullable(review.getReviewImage())
                .ifPresent(image -> {findReview.setReviewImage(image);
                saveImageToS3(findReview);});
        Optional.ofNullable(review.getReviewGrade())
                .ifPresent(grade -> findReview.setReviewGrade(grade));

        return reviewRepository.save(findReview);
    }

    /**
     * 리뷰 삭제
     */
    public void deleteReview(long storeId, long reviewId, long Id, String login) {
        Review findReview = findVerifiedReview(reviewId);
        if(login.equals("kakao")){
            if(findReview.getKakao() == null || Id != findReview.getKakao().getKakaoId()) throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_AUTHORITY);
        }else if(login.equals("local")){
            if(findReview.getLocal() == null || Id != findReview.getLocal().getLocalId()) throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_AUTHORITY);
        }else{
            throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_AUTHORITY);
        }
        // 1009 수정
//        if(store.hasReview()) {
//            store.getReviews().removeIf(reviews -> reviews.getReviewId().equals(reviewId));
//            reviewRepository.deleteById(reviewId);
//        }

        if(findReview.getReviewImage() != null){
            int index = findReview.getReviewImage().indexOf("/",8);
            System.out.println("삭제 이미지 : ");
            String key = findReview.getReviewImage().substring(index+1);
            amazonS3.deleteObject(bucket,key);
        }
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
}