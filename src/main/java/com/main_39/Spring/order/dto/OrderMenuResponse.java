package com.main_39.Spring.order.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderMenuResponse {
    private long menuId;
    private long storeId;
    private String name;
    private int price;
    private int count;

    @Builder
    public OrderMenuResponse(long menuId, long storeId, String name, int price, int count) {
        this.menuId = menuId;
        this.storeId = storeId;
        this.name = name;
        this.price = price;
        this.count = count;
    }
}
