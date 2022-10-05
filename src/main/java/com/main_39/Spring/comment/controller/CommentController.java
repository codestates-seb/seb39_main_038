package com.main_39.Spring.comment.controller;

import com.main_39.Spring.comment.dto.CommentPostDto;
import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.comment.mapper.CommentMapper;
import com.main_39.Spring.comment.service.CommentService;
import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
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
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;
    private final ReviewService reviewService;

    private final StoreService storeService;

    public CommentController(CommentService commentService,
                             CommentMapper mapper,
                             ReviewService reviewService,
                             StoreService storeService) {
        this.commentService = commentService;
        this.mapper = mapper;
        this.reviewService = reviewService;
        this.storeService = storeService;
    }

    /**
     * 답변 등록
     */
    @PostMapping("/review/{review-id}/comment/ask")
    public ResponseEntity postComment(@PathVariable("review-id") long reviewId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = mapper.commentPostDtoToComment(commentPostDto);

        Store store = storeService.findStore(commentPostDto.getStoreId());
        comment.setStore(store);

        Comment posted = commentService.createdComment(reviewId, comment);
        CommentResponseDto response = mapper.commentToCommentResponseDto(posted);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 헤당 리뷰의 답변 불러오기
     */
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

    /**
     * 답변 삭제
     */
    @DeleteMapping("/review/{review-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("review-id") @Positive long reviewId,
                                        @PathVariable("comment-id") @Positive long commentId) {
        System.out.println("#delete Comment");
        commentService.deleteComment(reviewId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}