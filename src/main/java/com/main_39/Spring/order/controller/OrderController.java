package com.main_39.Spring.order.controller;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.order.dto.OrderDetailResponse;
import com.main_39.Spring.order.dto.OrdersResponse;
import com.main_39.Spring.order.mapper.OrderMapper;
import com.main_39.Spring.order.dto.OrderRequest;
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

    private final MemberService memberService;

    private final OrderMapper mapper;

    @PostMapping("/{kakao-id}/orders")
    public ResponseEntity<Void> createOrder(@PathVariable("kakao-id") long kakaoId,
                                      @RequestBody OrderRequest orderRequest) {

        Kakao kakao = memberService.findVerifiedKakao(kakaoId);

        orderService.createOrder(mapper.orderPostDtoToOrder(orderRequest, kakao));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{order-id}")
    public ResponseEntity<OrderDetailResponse> findOrder(@PathVariable("order-id") long orderId) {

        Order findOrder = orderService.findOrder(orderId);

        return new ResponseEntity<>(mapper.orderToOrderDetailResponse(findOrder), HttpStatus.OK);
    }

    @GetMapping("/{kakao-id}/orders")
    public ResponseEntity<OrdersResponse> findOrderByUser(@PathVariable("kakao-id") long kakaoId) {

        Kakao kakao = memberService.findVerifiedKakao(kakaoId);

        return new ResponseEntity<>(mapper.orderToOrdersResponse(kakao), HttpStatus.OK);
    }
}

