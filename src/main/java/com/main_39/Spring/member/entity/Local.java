package com.main_39.Spring.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Getter
@NoArgsConstructor
@Entity
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long local_id;

    @Column(length = 50,nullable = false)
    private String profile_nickname;

    @Column(length = 255)
    private String profile_image;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String account_email;

    @Column(length = 50, nullable = false)
    private String local_password;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.SELLER;

    //외래키 도입 전

    private enum Role{
        SELLER("ROLE_SELLER"),
        ADMIN("ROLE_ADMIN");

        @Getter
        private String status;

        Role(String status){
            this.status = status;
        }
    }

}