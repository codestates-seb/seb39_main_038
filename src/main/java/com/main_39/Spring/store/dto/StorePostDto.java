package com.main_39.Spring.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StorePostDto {
        private long storeId;
        private long memberId;
        private String storePhone;
        private String storeNumber;
        private String storeStatus;
        private String storeName;
        private String storeContent;
        private String storeImage;
        private String storeType;
}
