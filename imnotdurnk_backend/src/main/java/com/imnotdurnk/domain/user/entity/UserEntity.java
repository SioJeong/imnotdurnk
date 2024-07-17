package com.imnotdurnk.domain.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @Column(unique = true, nullable = false)
    private int id;

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

    @Column(length = 255, nullable = true)
    private Boolean unsure;

}
