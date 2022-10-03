package com.main_39.Spring.order.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class OrderRequest {

    private List<OrderMenuRequest> orderMenus;
}
