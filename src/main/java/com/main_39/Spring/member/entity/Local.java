package com.main_39.Spring.member.entity;

import com.main_39.Spring.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long localId;

    @Column(length = 255)
    private String avatar;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    //암호화로 인해 최소 60자
    @Column(length = 255, nullable = false)
    private String password;

    @Column(nullable = false, length = 20, unique = true)
    private String phone;

    @Setter
    @Column
    private String refreshToken;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.SELLER;

    //외래키
    @OneToOne(mappedBy = "local")
    private Store store;

    public enum Role{
        SELLER("ROLE_SELLER"),
        ADMIN("ROLE_ADMIN");

        @Getter
        private String status;

        Role(String status){
            this.status = status;
        }
    }

}