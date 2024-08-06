package com.web.movie.RestController;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Entity.Comment;
import com.web.movie.Entity.WebUser;
import com.web.movie.Service.CommentService;
import com.web.movie.Service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/user")
public class UserRestController {
    @Autowired private CommentService commentService;
    @Autowired private UserService userService;
    @PostMapping("/comment")
    public ResponseEntity<?> comment(@RequestBody Comment comment){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        System.out.println(comment.getComment());
        comment.setUsername(authentication.getName());
        comment.setCommentDate(LocalDateTime.now());
        try {
            commentService.addComment(comment);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Can comment");
        }
        return ResponseEntity.ok().body(comment);
    }
    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        WebUser user = userService.findUserByUsername(authentication.getName());
        user.setPassword(null);
        return ResponseEntity.ok().body(user);
    }
}
