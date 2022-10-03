package com.main_39.Spring.menu.service;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.menu.repository.MenuRepository;
import com.main_39.Spring.store.entity.Store;
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
    public void createMenu(Store store, Menu menu) {

        menu.addStore(store);

        menuRepository.save(menu);
    }

    /**
     * 메뉴 수정하기
     */
    public void updateMenu(long menuId, MenuRequest requestDto) {
        Menu updateMenu = findVerifiedMenu(menuId);

        Optional.ofNullable(requestDto.getName())
                .ifPresent(updateMenu::addName);
        Optional.of(requestDto.getPrice())
                .ifPresent(updateMenu::addPrice);
        Optional.ofNullable(requestDto.getImage())
                .ifPresent(updateMenu::addImage);
        Optional.ofNullable(requestDto.getContent())
                .ifPresent(updateMenu::addContent);

        menuRepository.save(updateMenu);
    }

    /**
     * 메뉴 삭제하기
     */
    public void deleteMenu(long menuId) {

        Menu deleteMenu = findVerifiedMenu(menuId);

        menuRepository.delete(deleteMenu);

    }

    /**
     * 단일 메뉴 찾기
     */
    public Menu findVerifiedMenu(long menuId) {

        Menu verifiedMenu = menuRepository.findById(menuId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENU_NOT_EXISTS));

        return verifiedMenu;
    }
}
