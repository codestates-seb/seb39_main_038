package com.main_39.Spring.store.dto;

import com.main_39.Spring.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;


public class StoreDto {
    @Getter
    @AllArgsConstructor
    public static class response{
        private Long storeId;
        private String storePhone;
        private String storeNumber;
        private String storeName;
        private String storeContent;
        private String storeImage;
        private Store.StoreType storeType;
        private Store.StoreStatus storeStatus;
    }

}
