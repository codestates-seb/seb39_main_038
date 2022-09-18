package com.main_39.Spring.test;

import com.main_39.Spring.test.domain.Test;
import com.main_39.Spring.test.dto.PatchRequestDto;
import com.main_39.Spring.test.dto.PostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping
    public ResponseEntity save(@RequestBody PostRequestDto requestDto) {

        testService.save(requestDto);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Long id,
                                 @RequestBody PatchRequestDto requestDto) {

        testService.update(id, requestDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity find(@PathVariable("id") Long id) {

        Test test = testService.findOne(id);

        return new ResponseEntity(test, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {

        testService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
