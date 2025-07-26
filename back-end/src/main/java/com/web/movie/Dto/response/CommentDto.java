package com.web.movie.Dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDto {
    private String id;
    private String comment;
    private LocalDateTime commentAt;
    private UserDto user;
}
