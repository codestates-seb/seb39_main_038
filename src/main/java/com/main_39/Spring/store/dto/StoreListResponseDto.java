package com.main_39.Spring.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StoreListResponseDto {
    private long storeId;
    private List<StoreResponseDto> storeDetail;
    private int totalReview;
    private int totalGrade;
    private int totalComment;
}
