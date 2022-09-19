package com.main_39.Spring.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;


@Getter
@NoArgsConstructor
@Entity
public class Kakao {
    @Id
    @Column(nullable = false, updatable = false, unique = true)
    private Long kakao_id;
    @Column
    private String connected_at;
    @Column(nullable = false,length = 50)
    private String nickname;
    @Column(length = 255)
    private String profile_image;
    @Column(length = 255)
    private String thumbnail_image;
    @Column(unique = true, length = 50)
    private String email;

    @Column(nullable = false, updatable = true, unique = true)
    private String refresh_token;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Role role = Role.CUSTOMER;

    @Builder
    Kakao(Long kakao_id, String nickname, String connected_at, String profile_image, String thumbnail_image, String email, String refresh_token){
        this.kakao_id = kakao_id;
        this.nickname = nickname;
        this.connected_at = connected_at;
        this.profile_image = profile_image;
        this.thumbnail_image = thumbnail_image;
        this.email = email;
        this.refresh_token = refresh_token;
    }

    public enum Role {
        ROLE_USER("ROLE_USER"),
        CUSTOMER("ROLE_CUSTOMER"),
        SELLER("ROLE_SELLER");

        @Getter
        private String status;

        Role(String status){
            this.status = status;
        }
    }
}
