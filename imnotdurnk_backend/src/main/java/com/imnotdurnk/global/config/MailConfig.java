package com.imnotdurnk.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.port}")
    private Integer port;
    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String auth;
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private String starttlsEnable;
    @Value("${spring.mail.properties.mail.smtp.debug}")
    private String debug;
    @Value("${spring.mail.properties.mail.smtp.ssl.trust}")
    private String sslTrust;
    @Value("${spring.mail.properties.mail.smtp.ssl.enable}")
    private String sslEnable;

    @Bean
    public JavaMailSender javaMailService() {

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost(host); // smtp 서버 주소
        javaMailSender.setUsername(username); // 네이버 아이디
        javaMailSender.setPassword(password); // 네이버 비밀번호
        javaMailSender.setPort(port); // 메일 인증서버 포트
        javaMailSender.setJavaMailProperties(getMailProperties()); // 메일 인증서버 정보 가져오기

        return javaMailSender;
    }

    private Properties getMailProperties() {

        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.setProperty("mail.smtp.auth", auth); // smtp 인증
        properties.setProperty("mail.smtp.starttls.enable", starttlsEnable); // smtp strattles 사용
        properties.setProperty("mail.debug", debug); // 디버그 사용
        properties.setProperty("mail.smtp.ssl.trust",sslTrust); // ssl 인증 서버는 smtp.gmail.com
        properties.setProperty("mail.smtp.ssl.enable",sslEnable); // ssl 사용
        return properties;
    }

}
