package com.web.movie.Dto;

public class ResponseDetail {
    private Boolean isError;
    private String message;
    private Object data;
    public Boolean getIsError() {
        return isError;
    }
    public void setIsError(Boolean isError) {
        this.isError = isError;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }
    
}
