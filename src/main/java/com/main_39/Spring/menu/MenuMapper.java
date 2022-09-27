package com.main_39.Spring.menu;

import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.dto.MenuResponse;
import com.main_39.Spring.menu.entity.Menu;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MenuMapper {
    Menu menuRequestToMenu(MenuRequest menuRequest);
    MenuResponse menuToMenuResponse(Menu menu);
}
