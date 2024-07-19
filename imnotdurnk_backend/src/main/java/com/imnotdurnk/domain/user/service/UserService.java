package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface UserService {

    UserDto signUp(UserDto userDto);
    boolean existsByEmail(String email);
    boolean sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException;
    boolean sendMail(String email, String title, String code) throws MessagingException, UnsupportedEncodingException;
    boolean verifyCode(String email, String verificationCode);

    /**
     * Dto를 Entity로 변환하는 함수
     *
     * @param userDto - Entity로 바꿀 대상이 되는 {@link UserDto}
     * @return 변환된 {@link UserEntity}
     *
     */
    default UserEntity toUserEntity(UserDto userDto){
        UserEntity user = UserEntity.builder()
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .nickname(userDto.getNickname())
                .address(userDto.getAddress())
                .detailedAddress(userDto.getDetailedAddress())
                .latitude(userDto.getLatitude())
                .longitude(userDto.getLongitude())
                .postalCode(userDto.getPostalCode())
                .voice(userDto.getVoice())
                .emergencyCall(userDto.getEmergencyCall())
                .beerCapacity(userDto.getBeerCapacity())
                .sojuCapacity(userDto.getSojuCapacity())
                .unsure(userDto.getUnsure())
                .verified(userDto.getVerified())
                .build();
        return user;
    }

}
