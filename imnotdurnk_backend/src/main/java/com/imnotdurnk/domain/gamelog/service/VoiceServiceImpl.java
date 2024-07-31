package com.imnotdurnk.domain.gamelog.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import com.imnotdurnk.domain.gamelog.repository.VoiceRepository;
import com.imnotdurnk.global.util.AudioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VoiceServiceImpl implements VoiceService {

    private final VoiceRepository voiceRepository;
    private final AudioUtil audioUtil;
    @Value("${etri.accesskey}")
    private String accessKey;

    @Override
    public boolean addVoice(GameLogEntity gameLogEntity, VoiceDto voiceDto) {
        VoiceEntity voiceEntity = voiceDto.toEntity(gameLogEntity);
        return voiceRepository.save(voiceEntity) != null;
    }

    @Override
    public VoiceDto getVoiceByLogId(int logId) {
        return voiceRepository.findByLogId(logId).toDto();
    }

    @Override
    public boolean removeVoiceByLogId(int logId) {
        voiceRepository.deleteByLogId(logId);
        return voiceRepository.findByLogId(logId) == null;
    }

    /***
     * 음성 파일(wav, 16kHz)을 입력 받고 외부 API를 호출하여 발음 평가 점수를 얻어냄
     * @param file
     * @return 발음평가 점수 (0점-100점)
     * @throws java.io.IOException
     * @throws IllegalAccessException
     * @throws javax.sound.sampled.UnsupportedAudioFileException
     */
    @Override
    public int getScoreFromVoice(MultipartFile file)
            throws IOException, IllegalAccessException, UnsupportedAudioFileException {

        Double score = null;
        String fileTitle = audioUtil.SaveRaw(multipartToFile(file));

        //ETRI 발음평가 API 호출
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";   //한국어
        String languageCode = "korean";     // 언어 코드
        String script = "상표 붙인 큰 깡통은 깐 깡통인가 안 깐 깡통인가";    // 평가 대본
        String audioFilePath = fileTitle;  // 녹음된 음성 파일 경로
        String audioContents = null;

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            Path path = Paths.get(audioFilePath);
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        argument.put("language_code", languageCode);
        argument.put("script", script);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;

        url = new URL(openApiURL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        con.setRequestProperty("Authorization", accessKey);

        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.write(gson.toJson(request).getBytes("UTF-8"));
        wr.flush();
        wr.close();

        responseCode = con.getResponseCode();
        InputStream is = con.getInputStream();
        byte[] buffer = new byte[is.available()];
        int byteRead = is.read(buffer);
        responBody = new String(buffer);

        // JSON 객체로 변환
        Gson responseGson = new Gson();
        JsonObject jsonResponse = responseGson.fromJson(responBody, JsonObject.class);

        // JSON 객체에서 return_object 추출
        if (jsonResponse.has("return_object")) {
            JsonObject returnObject = jsonResponse.getAsJsonObject("return_object");

            // return_object에서 score 필드 값을 추출
            if (returnObject.has("score")) {
                score = returnObject.get("score").getAsDouble();
            }
        }

        //작업이 끝나면 raw파일 삭제
        File deleteFile = new File(fileTitle);
        if(deleteFile.exists()) deleteFile.delete();

        //1점-5점 -> 0~4점 -> 0~100점으로 보정
        return (int) ((score - 1) * 25);
    }

    /***
     * MultipartFile 객체를 File 객체로 변환
     * @param mfile
     * @return 변환된 {@link File} 객체
     * @throws IllegalAccessException
     * @throws IOException
     */
    @Override
    public File multipartToFile(MultipartFile mfile) throws IOException {
        File file = new File(mfile.getOriginalFilename());
        mfile.transferTo(file);
        return file;
    }


}
