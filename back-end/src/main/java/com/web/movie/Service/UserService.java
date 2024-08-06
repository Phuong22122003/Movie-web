package com.web.movie.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.movie.Dto.SigupRequest;
import com.web.movie.Entity.WebUser;
import com.web.movie.Repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    public WebUser findUserByUsername(String username){
        return userRepository.findUserByUsername(username);
    }
    public ResponseEntity<String> addUser(SigupRequest sigupRequest){
        if(sigupRequest.getUsername().trim().length()==0)
            return  ResponseEntity.badRequest().body("Username is empty");
        if(sigupRequest.getPassword().trim().length()==0)
            return  ResponseEntity.badRequest().body("Password is empty");
        if(sigupRequest.getEmail().trim().length()==0)
            return  ResponseEntity.badRequest().body("Email is empty");
        try {
            WebUser user = new WebUser();
            user.setUsername(sigupRequest.getUsername());
            user.setPassword(passwordEncoder.encode(sigupRequest.getPassword()));
            user.setEmail(sigupRequest.getEmail());
            user.setRole("USER");
            userRepository.save(user);
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            return  ResponseEntity.internalServerError().body("Can not create account now");
        }
    }
}
