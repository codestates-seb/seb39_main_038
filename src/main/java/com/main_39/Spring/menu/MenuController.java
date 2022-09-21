package com.main_39.Spring.menu;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuRepository menuRepository;

    @PostMapping
    public ResponseEntity createMenu(@RequestBody MenuPostRequestDto requestDto) {

        Menu menu = Menu.builder()
                .name(requestDto.getName())
                .price(requestDto.getPrice())
                .build();

        menuRepository.save(menu);

        return new ResponseEntity("", HttpStatus.CREATED);
    }

    @GetMapping("/{menu-id}")
    public ResponseEntity getMenu(@PathVariable("menu-id") long menuId) {

        Menu findMenu = menuRepository.findById(menuId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENU_NOT_FOUND));

        return new ResponseEntity(findMenu, HttpStatus.OK);
    }
}
