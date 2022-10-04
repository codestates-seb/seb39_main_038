package com.main_39.Spring.order.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class OrdersResponse {

    private long kakaoId;

    private List<OrderResponse> orders;

    private int totalOrder;

    public OrdersResponse(long kakaoId, List<OrderResponse> orders, int totalOrder) {
        this.kakaoId = kakaoId;
        this.orders = orders;
        this.totalOrder = totalOrder;
    }
}
