package com.imnotdurnk.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "user")
public class UserEntity {

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

    @Column(length = 255, nullable = true)
    private String phone;

    @Column(length = 255, nullable = true)
    private String nickname;

    @Column(length = 255, nullable = true)
    private String address;

    @Column(name = "detailed_address", length = 255, nullable = true)
    private String detailedAddress;

    @Column(length = 255, nullable = true)
    private String latitude;

    @Column(length = 255, nullable = true)
    private String longitude;

    @Column(name = "postal_code", length = 255, nullable = true)
    private String postalCode;

    @Column(length = 255, nullable = true)
    private String voice;

    @Column(name = "emergency_call", length = 255, nullable = true)
    private String emergencyCall;

    @Column(name = "beer_capacity", length = 255, nullable = true)
    private String beerCapacity;

    @Column(name = "soju_capacity", length = 255, nullable = true)
    private String sojuCapacity;

    @Column(nullable = true)
    private Boolean unsure;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Boolean verified;

    public UserEntity() {}

    @Builder
    public UserEntity(Integer id, String email, String password, String name, String phone, String nickname, String address, String detailedAddress, String latitude, String longitude, String postalCode, String voice, String emergencyCall, String beerCapacity, String sojuCapacity, Boolean unsure, Boolean verified) {
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

}
