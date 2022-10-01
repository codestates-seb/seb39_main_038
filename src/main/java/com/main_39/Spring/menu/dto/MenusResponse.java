package com.main_39.Spring.menu.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenusResponse {
    private long storeId;
    private List<MenuResponse> menus;
    private int totalMenu;

    public MenusResponse(long storeId, List<MenuResponse> menus, int totalMenu) {
        this.storeId = storeId;
        this.menus = menus;
        this.totalMenu = totalMenu;
    }
}

