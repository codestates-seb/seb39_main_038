package com.main_39.Spring.order.dto;

import com.main_39.Spring.order.entity.PaymentType;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderRequest {

    private List<OrderMenuRequest> orderMenus;

    private String orderRequest;

    private PaymentType paymentType;
}
