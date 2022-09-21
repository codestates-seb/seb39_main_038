package com.main_39.Spring.order;

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
public class OrderController {

    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderPostRequestDto requestDto) {
        /**
         * TODO : 내부 로직 필요
         */
        return new ResponseEntity ("", HttpStatus.CREATED);
    }

    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@PathVariable("order-id") long orderId) {
        /**
         * TODO : 내부 로직 필요
         */
        return new ResponseEntity("", HttpStatus.OK);
    }
}
