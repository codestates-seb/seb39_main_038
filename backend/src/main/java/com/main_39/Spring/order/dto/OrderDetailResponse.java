package com.main_39.Spring.order.dto;

import com.main_39.Spring.order.entity.PaymentType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDetailResponse {
    private long orderId;

    private List<OrderMenuResponse> orderMenus;

    private int totalCount;

    private int totalPrice;

    private PaymentType paymentType;

    private String orderRequest;

    private LocalDateTime createdAt;
}
