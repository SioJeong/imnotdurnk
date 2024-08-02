package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.dto.VoiceResultDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import com.imnotdurnk.domain.gamelog.service.S3FileUploadService;
import com.imnotdurnk.domain.gamelog.service.VoiceService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import com.imnotdurnk.global.exception.RequiredFieldMissingException;
import com.imnotdurnk.global.response.SingleResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
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


    /***
     * 발음 평가
     * 음성 파일 받고 전처리 이후 발음 평가 API를 호출해서 점수를 가져옴
     * @param file
     * @return 발음 평가 점수와 파일명, 대사를 포함한 {@link VoiceResultDto} 객체
     */
    @PostMapping(value="/pronounce", consumes = "multipart/form-data")
    public ResponseEntity<?> gameAboutPronunciation(@RequestPart MultipartFile file)
            throws UnsupportedAudioFileException, IOException, IllegalAccessException {

        if(file.isEmpty()) throw new RequiredFieldMissingException("음성 파일 누락");

        //점수 가져오기
        VoiceResultDto result = voiceService.getScoreFromVoice(file);


        SingleResponse response = new SingleResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("발음 평가 결과");
        response.setData(result);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /***
     * 발음 평가 결과 저장
     * @param accessToken
     * @param voiceResultDto 평가 결과, 대본, 임시파일명
     * @return
     */
    @PostMapping("/pronounce/save")
    public ResponseEntity<?> savePronunciationResult(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                                     @RequestBody VoiceResultDto voiceResultDto) throws BadRequestException {

        if(voiceResultDto == null) throw new RequiredFieldMissingException("필수 필드 누락");
        if(voiceResultDto.getPlanId() == 0)
            throw new RequiredFieldMissingException("일정 아이디 누락");
        if(voiceResultDto.getFilename() == null
                || voiceResultDto.getFilename().equals("")) throw new RequiredFieldMissingException("임시파일명을 알 수 없음");


        // 게임 로그 + 점수 저장
        GameLogEntity gameLogEntity = gameLogService.savePronounceGameLog(accessToken, voiceResultDto);

        // 음성 파일 저장 및 임시 파일 삭제
        voiceService.saveVoiceFile(voiceResultDto.getFilename(), gameLogEntity);

        CommonResponse response = new CommonResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("결과 저장 완료");

        return ResponseEntity.status(response.getHttpStatus()).body(response);

    }

    /**
     * 발음 평가 결과를 저장하지 않음
     * @param voiceResultDto
     * @return
     */
    @PostMapping("/pronounce/not-save")
    public ResponseEntity<?> notSavePronunciationResult(@RequestBody VoiceResultDto voiceResultDto){


        CommonResponse response = new CommonResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("결과를 저장하지 않음");

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}
