package com.imnotdurnk.global.exception;

import com.imnotdurnk.global.commonClass.CommonResponse;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.sound.sampled.UnsupportedAudioFileException;


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
    public ResponseEntity<?> handlerBadRequestException(BadRequestException exception){
        return handleExceptionInternal(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
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

    // 유효하지 않은 형식인 경우 발생하는 예외
    @ExceptionHandler(InvalidDateException.class)
    public ResponseEntity<?> handleInvalidDateException(InvalidDateException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 음성파일 업로드 중 오류가 발생할 경우
    @ExceptionHandler(S3FileUploadException.class)
    public ResponseEntity<?> handleS3FileUploadException(S3FileUploadException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 외부 api 호출 실패
    @ExceptionHandler(ApiRequestFailedException.class)
    public ResponseEntity<?> handleApiRequestFailedException(ApiRequestFailedException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 외부 api 호출했을 때 시간초과(응답없음)
    @ExceptionHandler(ApiTimeOutException.class)
    public ResponseEntity<?> handleApiTimeOutException(ApiTimeOutException exception){

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONNECTION, "close");

        return handleExceptionInternalWithHeader(exception.getCode(), exception.getMessage(), headers);
    }

    // 포맷이 일치하지 않는 음성 파일인 경우
    @ExceptionHandler(UnsupportedAudioFileException.class)
    public ResponseEntity<?> handleUnsupportedAudioFileException(UnsupportedAudioFileException exception){
        return handleExceptionInternal(HttpStatus.BAD_REQUEST.value(), "음성 파일 포맷이 일치하지 않음");
    }

    // 인자로 전달되는 값이 잘못됨
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException exception){
        return handleExceptionInternal(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
    }

    // 파일 전처리 실패
    @ExceptionHandler(FailToConvertVoiceFileException.class)
    public ResponseEntity<?> handleFailToConvertVoiceFileException(FailToConvertVoiceFileException exception){
        return handleExceptionInternal(exception.getCode(), exception.getMessage());
    }

    // 예상하지 못한 예외 처리
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException exception){
        exception.printStackTrace();
        return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage());
    }

    // 예상하지 못한 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception exception){
        exception.printStackTrace();
        return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage());
    }

    private ResponseEntity<?> handleExceptionInternal(int code, String message){

        //응답 객체
        CommonResponse response = new CommonResponse();
        response.setStatusCode(code);
        response.setMessage(message);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    private ResponseEntity<?> handleExceptionInternalWithHeader(int code, String message, HttpHeaders headers){

        //응답 객체
        CommonResponse response = new CommonResponse();
        response.setStatusCode(code);
        response.setMessage(message);

        return ResponseEntity
                .status(response.getHttpStatus())
                .headers(headers)
                .body(response);
    }

}
