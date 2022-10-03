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

import java.util.Optional;
@Service
public class CommentService {
    private CommentRepository commentRepository;
    private ReviewService reviewService;
    private StoreService storeService;

    public CommentService(CommentRepository commentRepository,
                          ReviewService reviewService,
                          StoreService storeService) {
        this.commentRepository = commentRepository;
        this.storeService = storeService;
        this.reviewService = reviewService;
    }


//    public Comment createdComment(Comment comment) {
//
//        return commentRepository.save(comment);
//    }

    public Comment createdComment(long reviewId, Comment comment) {
        Review review = reviewService.findReview(reviewId);
        comment.addReview(review);

        return commentRepository.save(comment);
    }

//    public Comment findComment(long commentId) {
//        return findComment(commentId);
//    }

    public Page<Comment> findComment(long reviewId, int page, int size) {
        return commentRepository.findByReview_ReviewId(reviewId, PageRequest.of(page, size,
                Sort.by("commentId").descending()));
    }

    public void deleteComment(long reviewId, long commentId) {
        reviewService.findVerifiedReview(reviewId);
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }

    /**
     * 예외 처리 추가
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
