package com.main_39.Spring.menu;

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
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    private String name;

    private int price;

    private String content;

    private String image;

    /**
     * 주문에서 불러올 메뉴
     * TODO : 필요없으면 삭제
     */
    @Builder
    public Menu(String name, int price) {
        this.name = name;
        this.price = price;
    }
}
