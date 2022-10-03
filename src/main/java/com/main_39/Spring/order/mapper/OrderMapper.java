package com.main_39.Spring.order.mapper;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.order.dto.OrderMenuResponse;
import com.main_39.Spring.order.dto.OrderRequest;
import com.main_39.Spring.order.dto.OrderDetailResponse;
import com.main_39.Spring.order.dto.OrderResponse;
import com.main_39.Spring.order.dto.OrdersResponse;
import com.main_39.Spring.order.entity.Order;
import com.main_39.Spring.order.entity.OrderMenu;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    default Order orderPostDtoToOrder(OrderRequest requestDto, Kakao kakao) {

        Order order = new Order();

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

        order.addKakao(kakao);
        order.addOrderMenus(orderMenus);

        return order;
    }

    default OrderDetailResponse orderToOrderDetailResponse(Order order) {
        List<OrderMenu> orderMenus = order.getOrderMenus();

        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setOrderId(order.getOrderId());
        orderDetailResponse.setKakaoId(order.getKakao().getKakaoId());
        orderDetailResponse.setTotalCount(order.getTotalCount());
        orderDetailResponse.setTotalPrice(order.getTotalPrice());
        orderDetailResponse.setCreatedAt(order.getCreatedAt());
        orderDetailResponse.setOrderMenus(orderMenusToOrderMenuResponseDtos(orderMenus));
        return orderDetailResponse;
    }

    default List<OrderMenuResponse> orderMenusToOrderMenuResponseDtos(
            List<OrderMenu> orderMenus) {
        return orderMenus.stream()
                .map(orderMenu -> OrderMenuResponse
                        .builder()
                        .menuId(orderMenu.getMenu().getMenuId())
                        .name(orderMenu.getMenu().getName())
                        .price(orderMenu.getMenu().getPrice())
                        .count(orderMenu.getCount())
                        .build()).collect(Collectors.toList());
    }

    default OrdersResponse orderToOrdersResponse(Kakao kakao) {
        List<Order> orders = kakao.getOrders();

        OrdersResponse ordersResponse = new OrdersResponse(
                kakao.getKakaoId(),
                orderToOrderResponse(orders),
                kakao.getTotalOrder());

        return ordersResponse;
    }

    default List<OrderResponse> orderToOrderResponse(List<Order> orders) {

        return orders.stream()
                .map(order -> OrderResponse
                        .builder()
                        .orderId(order.getOrderId())
                        .totalCount(order.getTotalCount())
                        .totalPrice(order.getTotalPrice())
                        .createdAt(order.getCreatedAt())
                        .build()).collect(Collectors.toList());
    }
}