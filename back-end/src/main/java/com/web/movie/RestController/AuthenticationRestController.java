package com.web.movie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Config.JwtTokenProvider;
import com.web.movie.CustomException.BadRequestException;
import com.web.movie.Dto.LoginRequest;
import com.web.movie.Dto.SigupRequest;
import com.web.movie.Dto.UserDto;
import com.web.movie.Service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/authenticate")
@Tag(name = "Authentication")
public class AuthenticationRestController {
    @Autowired private JwtTokenProvider jwtTokenProvider;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        }
        catch (Exception ex){
            throw new BadRequestException("Username or password are incorrect");
        }
        String jwt = jwtTokenProvider.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok().body(jwt);
    }
    @PostMapping("/sigup")
    public ResponseEntity<UserDto> sigup(@RequestBody SigupRequest sigupRequest){
        return ResponseEntity.ok().body(userService.addUser(sigupRequest));
    }
}
