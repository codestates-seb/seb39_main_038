package com.main_39.Spring.order.entity;

import lombok.Getter;

public enum PaymentType {

    CASH, CARD;

    @Getter
    private String type;
}
