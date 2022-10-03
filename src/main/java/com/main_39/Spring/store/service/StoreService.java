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
        Optional.ofNullable(store.getStoreTime())
                .ifPresent(time -> findStore.setStoreTime(time));
        Optional.ofNullable(store.getStoreWaitTime())
                .ifPresent(waitTime -> findStore.setStoreWaitTime(waitTime));
        Optional.ofNullable(store.getStoreAddress())
                .ifPresent(address -> findStore.setStoreAddress(address));
        Optional.ofNullable(store.getStorePayment())
                .ifPresent(payment -> findStore.setStorePayment(payment));
        Optional.ofNullable(store.getStoreTag())
                .ifPresent(tag -> findStore.setStoreTag(tag));

        return storeRepository.save(findStore);

    }

    public Store findStore(long storeId) {
        return findVerifiedStore(storeId);
    }

//    public Page<Store> findStores(int page, int size) {
//        return storeRepository.findAll(PageRequest.of(page, size,
//                Sort.by("storeId").descending()));
//    }

    public Page<Store> findStores(int page, int size) {
        return storeRepository.findAll(PageRequest.of(page, size,
                Sort.by("storeId").descending()));
    }


//    public void findByStoreType() {
//        Pageable pageable = PageRequest.of(0, 15);
//        StoreRepository.findByStoreType(pageable)
//                .forEach(
//                store -> System.out.println(store));
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


//    public Store findVerifiedStoreType(Store.StoreType storeType) {
//        List<Store> ListStore =
//                storeRepository.findByStoreType(storeType);
//        Store findByStoreType =
//                ListStore.forEach(() ->
//                        store -> System.out.println(ListStore));
//        return findByStoreType;
//    }


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