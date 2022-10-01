package com.main_39.Spring.menu.dto;

import lombok.Getter;

@Getter
public class MenuDetailResponse {
    private long storeId;
    private long menuId;
    private String name;
    private int price;
    private String content;
    private String image;

    public MenuDetailResponse(long storeId, long menuId, String name, int price, String content, String image) {
        this.storeId = storeId;
        this.menuId = menuId;
        this.name = name;
        this.price = price;
        this.content = content;
        this.image = image;
    }
}