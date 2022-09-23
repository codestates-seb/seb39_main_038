package com.main_39.Spring.menu.service;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.menu.dto.MenuPatchRequestDto;
import com.main_39.Spring.menu.dto.MenuPostRequestDto;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    /**
     * 메뉴 등록하기
     */
    public void createMenu(MenuPostRequestDto requestDto) {

        Menu menu = Menu.builder()
                .name(requestDto.getName())
                .price(requestDto.getPrice())
                .build();

        menuRepository.save(menu);
    }

    /**
     * 메뉴 수정하기
     */
    public Menu updateMenu(long menuId, MenuPatchRequestDto requestDto) {
        Menu menu = findMenu(menuId);

        Optional.ofNullable(requestDto.getName())
                .ifPresent(name -> menu.addName(name));
        Optional.ofNullable(menu.getPrice())
                .ifPresent(price -> menu.addPrice(price));

        return menuRepository.save(menu);
    }

    /**
     * 단일 메뉴 찾기
     */
    public Menu findMenu(long menuId) {

        Menu menu = menuRepository.findById(menuId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENU_NOT_FOUND));

        return menu;
    }

    /**
     * 메뉴 삭제하기
     */
    public void deleteMenu(long menuId) {

        Menu menu = findMenu(menuId);

        menuRepository.delete(menu);

    }

    public Menu findVerifiedMenu(long menuId) {
        Menu verifiedMenu = menuRepository.findById(menuId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENU_NOT_FOUND));

        return verifiedMenu;
    }
}
