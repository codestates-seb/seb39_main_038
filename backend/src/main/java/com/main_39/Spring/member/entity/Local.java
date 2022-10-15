package com.main_39.Spring.member.entity;

import com.main_39.Spring.order.entity.Order;
import com.main_39.Spring.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Local{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long localId;

    @Column(length = 255)
    private String avatar;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    //암호화로 인해 최소 60자
    @Column(length = 255, nullable = false)
    private String password;

    @Column(nullable = false, length = 20, unique = true)
    private String phone;

    @Setter
    @Column
    private String refreshToken;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.SELLER;

    //외래키 수정
    @OneToOne(mappedBy = "local")
    private Store store;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    public void addOrders(Order order) {
        this.orders.add(order);
        if(order.getLocal() == null)
            order.addLocal(this);
    }

    public int getTotalOrder() {
        return orders.size();
    }
    public enum Role{
        SELLER("ROLE_SELLER"),
        ADMIN("ROLE_ADMIN");

        @Getter
        private String status;

        Role(String status){
            this.status = status;
        }
    }

}