package com.web.movie.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.movie.CustomException.NotFoundException;
import com.web.movie.Dto.request.CommentRequestDto;
import com.web.movie.Dto.response.CommentDto;
import com.web.movie.Entity.Comment;
import com.web.movie.Entity.User;
import com.web.movie.Repository.CommentRepository;
import com.web.movie.Repository.UserRepository;
import com.web.movie.mapper.CommentMapper;

@Service
public class CommentService {
    @Autowired private CommentRepository commentRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CommentMapper commentMapper;
    public CommentDto addComment(CommentRequestDto commentRequestDto){
        Comment comment = Comment.builder()
                            .comment(commentRequestDto.getComment())
                            .commentAt(LocalDateTime.now())
                            .movieId(commentRequestDto.getMovieId())
                            .build();
        User user = userRepository.findById(commentRequestDto.getUserId()).orElseThrow(()->new NotFoundException("User not found"));
        comment.setUser(user);
        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toCommentDto(savedComment);
    }
    public List<CommentDto> getCommentsOfMovie(int movieId){
        List<Comment> comments = commentRepository.findCommentsByMovieId(movieId);
        return commentMapper.toCommentDtos(comments);
    }
}
