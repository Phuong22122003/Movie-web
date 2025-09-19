package com.web.movie.Dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentRequestDto {
    private String comment;
    private int movieId;
}
