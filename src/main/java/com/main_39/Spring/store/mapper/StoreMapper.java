package com.main_39.Spring.store.mapper;

import com.main_39.Spring.store.dto.StorePatchDto;
import com.main_39.Spring.store.dto.StorePostDto;
import com.main_39.Spring.store.dto.StoreResponseDto;
import com.main_39.Spring.store.entity.Store;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    Store storePostDtoToStore(StorePostDto storePostDto);
    Store storePatchDtoToStore(StorePatchDto storePatchDto);
    StoreResponseDto storeToStoreResponseDto(Store store);
    List<StoreResponseDto> storesToStoreResponseDtos(List<Store> stores);
}
