package com.main_39.Spring.comment.mapper;

import com.main_39.Spring.comment.dto.CommentPatchDto;
import com.main_39.Spring.comment.dto.CommentPostDto;
import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);
    CommentResponseDto commentToCommentResponseDto(Comment comment);
    List<CommentResponseDto> commentToCommentResponseDtos(List<Comment> comments);
}

