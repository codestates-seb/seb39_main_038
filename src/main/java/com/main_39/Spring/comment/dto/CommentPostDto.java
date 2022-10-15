package com.main_39.Spring.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentPostDto {
    private long storeId;
    private long reviewId;
    private String commentContent;
}
