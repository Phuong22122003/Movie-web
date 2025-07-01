package com.web.movie.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.movie.CustomException.NotFoundException;
import com.web.movie.Dto.SigupRequest;
import com.web.movie.Dto.UserDto;
import com.web.movie.Entity.User;
import com.web.movie.Repository.UserRepository;
import com.web.movie.mapper.UserMapper;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserMapper userMapper;
    public UserDto findUserByUsername(String username){
        User user =  userRepository.findByUsername(username).orElseThrow(()->new NotFoundException("Username not found"));
        user.setMovies(null);
        user.setPassword(null);
        
        return userMapper.toUserDto(user);
    }
    public UserDto addUser(SigupRequest sigupRequest){
        User user = new User();
        user.setUsername(sigupRequest.getUsername());
        user.setPassword(passwordEncoder.encode(sigupRequest.getPassword()));
        user.setEmail(sigupRequest.getEmail());
        user.setRole("USER");
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }
}
