package com.main_39.Spring.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrderResponse {
    private long orderId;

    private int totalCount;

    private int totalPrice;

    private LocalDateTime createdAt;

    @Builder
    public OrderResponse(long orderId, int totalCount, int totalPrice, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.totalCount = totalCount;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
    }
}
