package com.main_39.Spring.order.service;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.menu.service.MenuService;
import com.main_39.Spring.order.entity.Order;
import com.main_39.Spring.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuService menuService;

    /**
     * 주문 요청
     */
    public void createOrder(Order order) {
        orderRepository.save(order);
    }
    /**
     * 단일 주문 불러오기
     */
    public Order findOrder(long orderId) {
        Order findOrder = orderRepository.findById(orderId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrder;
    }
    /**
     * 주문 검증 로직
     */
    private void verifyOrder(Order order) {
        order.getOrderMenus().stream()
                .forEach(orderMenu -> menuService.findVerifiedMenu(
                        orderMenu.getMenu().getMenuId()));
    }
}
