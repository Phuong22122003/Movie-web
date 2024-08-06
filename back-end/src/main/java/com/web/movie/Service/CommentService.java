package com.web.movie.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.movie.Entity.Comment;
import com.web.movie.Repository.CommentRepository;

@Service
public class CommentService {
    @Autowired private CommentRepository commentRepository;
    public void addComment(Comment comment){
        commentRepository.save(comment);
    }
}
