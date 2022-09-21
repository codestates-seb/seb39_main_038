package com.main_39.Spring.order;

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

    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderPostRequestDto requestDto) {
        /**
         * TODO : OrderPostRequestDto -> Order 변환 필요
         */
        return new ResponseEntity ("", HttpStatus.CREATED);
    }

    /**
     * 단일 주문 가져오기
     */
    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@PathVariable("order-id") long orderId) {

        Order getOrder = orderService.getOrder(orderId);

        return new ResponseEntity(getOrder, HttpStatus.OK);
    }
}
