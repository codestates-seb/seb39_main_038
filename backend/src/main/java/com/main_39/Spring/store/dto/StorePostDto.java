package com.main_39.Spring.store.dto;

import com.main_39.Spring.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StorePostDto {
        private long storeId;
        private long localId;
        private String storePhone;
        private String storeNumber;
        private String storeStatus;
        private String storeName;
        private String storeContent;
        private String storeImage;
        private Store.StoreType storeType;
        private String storeTime;
        private String storeWaitTime;
        private String storeAddress;
        private String storePayment;
        private String storeTag;
}
