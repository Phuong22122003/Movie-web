package com.web.movie.CustomException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.web.movie.Dto.ResponseDto;

@RestControllerAdvice
public class GlobalException {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseDto> handlerBadRequest(BadRequestException ex){
        return ResponseEntity.badRequest().body(
            ResponseDto.builder()
            .code(HttpStatus.BAD_REQUEST.value())
            .message(ex.getMessage())
            .build());
    }
}
