package com.main_39.Spring.review.mapper;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.comment.mapper.CommentMapper;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.review.dto.*;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",uses = CommentMapper.class)
public interface ReviewMapper {
    CommentMapper commentMapper = Mappers.getMapper(CommentMapper.class);
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    Review reviewKakaoesponseDto(ReviewResponseDto reviewResponseDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);

    default List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews,long Id,String login){
        return reviews.stream()
                .map(review -> {
                    CommentResponseDto commentResponseDto = commentMapper.commentToCommentResponseDto(review.getComment());

                    Kakao kakao = review.getKakao();
                    Local local = review.getLocal();

                    boolean isAuthor = false;
                    String nickname = "존재하지 않는 회원";

                    if(kakao != null) nickname = kakao.getNickname();
                    if(local != null) nickname = local.getName();

                    if(kakao != null && Id == kakao.getKakaoId()) isAuthor = true;
                    if(local != null && Id == local.getLocalId()) isAuthor = true;

                    ReviewResponseDto reviewResponseDto = ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .auth(isAuthor) //카카오  Id비교
                            .reviewGrade(review.getReviewGrade())
                            .reviewImage(review.getReviewImage())
                            .reviewContent(review.getReviewContent())
                            .createdAt(review.getCreatedAt())
                            .nickname(nickname)
                            .comment(commentResponseDto)
                            .build();

                    return reviewResponseDto;
                }).collect(Collectors.toList());
    }

    /**
     * 푸드트럭별 상점 조회
     */
    default ReviewsResponseDto reviewsToStoreResponseDto(Store store, long Id,String login) {
        List<Review> reviews = store.getReviews();
        ReviewsResponseDto reviewsResponseDto = new ReviewsResponseDto(
//            reviewsResponseDto = new ReviewsResponseDto(
                store.getStoreId(),
                store.getTotalReview(),
                store.getTotalGrade(),
                store.getTotalComment(),
                store.getTotalMenu(),
                reviewsToReviewResponseDtos(reviews,Id,login)); //카카오
        return reviewsResponseDto;
    }
}