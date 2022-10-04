package com.main_39.Spring.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoreResponseDto {
        private long storeId;
//        private long localId;
        private String storePhone;
        private String storeNumber;
        private String storeStatus;
        private String storeName;
        private String storeContent;
        private String storeImage;
        private String storeType;
        private String storeTime;
        private String storeWaitTime;
        private String storeAddress;
        private String storePayment;
        private String storeTag;

        private int totalReview;
        private double totalGrade;
        private int totalComment;

//        private List<ReviewResponseDto> reviews;
}
