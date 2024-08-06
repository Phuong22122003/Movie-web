package com.web.movie.CustomException;

public class ImageException extends Exception{
    private Boolean isEmpty;
    public void setIsEmpty(Boolean isEmpty){
        this.isEmpty = isEmpty;
    }
    public ImageException(String message){
        super(message);
    }
}
