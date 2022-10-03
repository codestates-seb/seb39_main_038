package com.main_39.Spring.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StorePatchDto {
        private long storeId;
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

        public void setStoreId(long storeId) {
                this.storeId = storeId;
        }
}
