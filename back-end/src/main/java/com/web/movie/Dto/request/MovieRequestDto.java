package com.web.movie.Dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieRequestDto {
    private String name;
    private String description;
    private String countryId;
    private String genreId;
}
