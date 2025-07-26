package com.web.movie.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.web.movie.Dto.response.CommentDto;
import com.web.movie.Entity.Comment;

@Mapper(componentModel="spring")
public interface CommentMapper {
    public CommentDto toCommentDto(Comment comment);
    public List<CommentDto> toCommentDtos(List<Comment> comments);
}
