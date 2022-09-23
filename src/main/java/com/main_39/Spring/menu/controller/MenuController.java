package com.main_39.Spring.menu.controller;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.menu.dto.MenuPatchRequestDto;
import com.main_39.Spring.menu.dto.MenuPostRequestDto;
import com.main_39.Spring.menu.repository.MenuRepository;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    /**
     * 메뉴 등록
     */
    @PostMapping
    public ResponseEntity createMenu(@RequestBody MenuPostRequestDto requestDto) {

        menuService.createMenu(requestDto);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /**
     * 단일 메뉴 불러오기
     */
    @GetMapping("/{menu-id}")
    public ResponseEntity<Menu> getMenu(@PathVariable("menu-id") long menuId) {

        Menu findMenu = menuService.findMenu(menuId);

        return new ResponseEntity<>(findMenu, HttpStatus.OK);
    }

    /**
     * 메뉴 수정
     */
    @PatchMapping("/{menu-id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable("menu-id") long menuId,
                                           @RequestBody MenuPatchRequestDto patchRequestDto) {

        Menu updateMenu = menuService.updateMenu(menuId, patchRequestDto);

        return new ResponseEntity<>(updateMenu, HttpStatus.OK);
    }

    /**
     * 메뉴 삭제
     */
    @DeleteMapping("/{menu-id}")
    public ResponseEntity deleteMenu(@PathVariable("menu-id") long menuId) {

        menuService.deleteMenu(menuId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
