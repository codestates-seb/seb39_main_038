package com.main_39.Spring.order.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.menu.entity.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
public class OrderMenu extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderMenuId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    private int count;

    public void addOrder(Order order) {
        this.order = order;
        if(!this.order.getOrderMenus().contains(this)) {
            this.order.getOrderMenus().add(this);
        }
    }

    public void addMenu(Menu menu) {
        this.menu = menu;
        if(!this.menu.getOrderMenus().contains(this)) {
            this.menu.addOrderMenu(this);
        }
    }

    public void addCount(int count) {
        this.count = count;
    }
}
