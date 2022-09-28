package com.main_39.Spring.store.dto;

import com.main_39.Spring.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoreMenuResponseDto {
    private long menuId;
    private String name;
    private int price;
    private int count;
    private String image;
    private String content;

    private Menu menu;

//    public int getTotalMenu() {
//        return getMenu() * getCount();
//    }



}
