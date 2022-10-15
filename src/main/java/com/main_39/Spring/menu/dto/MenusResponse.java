package com.main_39.Spring.menu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MenusResponse {
    private long storeId;
    private List<MenuResponse> menus;
    private int totalMenu;
}

