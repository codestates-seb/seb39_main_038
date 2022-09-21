package com.main_39.Spring.order;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.repository.KakaoRepository;
import com.main_39.Spring.menu.Menu;
import com.main_39.Spring.menu.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final KakaoRepository kakaoRepository;

    /**
     * 주문 요청
     */
    public void createOrder(Order order) {
        /**
         * TODO : Order 유효성 검증 로직 필요
         */
        orderRepository.save(order);
    }
    /**
     * 단일 주문 불러오기
     */
    public Order getOrder(long orderId) {
        Order findOrder = orderRepository.findById(orderId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        // TODO : 예외 코드 변경
        return findOrder;
    }
    /**
     *  TODO : 회원별 주문 내역 불러오기
     */

    /**
     * 회원 찾기 로직 필요없을 시 삭제
     */
    public Kakao getKakaoById(long kakao_id) {
        Kakao getKakao = kakaoRepository.findById(kakao_id).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        // TODO : 예외 코드 변경
        return getKakao;
    }
}
