package com.main_39.Spring.order.dto;

import com.main_39.Spring.order.entity.PaymentType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrderResponse {
    private long orderId;

    private int totalCount;

    private int totalPrice;

    private PaymentType paymentType;

    private LocalDateTime createdAt;

    @Builder
    public OrderResponse(long orderId, int totalCount, int totalPrice, PaymentType paymentType, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.totalCount = totalCount;
        this.totalPrice = totalPrice;
        this.paymentType = paymentType;
        this.createdAt = createdAt;
    }
}
