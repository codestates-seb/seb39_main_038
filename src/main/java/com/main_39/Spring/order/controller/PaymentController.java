package com.main_39.Spring.order.controller;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final IamportClient iamportClient;

    public PaymentController() {
        this.iamportClient = new IamportClient("0343522678708067", "9hXbGDIQfIn1zE2x2kZTA8ll0cyl1HVI6ZqFDtA4VzSV9beumhWRsXdYyjXark6D52P8uwxOMnbwg0LS");
    }

    @PostMapping("/verify/{imp_uid}")
    public IamportResponse<Payment> verifyPaymentByImpUid(@PathVariable String imp_uid)
            throws IamportResponseException, IOException {

        log.info("결제 검증단계 진입");

        return iamportClient.paymentByImpUid(imp_uid);
    }
}
