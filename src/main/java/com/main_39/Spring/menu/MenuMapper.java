package com.main_39.Spring.menu;

import com.main_39.Spring.menu.dto.MenuDetailResponse;
import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.dto.MenuResponse;
import com.main_39.Spring.menu.dto.MenusResponse;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MenuMapper {
    Menu menuRequestToMenu(MenuRequest menuRequest);

    default MenuDetailResponse menuToMenuDetailResponse(Menu menu) {

        MenuDetailResponse menuDetailResponse = new MenuDetailResponse(
                menu.getStore().getStoreId(),
                menu.getMenuId(),
                menu.getName(),
                menu.getPrice(),
                menu.getContent(),
                menu.getImage());

        return menuDetailResponse;
    }

    default MenusResponse menusToMenusResponse(Store store) {
        List<Menu> menus = store.getMenus();

        MenusResponse menusResponse = new MenusResponse(
                store.getStoreId(),
                menuToMenuResponse(menus),
                store.getTotalMenu());

        return menusResponse;
    }

    default List<MenuResponse> menuToMenuResponse(List<Menu> menus) {

        return menus.stream()
                .map(menu -> MenuResponse
                        .builder()
                        .menuId(menu.getMenuId())
                        .name(menu.getName())
                        .price(menu.getPrice())
                        .content(menu.getContent())
                        .image(menu.getImage())
                        .build()).collect(Collectors.toList());
    }
}
