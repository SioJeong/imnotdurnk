package com.imnotdurnk.domain.gamelog.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.imnotdurnk.global.exception.S3FileUploadException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.logging.Logger;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3FileUploadService {
    private static final Logger logger = Logger.getLogger(S3FileUploadService.class.getName());
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final String defaultUrl = "https://imnotdurnk.s3.ap-northeast-2.amazonaws.com";

    public String uploadFile(MultipartFile file) throws IOException, S3FileUploadException {
        String originalFilename = file.getOriginalFilename();

        try {
            s3Client.putObject(bucketName, originalFilename, file.getInputStream(), getObjectMetadata(file));
            return defaultUrl + "/" + originalFilename;
        } catch (SdkClientException e) {
            throw new S3FileUploadException("파일 업로드 실패");
        }
    }

    /***
     * File 객체를 S3에 저장
     * @param file
     * @return
     */
    public String uploadFileObj(File file){
        String originalFilename = file.getName();
        try {
            /**
             * PutObjectResult	putObject(String bucketName, String key, File file)
             * Uploads the specified file to Amazon S3 under the specified bucket and key name.
             */
            s3Client.putObject(bucketName, originalFilename, file);
            return defaultUrl + "/" + originalFilename;
        } catch (SdkClientException e) {
            throw new S3FileUploadException("파일 업로드 실패");
        }
    }

    // MultipartFile 사이즈랑 타입 명시용
    private ObjectMetadata getObjectMetadata(MultipartFile file) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        return objectMetadata;
    }

    private String generateFileName(MultipartFile file) {
//        return UUID.randomUUID().toString() + "-" + file.getOriginalFilename(); // 중복안되게 랜덤하게 넣으려면 이렇게 그때그때 UUID붙여서
        return file.getOriginalFilename();
    }

    // 인코딩 필요하면 사용
    // 파일 이름을 UTF-8로 인코딩
    public static String encodeFileName(String fileName) {
        try {
            return URLEncoder.encode(fileName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return fileName; // 인코딩 실패 시 원래 파일 이름 리턴
        }
    }

    public S3Object downloadFile(String fileName) throws S3FileUploadException {
        try {
            return s3Client.getObject(new GetObjectRequest(bucketName, fileName));
        } catch (SdkClientException e) {
            throw new S3FileUploadException("파일 다운로드 실패");
        }
    }

    public void deleteFile(String fileName) throws S3FileUploadException {
        try {
            s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
        } catch (SdkClientException e) {
            throw new S3FileUploadException("파일 삭제 실패");
        }
    }

}
