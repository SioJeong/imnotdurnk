package com.imnotdurnk.domain.gamelog.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import com.imnotdurnk.domain.gamelog.repository.VoiceRepository;
import com.imnotdurnk.global.exception.ApiRequestFailedException;
import com.imnotdurnk.global.exception.ApiTimeOutException;
import com.imnotdurnk.global.util.AudioUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VoiceServiceImpl implements VoiceService {

    private static final Logger log = LoggerFactory.getLogger(VoiceServiceImpl.class);
    private final VoiceRepository voiceRepository;
    private final AudioUtil audioUtil;
    @Value("${cloud.aws.credentials.accessKey}")
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
        File wavFile = multipartToFile(file);
        String fileTitle = audioUtil.SaveRaw(wavFile);

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

        // 타임아웃 설정
        con.setConnectTimeout(30000); // 30초 연결 타임아웃
        con.setReadTimeout(30000);    // 30초 읽기 타임아웃

        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.write(gson.toJson(request).getBytes("UTF-8"));
        wr.flush();
        wr.close();

        log.info("[ETRI 발음평가 API 호출] " + fileTitle);

        try {
            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);
        } catch (SocketTimeoutException e) {
            log.error("발음평가 API 응답 시간 초과");
            throw new ApiTimeOutException("API 응답 시간 초과");
        } catch (IOException e) {
            log.error("발음평가 API 호출 실패");
            throw new ApiRequestFailedException("API 호출 실패");
        } finally {
            // 파일 삭제
            File rawFile = new File(fileTitle);
            deleteTempFile(rawFile);
            deleteTempFile(wavFile);
        }

        
        log.info("[ETRI 발음평가 API 호출 결과]");
        log.info("응답 코드: " + responseCode );
        log.info("응답 내용: " + responBody);

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

        //작업이 끝나면 raw파일 및 임시파일 삭제
        File rawFile = new File(fileTitle);
        deleteTempFile(rawFile);
        deleteTempFile(wavFile);


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
        // 파일 이름을 안전하게 처리하기 위해 UUID를 사용하거나 경로를 지정
        String originalFilename = UUID.randomUUID().toString() + mfile.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IOException("File name is invalid.");
        }

        // 안전한 임시 파일 경로를 설정
        File file = new File(System.getProperty("java.io.tmpdir"), originalFilename);

        try {
            // 파일 전송
            mfile.transferTo(file);
        } catch (IOException e) {
            // 예외 처리 및 파일 삭제
            if (file.exists()) {
                file.delete();
            }
        }

        // 파일 정보 로그
        log.debug("임시 파일 저장: " + file.getAbsolutePath());
        return file;
    }

    /**
     * 임시 파일을 삭제하는 메소드
     * @param file 삭제할 파일
     * @throws IOException 파일 삭제 중 오류 발생 시
     */
    @Override
    public void deleteTempFile(File file) {
        if (file.exists() && !file.delete()) {
            log.warn("임시 파일 삭제 실패: " + file.getAbsolutePath());
        }
        log.debug("임시 파일 삭제: " + file.getAbsolutePath());
    }


    @Override
    public String getScriptFromVoice(MultipartFile file)
            throws IOException, IllegalAccessException, UnsupportedAudioFileException {

        String result = null;

        File wavFile = multipartToFile(file);
        String fileTitle = audioUtil.SaveRaw(wavFile);

        //ETRI 음성인식 API 호출
        String languageCode = "korean";     // 언어 코드
        String audioFilePath = fileTitle;  // 녹음된 음성 파일 경로
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
        String audioContents = null;

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        Path path = Paths.get(audioFilePath);
        byte[] audioBytes = Files.readAllBytes(path);
        audioContents = Base64.getEncoder().encodeToString(audioBytes);
        
        argument.put("language_code", languageCode);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;

        url = new URL(openApiURL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        con.setRequestProperty("Authorization", accessKey);

        con.setConnectTimeout(30000); // 30초 연결 타임아웃
        con.setReadTimeout(30000);    // 30초 읽기 타임아웃

        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.write(gson.toJson(request).getBytes("UTF-8"));
        wr.flush();
        wr.close();

        log.info("[ETRI 음성인식 API 호출] " + fileTitle);

        try {
            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);
        } catch (SocketTimeoutException e) {
            log.error("음성인식 API 응답 시간 초과");
            throw new ApiTimeOutException("API 응답 시간 초과");
        } catch (IOException e) {
            log.error("음성인식 API 호출 실패");
            throw new ApiRequestFailedException("API 호출 실패");
        } finally {
            // 파일 삭제
            File rawFile = new File(fileTitle);
            deleteTempFile(rawFile);
            deleteTempFile(wavFile);
        }

        //결과 로그
        log.info("[ETRI 음성인식 API 호출 결과]");
        log.info("응답 코드: " + responseCode );
        log.info("응답 내용: " + responBody);

        // JSON 객체로 변환
        Gson responseGson = new Gson();
        JsonObject jsonResponse = responseGson.fromJson(responBody, JsonObject.class);

        // JSON 객체에서 return_object 추출
        if (jsonResponse.has("return_object")) {
            JsonObject returnObject = jsonResponse.getAsJsonObject("return_object");

            // return_object에서 score 필드 값을 추출
            if (returnObject.has("recognized")) {
                result = returnObject.get("recognized").getAsString();
            }
        }

        return result;

    }

}
