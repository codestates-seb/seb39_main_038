package com.main_39.Spring.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Validated
public class MemberController {

    @PostMapping("/signup")
    public ResponseEntity postMember(){

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
