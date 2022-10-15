package com.main_39.Spring.member.entity;

import com.main_39.Spring.order.entity.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
public class Kakao{
    @Id
    @Column(nullable = false, updatable = false, unique = true)
    private Long kakaoId;
    @Column
    private String connectedAt;
    @Column(nullable = false,length = 50)
    private String nickname;
    @Column(length = 255)
    private String profileImage;
    @Column(length = 255)
    private String thumbnailImage;
    @Column(unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private long mileage = 0;

    public void setMileage(long mileage){
        this.mileage = mileage;
    }

    @Column(nullable = false, updatable = true, unique = true)
    private String refreshToken;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Role role = Role.CUSTOMER;

    @OneToMany(mappedBy = "kakao", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Order> orders = new ArrayList<>();

    public void addOrders(Order order){
        this.orders.add(order);
        if(order.getKakao() == null)
            order.addKakao(this);
    }

    public int getTotalOrder() {
        return orders.size();
    }

    @Builder
    Kakao(Long kakaoId, String nickname, String connectedAt, String profileImage, String thumbnailImage, String email, String refreshToken){
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.connectedAt = connectedAt;
        this.profileImage = profileImage;
        this.thumbnailImage = thumbnailImage;
        this.email = email;
        this.refreshToken = refreshToken;
    }

    public enum Role {
        ROLE_USER("ROLE_USER"),
        CUSTOMER("ROLE_CUSTOMER"),
        SELLER("ROLE_SELLER");

        @Getter
        private String status;

        Role(String status){
            this.status = status;
        }
    }
}
