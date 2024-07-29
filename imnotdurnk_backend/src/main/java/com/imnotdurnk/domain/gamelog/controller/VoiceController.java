package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import com.imnotdurnk.domain.gamelog.service.S3FileUploadService;
import com.imnotdurnk.domain.gamelog.service.VoiceService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/voice")
@RequiredArgsConstructor
public class VoiceController {

    private final VoiceService voiceService;
    private final GameLogServiceImpl gameLogService;
    private final S3FileUploadService s3FileUploadService;


    @PostMapping(value = "", consumes = "multipart/form-data")
    public ResponseEntity<CommonResponse> saveVoice(
            @RequestPart("voice") VoiceDto voice,
            @RequestPart MultipartFile file) throws IOException {

        GameLogEntity gameLogEntity = gameLogService.getGameLog(voice.getLogId());
        if (gameLogEntity == null) {
            throw new BadRequestException("해당하지 않는 게임 로그");
        }

        if (file.isEmpty()) {
            throw new BadRequestException("입력된 파일 없음");
        }

        String fileUrl = s3FileUploadService.uploadFile(file);
        voice.setFileUrl(fileUrl);
        CommonResponse response = new CommonResponse();
        if (voiceService.addVoice(gameLogEntity, voice)) {
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("음성파일 등록 성공");
        } else {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("음성파일 등록 실패");
        }

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
