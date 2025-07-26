package com.web.movie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Dto.response.UserDto;
import com.web.movie.Service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/user")
@Tag(name="UserController")
public class UserRestController {
    @Autowired private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> profile(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        UserDto user = userService.findUserByUsername(authentication.getName());
        return ResponseEntity.ok().body(user);
    }
}
