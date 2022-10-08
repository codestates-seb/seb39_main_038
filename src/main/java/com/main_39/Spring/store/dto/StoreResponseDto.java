package com.main_39.Spring.store.dto;

import com.main_39.Spring.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoreResponseDto {
        private long storeId;
        private String storePhone;
        private String storeNumber;

        /**
         * 가게 상태
         */
        private Store.StoreStatus storeStatus;

        public String getStoreStatus() {
                return storeStatus.getStatus();
        }

        private String storeName;
        private String storeContent;
        private String storeImage;

        /**
         * 타입별 필터
         */
        private Store.StoreType storeType;

        public String getStoreType() {
                return storeType.getType();

        }

        private String storeTime;
        private String storeWaitTime;
        private String storeAddress;
        private String storePayment;
        private String storeTag;
        private int totalReview;
        private double totalGrade;
        private int totalComment;
        private int totalMenu;
}