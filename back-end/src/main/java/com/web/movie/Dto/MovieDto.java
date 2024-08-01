package com.web.movie.Dto;

import java.util.List;

import com.web.movie.Entity.Comment;

public class MovieDto {
    private String name;
    private Integer genre;
    private String source;
    private List<Comment> listComment;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getGenre() {
        return genre;
    }
    public void setGenre(Integer genre) {
        this.genre = genre;
    }
    public String getSource() {
        return source;
    }
    public void setSource(String source) {
        this.source = source;
    }
    public List<Comment> getListComment() {
        return listComment;
    }
    public void setListComment(List<Comment> listComment) {
        this.listComment = listComment;
    }
    
}
