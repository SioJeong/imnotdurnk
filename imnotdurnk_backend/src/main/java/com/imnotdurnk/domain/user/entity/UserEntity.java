package com.imnotdurnk.domain.user.entity;

import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.global.commonClass.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user")
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(length = 255, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(length = 255, nullable = false)
    private String phone;

    @Column(length = 255, nullable = true)
    private String nickname;

    @Column(length = 255, nullable = true)
    private String address;

    @Column(name = "detailed_address", length = 255, nullable = true)
    private String detailedAddress;

    @Column(length = 255, nullable = true)
    private Double latitude;

    @Column(length = 255, nullable = true)
    private Double longitude;

    @Column(name = "postal_code", length = 255, nullable = true)
    private String postalCode;

    @Column(length = 255, nullable = true)
    private String voice;

    @Column(name = "emergency_call", length = 255, nullable = true)
    private String emergencyCall;

    @Column(name = "beer_capacity", nullable = true)
    private Integer beerCapacity;

    @Column(name = "soju_capacity", nullable = true)
    private Integer sojuCapacity;

    @Column(nullable = true)
    private Boolean unsure;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Boolean verified;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Boolean deleted;

    public UserEntity() {}

    @Builder
    public UserEntity(Integer id, String email, String password, String name, String phone, String nickname, String address, String detailedAddress, Double latitude, Double longitude, String postalCode, String voice, String emergencyCall, Integer beerCapacity, Integer sojuCapacity, Boolean unsure, Boolean verified) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.nickname = nickname;
        this.address = address;
        this.detailedAddress = detailedAddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postalCode = postalCode;
        this.voice = voice;
        this.emergencyCall = emergencyCall;
        this.beerCapacity = beerCapacity;
        this.sojuCapacity = sojuCapacity;
        this.unsure = unsure;
        this.verified = verified;
    }

    /**
     * Entity를 Dto로 변환하는 함수
     *
     * @return 변환된 {@link UserDto}
     */
    public UserDto toDto() {
        return UserDto.builder()
                .email(email)
                .password(password)
                .name(name)
                .phone(phone)
                .nickname(nickname)
                .address(address)
                .detailedAddress(detailedAddress)
                .latitude(latitude)
                .longitude(longitude)
                .postalCode(postalCode)
                .voice(voice)
                .emergencyCall(emergencyCall)
                .beerCapacity(beerCapacity)
                .sojuCapacity(sojuCapacity)
                .unsure(unsure)
                .verified(verified)
                .build();
    }

}
