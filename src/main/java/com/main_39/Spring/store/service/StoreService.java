package com.main_39.Spring.store.service;

import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.repository.StoreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public Store createdStore(Store store) {
        verifyExistsName(store.getStoreName());
        return storeRepository.save(store);
    }

    public Store updateStore(Store store) {
        Store findStore = findVerifiedStore(store.getStoreId());


        Optional.ofNullable(store.getStorePhone())
                .ifPresent(phone -> findStore.setStorePhone(phone));
        Optional.ofNullable(store.getStoreNumber())
                .ifPresent(number -> findStore.setStoreNumber(number));
        Optional.ofNullable(store.getStoreStatus())
                .ifPresent(status -> findStore.setStoreStatus(status));
        Optional.ofNullable(store.getStoreName())
                .ifPresent(name -> findStore.setStoreName(name));
        Optional.ofNullable(store.getStoreContent())
                .ifPresent(content -> findStore.setStoreContent(content));
        Optional.ofNullable(store.getStoreImage())
                .ifPresent(image -> findStore.setStoreImage(image));
        Optional.ofNullable(store.getStoreType())
                .ifPresent(type -> findStore.setStoreType(type));



        return storeRepository.save(findStore);

    }

    public Store findStore(long storeId) {
        return findVerifiedStore(storeId);
    }

    public Page<Store> findStores(int page, int size) {
        return storeRepository.findAll(PageRequest.of(page, size,
                Sort.by("storeId").descending()));
    }

//    public Page<Store> findStoreMenu(long menuId, int page, int size) {
//        return storeRepository.findByStoreMenu(menuId, PageRequest.of(page, size,
//                Sort.by("storeId").descending()));
//    }


    public void deleteStore(long storeId){
        Store findStore = findVerifiedStore(storeId);

        storeRepository.delete(findStore);

    }

    public Store findVerifiedStore(long storeId) {
        Optional<Store> optionalStore =
                storeRepository.findById(storeId);
        Store findStore =
                optionalStore.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.STORE_NOT_EXISTS));
        return findStore;
    }


    private void verifyExistsName(String storeName) {
        Optional<Store> store = storeRepository.findByName(storeName);
        if(store.isPresent())
            throw new BusinessLogicException(ExceptionCode.STORE_NAME_DUPLICATE);
    }

//    private Store findVerifiedStoreByQuery(long storeId) {
//        Optional<Store> optionalStore = storeRepository.findByStore(storeId);
//        Store findStore =
//                optionalStore.orElseThrow(()    ->
//                        new BusinessLogicException(ExceptionCode.STORE_NOT_EXISTS));
//        return findStore;
//    }
}