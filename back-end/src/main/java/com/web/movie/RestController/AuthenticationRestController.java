package com.web.movie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Dto.LoginRequest;
import com.web.movie.Dto.SigupRequest;
import com.web.movie.Jwt.JwtTokenProvider;
import com.web.movie.Service.UserService;

@RestController
@RequestMapping("/api/v1/authenticate")
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
            return ResponseEntity.badRequest().body("Wrong username or password");
        }
        String jwt = jwtTokenProvider.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok().body(jwt);
    }
    @PostMapping("/sigup")
    public ResponseEntity<String> sigup(@RequestBody SigupRequest sigupRequest){
        return userService.addUser(sigupRequest);
    }
}
