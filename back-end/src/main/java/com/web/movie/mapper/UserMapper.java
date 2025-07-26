package com.web.movie.mapper;

import org.mapstruct.Mapper;

import com.web.movie.Dto.SigupRequest;
import com.web.movie.Dto.response.UserDto;
import com.web.movie.Entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    UserDto toUserDto(User user);

    User toUser(SigupRequest sigupRequest);
}
