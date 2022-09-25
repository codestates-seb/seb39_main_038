package com.main_39.Spring.order.mapper;

import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.order.dto.OrderMenuResponseDto;
import com.main_39.Spring.order.dto.OrderPostRequestDto;
import com.main_39.Spring.order.dto.OrderResponseDto;
import com.main_39.Spring.order.entity.Order;
import com.main_39.Spring.order.entity.OrderMenu;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    default Order orderPostDtoToOrder(OrderPostRequestDto requestDto) {
        Order order = new Order();

//        Kakao kakao = new Kakao();
//        kakao.addKakao(requestDto.getKakao_id());

        List<OrderMenu> orderMenus = requestDto.getOrderMenus()
                .stream()
                .map(orderMenuRequest -> {
                    Menu menu = new Menu();
                    menu.addMenuId(orderMenuRequest.getMenuId());
                    OrderMenu orderMenu = OrderMenu.builder()
                            .order(order)
                            .menu(menu)
                            .count(orderMenuRequest.getCount())
                            .build();
                    return orderMenu;
                }).collect(Collectors.toList());

//        order.addKakao(kakao);
        order.addOrderMenus(orderMenus);

        return order;
    }

    default OrderResponseDto orderToOrderResponseDto(Order order) {
        List<OrderMenu> orderMenus = order.getOrderMenus();

        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setOrderId(order.getOrderId());
//        orderResponseDto.setKakao(order.order.getKakao());
        orderResponseDto.setCreatedAt(order.getCreatedAt());
        orderResponseDto.setTotalCount(order.getTotalCount());
        orderResponseDto.setTotalPrice(order.getTotalPrice());
        orderResponseDto.setOrderMenus(orderMenusToOrderMenuResponseDtos(orderMenus));
        return orderResponseDto;
    }

    default List<OrderMenuResponseDto> orderMenusToOrderMenuResponseDtos(
            List<OrderMenu> orderMenus) {
        return orderMenus.stream()
                .map(orderMenu -> OrderMenuResponseDto
                        .builder()
                        .menuId(orderMenu.getMenu().getMenuId())
                        .name(orderMenu.getMenu().getName())
                        .price(orderMenu.getMenu().getPrice())
                        .count(orderMenu.getCount())
                        .build()).collect(Collectors.toList());
    }
}