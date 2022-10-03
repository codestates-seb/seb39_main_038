package com.main_39.Spring.comment.controller;

import com.main_39.Spring.comment.dto.CommentPostDto;
import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.comment.mapper.CommentMapper;
import com.main_39.Spring.comment.service.CommentService;
import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.review.entity.Review;
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
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;
    private final ReviewService reviewService;

    public CommentController(CommentService commentService,
                             CommentMapper mapper,
                             ReviewService reviewService) {
        this.commentService = commentService;
        this.mapper = mapper;
        this.reviewService = reviewService;
    }

//    @PostMapping("/review/{review-id}/comment/ask")
//    public ResponseEntity postComment(@PathVariable("review-id") @Positive long reviewId,
//            @Valid @RequestBody CommentPostDto commentPostDto) {
//        Comment comment =
//                commentService.createdComment(reviewId, mapper.commentPostDtoToComment(commentPostDto));
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)),
//        HttpStatus.CREATED);
//    }
    @PostMapping("/review/{review-id}/comment/ask")
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = mapper.commentPostDtoToComment(commentPostDto);

        Review review = reviewService.findReview(commentPostDto.getReviewId());
        comment.setReview(review);

        Comment posted = commentService.createdComment(comment);
        CommentResponseDto response = mapper.commentToCommentResponseDto(posted);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @GetMapping("/review/{review-id}/comment")
    public ResponseEntity getComment(@PathVariable("review-id") @Positive long reviewId,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam(required = false, defaultValue = "15") int size) {
        Page<Comment> pageComments = commentService.findComment(reviewId,page-1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentToCommentResponseDtos(comments),
                        pageComments),
                HttpStatus.OK);
    }


    @DeleteMapping("/review/{review-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("review-id") @Positive long reviewId,
                                        @PathVariable("comment-id") @Positive long commentId) {
        System.out.println("#delete Comment");
        commentService.deleteComment(reviewId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
