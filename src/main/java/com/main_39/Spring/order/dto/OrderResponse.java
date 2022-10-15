package com.main_39.Spring.order.dto;

import com.main_39.Spring.order.entity.PaymentType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class OrderResponse {
    private long orderId;

    private List<OrderMenuResponse> orderMenu = new ArrayList<>();

    private int totalCount;

    private int totalPrice;

    private String orderRequest;

    private PaymentType paymentType;

    private LocalDateTime createdAt;

    @Builder
    public OrderResponse(long orderId, List<OrderMenuResponse> orderMenu, int totalCount, int totalPrice, String orderRequest, PaymentType paymentType, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.orderMenu = orderMenu;
        this.totalCount = totalCount;
        this.totalPrice = totalPrice;
        this.orderRequest = orderRequest;
        this.paymentType = paymentType;
        this.createdAt = createdAt;
    }
}
