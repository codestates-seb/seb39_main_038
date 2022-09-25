package com.main_39.Spring.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponseDto {
    private long orderId;
    //    private long kakaoId;
    private List<OrderMenuResponseDto> orderMenus;

    private LocalDateTime createdAt;

    private int totalCount;

    private int totalPrice;

//    public void addKakao(Kakao kakao) {
//        this.kakao_id = kakao.getKakao_id();
//    }
}
