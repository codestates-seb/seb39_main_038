package com.main_39.Spring.order.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderMenuResponseDto {
    private long menuId;
    private String name;
    private int price;
    private int count;

    @Builder
    public OrderMenuResponseDto(long menuId, String name, int price, int count) {
        this.menuId = menuId;
        this.name = name;
        this.price = price;
        this.count = count;
    }
}
