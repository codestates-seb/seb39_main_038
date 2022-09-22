package com.main_39.Spring.order.controller;

import com.main_39.Spring.order.controller.dto.OrderResponseDto;
import com.main_39.Spring.order.mapper.OrderMapper;
import com.main_39.Spring.order.controller.dto.OrderPostRequestDto;
import com.main_39.Spring.order.service.OrderService;
import com.main_39.Spring.order.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    private final OrderMapper mapper;

    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderPostRequestDto requestDto) {

        orderService.createOrder(mapper.orderPostDtoToOrder(requestDto));

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /**
     * 단일 주문 가져오기
     */
    @GetMapping("/{order-id}")
    public ResponseEntity<OrderResponseDto> findOrder(@PathVariable("order-id") long orderId) {

        Order findOrder = orderService.findOrder(orderId);

        return new ResponseEntity<>(mapper.orderToOrderResponseDto(findOrder), HttpStatus.OK);
    }
}

