package com.main_39.Spring.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;
    private String commentContent;
    private LocalDateTime createdAt;
}
