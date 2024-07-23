package com.imnotdurnk.global.exception;

import com.imnotdurnk.global.response.CommonResponse;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


/**
 * 예외처리
 */

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    //DB에 insert, update 실패했을 때 발생하는 예외
    @ExceptionHandler(EntitySaveFailedException.class)
    public ResponseEntity<?> handleEntitySaveFailedException(EntitySaveFailedException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 토큰이 인증되지 않을 경우 발생하는 예외
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<?> handleInvalidTokenException(InvalidTokenException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }
    
    // DB에 존재하지 않는 데이터에 접근할 경우 발생하는 예외
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handlerResourceNotFoundException(ResourceNotFoundException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 잘못된 요청이 온 경우(400에러)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handlerBadRequestException(){
        return handleExceptionInternal(HttpStatus.BAD_REQUEST.value(), "잘못된 요청 형식입니다.");
    }

    // 필수 필드가 누락된 경우
    @ExceptionHandler(RequiredFieldMissingException.class)
    public ResponseEntity<?> handlerRequiredFieldMissingException(RequiredFieldMissingException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 메일 전송 실패
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<?> handleMessagingException(MessagingException exception){
        return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage());
    }

    // 메일 인증 전인 경우
    @ExceptionHandler(UserNotVerifiedException.class)
    public ResponseEntity<?> handleUserNotVerifiedException(UserNotVerifiedException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    private ResponseEntity<?> handleExceptionInternal(int code, String message){

        //응답 객체
        CommonResponse response = new CommonResponse();
        response.setStatusCode(code);
        response.setMessage(message);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}
