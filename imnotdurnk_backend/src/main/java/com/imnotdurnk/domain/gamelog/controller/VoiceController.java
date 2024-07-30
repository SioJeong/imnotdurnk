package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import com.imnotdurnk.domain.gamelog.service.S3FileUploadService;
import com.imnotdurnk.domain.gamelog.service.VoiceService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import com.imnotdurnk.global.response.SingleResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/voice")
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
            throw new BadRequestException("해당하는 게임 로그가 없음");
        }

        if (file.isEmpty()) {
            throw new BadRequestException("입력된 파일 없음");
        }

        String fileUrl = s3FileUploadService.uploadFile(file);
        voice.setFileUrl(fileUrl);
        CommonResponse response = new CommonResponse();
        voice.setFileName(file.getOriginalFilename());

        if (voiceService.addVoice(gameLogEntity, voice)) {
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("음성파일 등록 성공");
        } else {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("음성파일 등록 실패");
        }

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{logId}")
    public ResponseEntity<SingleResponse<VoiceDto>> getVoice(@PathVariable("logId") int logId) throws BadRequestException {

        VoiceDto voiceDto = voiceService.getVoiceByLogId(logId);

        if (voiceDto == null) {
            throw new BadRequestException("해당하는 음성파일 없음");
        }

        SingleResponse<VoiceDto> response = new SingleResponse<>();
        response.setData(voiceDto);
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("음성기록 찾기 완료. DTO 내 fileUrl을 확인하세요.");

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{logId}")
    public ResponseEntity<CommonResponse> deleteVoice(@PathVariable("logId") int logId) throws BadRequestException {

        CommonResponse response = new CommonResponse();
        String fileName = voiceService.getVoiceByLogId(logId).getFileName();

        if (fileName == null) {
            throw new BadRequestException("존재하지 않는 파일");
        }

        s3FileUploadService.deleteFile(fileName);

        if(voiceService.removeVoiceByLogId(logId)) {
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("음성파일 삭제 완료");
        } else {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("음성파일 삭제 실패");
        }

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
