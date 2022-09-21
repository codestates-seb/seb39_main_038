package com.main_39.Spring.order.mapper;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.menu.Menu;
import com.main_39.Spring.order.controller.dto.OrderPostRequestDto;
import com.main_39.Spring.order.entity.Order;
import com.main_39.Spring.order.entity.OrderMenu;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    default Order orderPostRequestDtoToOrder(OrderPostRequestDto requestDto) {
        Order order = new Order();
        Kakao kakao = new Kakao();
        kakao.addKakao(requestDto.getKakao_id());
        /**
         * TODO : builder 패턴으로 변환
         */
        List<OrderMenu> orderMenus = requestDto.getOrderMenus().stream()
                .map(orderMenuPostRequestDto -> {
                    OrderMenu orderMenu = new OrderMenu();
                    Menu menu = new Menu();
                    menu.addMenuId(orderMenuPostRequestDto.getMenuId());
                    orderMenu.addOrder(order);
                    orderMenu.addMenu(menu);
                    orderMenu.addCount(orderMenuPostRequestDto.getCount());
                    return orderMenu;
                }).collect(Collectors.toList());
        order.addKakao(kakao);
        order.addOrderMenus(orderMenus);

        return order;
    }
}
