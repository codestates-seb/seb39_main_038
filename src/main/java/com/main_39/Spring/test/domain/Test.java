package com.main_39.Spring.test.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    @Builder
    public Test(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    public void ChangePhone(String phone) {
        this.phone = phone;
    }
}