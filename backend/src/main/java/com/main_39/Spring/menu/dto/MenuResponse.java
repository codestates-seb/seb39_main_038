package com.main_39.Spring.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MenuResponse {

    private long menuId;

    private String name;

    private int price;

    private String content;

    private String image;
}
