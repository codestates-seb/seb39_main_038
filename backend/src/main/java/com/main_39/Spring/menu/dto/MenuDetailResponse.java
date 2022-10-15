package com.main_39.Spring.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MenuDetailResponse {
    private long storeId;
    private long menuId;
    private String name;
    private int price;
    private String content;
    private String image;
}