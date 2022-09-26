package com.main_39.Spring.order.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class OrderPostRequestDto {
//    private long kakao_id;

    private List<OrderMenuPostRequestDto> orderMenus;

//    public Kakao getKakao() {
//        Kakao kakao = new Kakao();
//        kakao.addKakao(kakao_id);
//        return kakao;
//    }
}
