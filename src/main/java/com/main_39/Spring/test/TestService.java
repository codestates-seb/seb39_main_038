package com.main_39.Spring.test;

import com.main_39.Spring.test.domain.Test;
import com.main_39.Spring.test.domain.TestRepository;
import com.main_39.Spring.test.dto.PatchRequestDto;
import com.main_39.Spring.test.dto.PostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository repository;

    public void save(PostRequestDto requestDto) {

        Test test = Test.builder()
                .name(requestDto.getName())
                .phone(requestDto.getPhone())
                .build();

        repository.save(test);
    }

    public void update(Long id, PatchRequestDto requestDto) {

        Test test = findOne(id);
        test.ChangePhone(requestDto.getPhone());

        repository.save(test);
    }

    public void delete(Long id) {

        Test test = findOne(id);

        repository.delete(test);
    }

    public Test findOne(Long id) {

        Test test = repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("식별자 오류"));

        return test;
    }
}
