package com.main_39.Spring.comment.service;

import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.comment.repository.CommentRepository;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.review.service.ReviewService;
import com.main_39.Spring.store.service.StoreService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final ReviewService reviewService;
    private final StoreService storeService;

    public CommentService(CommentRepository commentRepository,
                          ReviewService reviewService,
                          StoreService storeService) {
        this.commentRepository = commentRepository;
        this.storeService = storeService;
        this.reviewService = reviewService;
    }

    /**
     * 답변 생성
     */
    public Comment createdComment(long reviewId, Comment comment) {
        Review review = reviewService.findReview(reviewId);
        comment.addReview(review);

        return commentRepository.save(comment);
    }

    /**
     * 전체 답변(리뷰 포함) 조회
     */
    public Page<Comment> findComment(long reviewId, int page, int size) {
        return commentRepository.findByReview_ReviewId(reviewId, PageRequest.of(page, size,
                Sort.by("commentId").descending()));
    }

    /**
     * 답변 삭제
     */
    public void deleteComment(long reviewId, long commentId) {

        //  수정
        Review review = reviewService.findVerifiedReview(reviewId);
        review.addComment(null);

        Comment findComment = findVerifiedComment(commentId);

        commentRepository.deleteById(commentId);
    }

    /**
     * 답변 수정
     */
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getCommentContent())
                .ifPresent(content -> findComment.setCommentContent(content));

        return commentRepository.save(findComment);
    }

    /**
     * 답변이 존재하는지 확인
     */
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_EXITS));
        return findComment;
    }
}