package com.main_39.Spring.order.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class OrdersResponse {


    private List<OrderResponse> orders;

    private int totalOrder;

    public OrdersResponse(List<OrderResponse> orders, int totalOrder) {
        this.orders = orders;
        this.totalOrder = totalOrder;
    }
}
