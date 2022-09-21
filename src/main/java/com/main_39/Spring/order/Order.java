package com.main_39.Spring.order;

import com.main_39.Spring.member.entity.Kakao;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    private Kakao kakao;

    @OneToMany(mappedBy = "order")
    private List<OrderMenu> orderMenus = new ArrayList<>();

    private int count;

    /**
     * TODO : Builder 패턴 적용해야 하는지 확인
     */
}
