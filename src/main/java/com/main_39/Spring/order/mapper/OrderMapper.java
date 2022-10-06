package com.main_39.Spring.order.mapper;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
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

    default Order orderRequestToOrderByKakao(OrderRequest orderRequest, Kakao kakao) {

        Order order = new Order();

        List<OrderMenu> orderMenus = orderRequest.getOrderMenus()
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
        order.addPaymentType(orderRequest.getPaymentType());
        order.addOrderRequest(orderRequest.getOrderRequest());
        order.addKakao(kakao);
        order.addOrderMenus(orderMenus);

        return order;
    }

    default Order orderRequestToOrderByLocal(OrderRequest orderRequest, Local local) {

        Order order = new Order();

        List<OrderMenu> orderMenus = orderRequest.getOrderMenus()
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
        order.addPaymentType(orderRequest.getPaymentType());
        order.addOrderRequest(orderRequest.getOrderRequest());
        order.addLocal(local);
        order.addOrderMenus(orderMenus);

        return order;
    }

    default OrderDetailResponse orderToOrderDetailResponse(Order order) {
        List<OrderMenu> orderMenus = order.getOrderMenus();

        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setOrderId(order.getOrderId());
        orderDetailResponse.setTotalCount(order.getTotalCount());
        orderDetailResponse.setTotalPrice(order.getTotalPrice());
        orderDetailResponse.setOrderRequest(order.getOrderRequest());
        orderDetailResponse.setPaymentType(order.getPaymentType());
        orderDetailResponse.setCreatedAt(order.getCreatedAt());
        orderDetailResponse.setOrderMenus(orderMenusToOrderMenuResponses(orderMenus));
        return orderDetailResponse;
    }

    default List<OrderMenuResponse> orderMenusToOrderMenuResponses(
            List<OrderMenu> orderMenus) {
        return orderMenus.stream()
                .map(orderMenu -> OrderMenuResponse
                        .builder()
                        .menuId(orderMenu.getMenu().getMenuId())
                        .storeId(orderMenu.getMenu().getStore().getStoreId())
                        .storeName(orderMenu.getMenu().getStore().getStoreName())
                        .name(orderMenu.getMenu().getName())
                        .price(orderMenu.getMenu().getPrice())
                        .count(orderMenu.getCount())
                        .build()).collect(Collectors.toList());
    }

    default OrdersResponse orderToOrdersResponseByKakao(Kakao kakao) {
        List<Order> orders = kakao.getOrders();

        OrdersResponse ordersResponse = new OrdersResponse(
                orderToOrderResponse(orders),
                kakao.getTotalOrder());

        return ordersResponse;
    }

    default OrdersResponse orderToOrdersResponseByLocal(Local local) {
        List<Order> orders = local.getOrders();

        OrdersResponse ordersResponse = new OrdersResponse(
                orderToOrderResponse(orders),
                local.getTotalOrder());

        return ordersResponse;
    }

    default List<OrderResponse> orderToOrderResponse(List<Order> orders) {

        return orders.stream()
                .map(order -> OrderResponse
                        .builder()
                        .orderId(order.getOrderId())
                        .orderMenu(orderMenusToOrderMenuResponses(order.getOrderMenus()))
                        .totalCount(order.getTotalCount())
                        .totalPrice(order.getTotalPrice())
                        .orderRequest(order.getOrderRequest())
                        .paymentType(order.getPaymentType())
                        .createdAt(order.getCreatedAt())
                        .build()).collect(Collectors.toList());
    }
}