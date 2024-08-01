package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;

public interface VoiceService {

    boolean addVoice(GameLogEntity gameLogEntity, VoiceDto voiceDto);

    VoiceDto getVoiceByLogId(int logId);

    boolean removeVoiceByLogId(int logId);

    int getScoreFromVoice(MultipartFile file) throws IOException, IllegalAccessException, UnsupportedAudioFileException;

    File multipartToFile(MultipartFile mfile) throws IOException;

    void deleteTempFile(File file) throws IOException;

    String getScriptFromVoice(MultipartFile file) throws IOException, IllegalAccessException, UnsupportedAudioFileException;
}
