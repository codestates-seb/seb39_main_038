package com.main_39.Spring.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
@Validated
@RequestMapping("/cookie")
public class CookieTest {

    @GetMapping("/get")
    public ResponseEntity getTest(HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("cookieG","getTest")
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60)
                .build();

        response.addHeader("Set-Cookie",cookie.toString());

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity postTest(HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("cookieP","postTest")
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60)
                .build();

        response.addHeader("Set-Cookie",cookie.toString());
        return new ResponseEntity(HttpStatus.OK);
    }
}
