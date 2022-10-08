package com.main_39.Spring.comment.controller;

import com.main_39.Spring.comment.dto.CommentPatchDto;
import com.main_39.Spring.comment.dto.CommentPostDto;
import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.comment.mapper.CommentMapper;
import com.main_39.Spring.comment.service.CommentService;
import com.main_39.Spring.config.oauth.LocalDetails;
import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Local;
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
                                      @Valid @RequestBody CommentPostDto commentPostDto,
                                      Authentication authentication) {
        LocalDetails localDetails;
        Local local = null;
        if(authentication != null){
            localDetails = (LocalDetails) authentication.getPrincipal();
            local = localDetails.getLocal();
        }

        if(local == null) throw new BusinessLogicException(ExceptionCode.AUTH_REQUIRED_LOGIN);

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        if(local.getStore() == null || commentPostDto.getStoreId() != local.getStore().getStoreId()) throw new BusinessLogicException(ExceptionCode.REVIEW_PATCH_WRONG_ACCESS);


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
     * 답변 수정
     */
    @PatchMapping("/review/{review-id}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("review-id") @Positive long reviewId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto,
                                       Authentication authentication) {
        commentPatchDto.setCommentId(commentId);

        LocalDetails localDetails;
        Local local = null;
        if(authentication != null){
            localDetails = (LocalDetails) authentication.getPrincipal();
            local = localDetails.getLocal();
        }

        if(local == null) throw new BusinessLogicException(ExceptionCode.AUTH_REQUIRED_LOGIN);

        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);
        if(local.getStore() == null || commentPatchDto.getStoreId() != local.getStore().getStoreId()) throw new BusinessLogicException(ExceptionCode.REVIEW_PATCH_WRONG_ACCESS);

        Comment response = commentService.updateComment(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(response)),
                HttpStatus.OK);
    }
    /**
     * 답변 삭제
     */
    @DeleteMapping("/review/{review-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("review-id") long reviewId,
                                        @PathVariable("comment-id") @Positive long commentId,
                                        Authentication authentication) {
        LocalDetails localDetails;
        Local local = null;
        if(authentication != null){
            localDetails = (LocalDetails) authentication.getPrincipal();
            local = localDetails.getLocal();
        }
        if(local == null) throw new BusinessLogicException(ExceptionCode.STORE_PATCH_WRONG_ACCESS);

        Comment comment = commentService.findVerifiedComment(commentId);
        if(local.getStore() == null || comment.getStore().getStoreId() != local.getStore().getStoreId()) throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_AUTHORITY);

        System.out.println("#delete Comment");
        commentService.deleteComment(reviewId, commentId);
        System.out.println("삭제된 답글 : " + commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}