package com.main_39.Spring.store.dto;

import com.main_39.Spring.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoreResponseDto<T> {
        private long storeId;
        private String storePhone;
        private String storeNumber;
        private String storeStatus;
        private String storeName;
        private String storeContent;
        private String storeImage;
//        private String storeType;
        private String storeTime;
        private String storeWaitTime;
        private String storeAddress;
        private String storePayment;
        private String storeTag;

        private int totalReview;
        private int totalGrade;
        private int totalComment;

        /**
         * 타입별 필터
         */
        private Store.StoreType storeType;
        public String getStoreType() {
                return storeType.getType();
        }



}
