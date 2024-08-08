package com.imnotdurnk.domain.gamelog.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.dto.VoiceResultDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import com.imnotdurnk.domain.gamelog.repository.VoiceRepository;
import com.imnotdurnk.global.exception.*;
import com.imnotdurnk.global.util.AudioUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final S3FileUploadService s3FileUploadService;
    @Value("${etri.accesskey}")
    private String accessKey;
    private final String tempWavFilePath = System.getProperty("java.io.tmpdir");
    private static final String RAW_DIR = "/app/tmp/raw/";
    private static final String WAV_DIR = "/app/tmp/wav/";

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
    public VoiceResultDto getScoreFromVoice(MultipartFile file, String script)
            throws UnsupportedAudioFileException {

        Double score = null;
        File wavFile = multipartToFile(file);
        String fileTitle = null;
        try {
            fileTitle = audioUtil.SaveRaw(wavFile);
        }
        catch(IOException e){
            throw new FailToConvertVoiceFileException("음성 파일 전처리 실패");
        }

        //ETRI 발음평가 API 호출
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";   //한국어
        String languageCode = "korean";     // 언어 코드
//        String script = "상표 붙인 큰 깡통은 깐 깡통인가 안 깐 깡통인가";    // 평가 대본
        String audioFilePath = RAW_DIR + fileTitle;  // 녹음된 음성 파일 경로
        String audioContents = null;

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            Path path = Paths.get(audioFilePath);
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            throw new FailToConvertVoiceFileException("음성 파일을 Base64로 변환 실패");
        }

        argument.put("language_code", languageCode);
        argument.put("script", script);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;

        try {
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
            File rawFile = new File(RAW_DIR, fileTitle);
            deleteTempFile(rawFile);
//            deleteTempFile(wavFile);
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
        
        if(score == null) throw new ApiRequestFailedException("점수 결과가 존재하지 않음");

        VoiceResultDto result = new VoiceResultDto();
        result.setScore(calculateScore(score));
        result.setScript(script);
        result.setFilename(wavFile.getName());

        return result;
    }

    /***
     * S3에 wav 파일을 저장하고
     * DB에 파일명, 저장 경로, 게임 로그 아이디를 저장
     * @param filename
     * @param gameLogEntity
     */
    @Override
    public void saveVoiceFile(String filename, GameLogEntity gameLogEntity) {

        // 임시 파일 가져오기
        File file = new File(WAV_DIR, filename);
        if(!file.exists()){
            throw new ResourceNotFoundException("임시 파일을 찾을 수 없음");
        }

        // S3에 파일 업로드
        String fileUrl = s3FileUploadService.uploadFileObj(file);

        // DB에 넣을 voice 엔티티
        VoiceEntity voiceEntity = VoiceEntity.builder()
                .gameLogEntity(gameLogEntity) //게임 로그
                .fileUrl(fileUrl) //파일 경로
                .fileName(filename) //파일명
                .build();

        // DB에 음성 파일 정보 저장
        voiceEntity = voiceRepository.save(voiceEntity);

        //DB 저장 실패
        if(voiceEntity == null) throw new EntitySaveFailedException("음성 파일 저장 실패");

        //임시 파일 삭제
        deleteTempFile(file);

    }


    /***
     * MultipartFile 객체를 File 객체로 변환
     * @param mfile
     * @return 변환된 {@link File} 객체
     * @throws IllegalAccessException
     * @throws FailToConvertVoiceFileException
     */
    @Override
    public File multipartToFile(MultipartFile mfile) {
        // 현재시간_UUID.wav
        String originalFilename = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss"))
                + "_"
                + UUID.randomUUID().toString() + ".wav";
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new FailToConvertVoiceFileException("File name is invalid.");
        }

        // 안전한 임시 파일 경로를 설정
        File file = new File(WAV_DIR, originalFilename);

        try {
            // 파일 전송
            mfile.transferTo(file);

        } catch (IOException e) {
            // 예외 처리 및 파일 삭제
            if (file.exists()) {
                file.delete();
            }
            throw new FailToConvertVoiceFileException("파일 전처리 실패");
        }

        // 파일 정보 로그
        log.debug("임시 파일 저장: " + file.getAbsolutePath());
        return file;
    }

    /**
     * 임시 파일을 삭제하는 메소드
     * @param file 삭제할 파일
     */
    @Override
    public void deleteTempFile(File file) {

        if(!file.exists()) log.warn("임시 파일이 존재하지 않음: " + file.getAbsolutePath());
        else if (file.exists() && !file.delete()) {
            log.warn("임시 파일 삭제 실패: " + file.getAbsolutePath());
        }
        log.debug("임시 파일 삭제: " + file.getAbsolutePath());
    }

    @Override
    public void deleteTempFile(String filename) {
        File file = new File(WAV_DIR, filename);
        if (file.exists() && !file.delete()) {
            log.warn("임시 파일 삭제 실패: " + file.getAbsolutePath());
        }
        log.debug("임시 파일 삭제: " + file.getAbsolutePath());
    }

    /***
     * 발음평가 점수 계산
     * @param score
     * @return 0-100 사이의 정수
     */
    @Override
    public int calculateScore(double score) {
        return (int) ((score - 1) * 25);
    }


    /**
     * 음성 인식 API 호출
     * @param file
     * @return
     * @throws UnsupportedAudioFileException
     */
    @Override
    public String getScriptFromVoice(MultipartFile file)
            throws UnsupportedAudioFileException, IOException {

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
