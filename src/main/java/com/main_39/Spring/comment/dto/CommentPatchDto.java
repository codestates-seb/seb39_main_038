package com.main_39.Spring.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentPatchDto {
    private long storeId;
    private long reviewId;
    private long commentId;
    private String commentContent;

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }
    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }
}
