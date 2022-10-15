package com.main_39.Spring.menu.controller;

import com.main_39.Spring.menu.mapper.MenuMapper;
import com.main_39.Spring.menu.dto.MenuDetailResponse;
import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.dto.MenusResponse;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.menu.service.MenuService;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    private final StoreService storeService;

    private final MenuMapper mapper;

    /**
     * 메뉴 등록
     */
    @PostMapping("/store/{store-id}/menus")
    public ResponseEntity<Void> createMenu(@PathVariable("store-id") long storeId,
                                           @RequestBody MenuRequest menuRequest) {

        // storeService 수정으로 인한 수정
        Store store = storeService.verifyExistsStore(storeId);

        menuService.createMenu(mapper.menuRequestToMenu(store, menuRequest));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 단일 메뉴 불러오기
     */
    @GetMapping("/store/{store-id}/menus/{menu-id}")
    public ResponseEntity<MenuDetailResponse> getMenu(@PathVariable("menu-id") long menuId) {

        Menu findMenu = menuService.findVerifiedMenu(menuId);

        return new ResponseEntity<>(mapper.menuToMenuDetailResponse(findMenu), HttpStatus.OK);
    }
    /**
     * 상점별 메뉴 불러오기
     */
    @GetMapping("/store/{store-id}/menus")
    public ResponseEntity<MenusResponse> getMenuByStore(@PathVariable("store-id") long storeId) {

        Store store = storeService.findStore(storeId);

        return new ResponseEntity<>(mapper.menusToMenusResponse(store), HttpStatus.OK);
    }

    /**
     * 메뉴 수정
     */
    @PatchMapping("/store/{store-id}/menus/{menu-id}")
    public ResponseEntity<Void> updateMenu(@PathVariable("menu-id") long menuId,
                                           @RequestBody MenuRequest menuRequest) {

        menuService.updateMenu(menuId, menuRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 메뉴 삭제
     */
    @DeleteMapping("/store/{store-id}/menus/{menu-id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable("store-id") long storeId,
                                             @PathVariable("menu-id") long menuId) {
        Store store = storeService.findStore(storeId);
        menuService.deleteMenu(store, menuId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
