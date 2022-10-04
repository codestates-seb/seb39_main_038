package com.main_39.Spring.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDetailResponse {
    private long orderId;

    private long kakaoId;

    private List<OrderMenuResponse> orderMenus;

    private int totalCount;

    private int totalPrice;

    private LocalDateTime createdAt;
}