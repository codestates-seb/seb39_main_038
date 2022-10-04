package com.main_39.Spring.comment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponseDto {
    private long commentId;
    private String commentContent;
    private LocalDateTime createdAt;

    @Builder
    public CommentResponseDto(long commentId, String commentContent, LocalDateTime createdAt) {
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
    }
}
