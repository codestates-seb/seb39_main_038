package com.main_39.Spring.order.controller;

import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.order.dto.OrderDetailResponse;
import com.main_39.Spring.order.dto.OrdersResponse;
import com.main_39.Spring.order.mapper.OrderMapper;
import com.main_39.Spring.order.dto.OrderRequest;
import com.main_39.Spring.order.service.OrderService;
import com.main_39.Spring.order.entity.Order;
import com.siot.IamportRestClient.IamportClient;
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


    @PostMapping("/orders/{kakao-id}")
    public ResponseEntity<Void> createOrder(//Authentication authentication, //인증된 유저정보를 가진 Authentication객체
                                            @PathVariable("kakao-id") long kakaoId,
                                            @RequestBody OrderRequest orderRequest) {
        //Authentication -> KakaoDetails -> Kakao 가져옴 (인가할때 역순)
//        KakaoDetails kakaoDetails = (KakaoDetails)authentication.getPrincipal();
//        Kakao kakao = kakaoDetails.getKakao();
        // 인증 객체가 없다면 로그인 안내
//        if(kakao == null) throw new BusinessLogicException(ExceptionCode.AUTH_REQUIRED_LOGIN);
//        orderService.createOrder(mapper.orderRequestToOrder(orderRequest, kakao));

        Kakao kakao = memberService.findVerifiedKakao(kakaoId);

        orderService.createOrder(mapper.orderRequestToOrder(orderRequest, kakao));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/detail/{order-id}")
    public ResponseEntity<OrderDetailResponse> findOrder(@PathVariable("order-id") long orderId) {

        Order findOrder = orderService.findOrder(orderId);

        return new ResponseEntity<>(mapper.orderToOrderDetailResponse(findOrder), HttpStatus.OK);
    }

    @GetMapping("/orders/{kakao-id}")
    public ResponseEntity<OrdersResponse> findOrderByUser(//Authentication authentication
                                                          @PathVariable("kakao-id") long kakaoId ) {
        //Authentication -> KakaoDetails -> Kakao 가져옴 (인가할때 역순)
//        KakaoDetails kakaoDetails = (KakaoDetails)authentication.getPrincipal();
//        Kakao kakao = kakaoDetails.getKakao();
        // 인증 객체가 없다면 로그인 안내
//        if(kakao == null) throw new BusinessLogicException(ExceptionCode.AUTH_REQUIRED_LOGIN);

        Kakao kakao = memberService.findVerifiedKakao(kakaoId);

        return new ResponseEntity<>(mapper.orderToOrdersResponse(kakao), HttpStatus.OK);
    }
}

