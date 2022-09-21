package com.main_39.Spring.menu;

import com.main_39.Spring.order.entity.OrderMenu;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    /**
     * 주문에서 불러올 메뉴
     * TODO : 필요없으면 삭제
     */
    @Builder
    public Menu(String name, int price) {
        this.name = name;
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
