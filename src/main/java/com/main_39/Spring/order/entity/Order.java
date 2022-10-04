package com.main_39.Spring.order.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.member.entity.Kakao;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    private Kakao kakao;

    @OneToMany(mappedBy = "order", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<OrderMenu> orderMenus = new ArrayList<>();

    private int count;

    public void addKakao(Kakao kakao) {
        this.kakao = kakao;
        if(!kakao.getOrders().contains(this))
            kakao.addOrders(this);
    }

    public void addOrderMenus(List<OrderMenu> orderMenus) {
        this.orderMenus = orderMenus;
    }

    public int getTotalCount() {
        return orderMenus.stream()
                .mapToInt(OrderMenu::getCount)
                .sum();
    }

    public int getTotalPrice() {
        return orderMenus.stream()
                .mapToInt(OrderMenu::getPrice)
                .sum();
    }
}
