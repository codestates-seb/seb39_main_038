package com.main_39.Spring.menu.entity;

import com.main_39.Spring.order.entity.OrderMenu;
import com.main_39.Spring.store.entity.Store;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    private String name;

    private int price;

    private String content;

    private String image;

    @OneToMany(mappedBy = "menu")
    private List<OrderMenu> orderMenus = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Builder
    public Menu(Store store, String name, int price, String content, String image) {
        this.store = store;
        this.name = name;
        this.price = price;
        this.content = content;
        this.image = image;
    }
    public void addName(String name) {
        this.name = name;
    }

    public void addStore(Store store) {
        this.store = store;
        if(!store.getMenus().contains(this))
            store.getMenus().add(this);
    }


    public void addPrice(int price) {
        this.price = price;
    }


    public void addMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public void addOrderMenu(OrderMenu orderMenu) {
        this.orderMenus.add(orderMenu);
        if(orderMenu.getMenu() != this) {
            orderMenu.addMenu(this);
        }
    }
}