package com.main_39.Spring.order.controller.dto;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.menu.Menu;
import com.main_39.Spring.order.controller.dto.OrderMenuPostRequestDto;
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
