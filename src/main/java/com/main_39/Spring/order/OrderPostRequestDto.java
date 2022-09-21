package com.main_39.Spring.order;

import lombok.Getter;

import java.util.List;

@Getter
public class OrderPostRequestDto {
    private long kakao_id;

    private List<OrderMenuPostRequestDto> orderMenus;

    /**
     * TODO: 구매자 ID 가지고 오기
     */
}
