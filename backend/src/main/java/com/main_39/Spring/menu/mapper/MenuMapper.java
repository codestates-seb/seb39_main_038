package com.main_39.Spring.menu.mapper;

import com.main_39.Spring.menu.dto.MenuDetailResponse;
import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.dto.MenuResponse;
import com.main_39.Spring.menu.dto.MenusResponse;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.store.entity.Store;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MenuMapper {
    public Menu menuRequestToMenu(Store store, MenuRequest menuRequest) {

        return new Menu(
                store,
                menuRequest.getName(),
                menuRequest.getPrice(),
                menuRequest.getContent(),
                menuRequest.getImage());
    }

    public MenuDetailResponse menuToMenuDetailResponse(Menu menu) {

        return new MenuDetailResponse(
                menu.getStore().getStoreId(),
                menu.getMenuId(),
                menu.getName(),
                menu.getPrice(),
                menu.getContent(),
                menu.getImage());
    }

    public MenusResponse menusToMenusResponse(Store store) {

        return new MenusResponse(
                store.getStoreId(),
                menuToMenuResponse(store.getMenus()),
                store.getTotalMenu());
    }

    public List<MenuResponse> menuToMenuResponse(List<Menu> menus) {

        return menus.stream()
                .map(menu -> new MenuResponse(
                        menu.getMenuId(),
                        menu.getName(),
                        menu.getPrice(),
                        menu.getContent(),
                        menu.getImage())).collect(Collectors.toList());
    }
}
