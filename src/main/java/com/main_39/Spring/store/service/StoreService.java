package com.main_39.Spring.store.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public StoreService(StoreRepository storeRepository,
                        AmazonS3 amazonS3) {
        this.storeRepository = storeRepository;
        this.amazonS3 = amazonS3;
    }

    public Store createdStore(Store store) {
        verifyExistsName(store.getStoreName());
        if(store.getStoreImage() != null) saveImageToS3(store);
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
                .ifPresent(image -> {findStore.setStoreImage(image);
                                    saveImageToS3(findStore);});
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

    private void saveImageToS3(Store store){
        String data = store.getStoreImage().split(",")[1];
        String s3FileName = "stores/" + store.getStoreId();

        byte[] decodeByte = Base64.getDecoder().decode(data);
        InputStream inputStream = new ByteArrayInputStream(decodeByte);
        ObjectMetadata objectMetadata = new ObjectMetadata();

        try {
            objectMetadata.setContentLength(inputStream.available());
        } catch (IOException e) {
            System.out.println("가게 이미지 변경 실패");
            throw new BusinessLogicException(ExceptionCode.STORE_PATCH_WRONG_ACCESS);
        }

        amazonS3.putObject(bucket,s3FileName,inputStream,objectMetadata);
        store.setStoreImage(amazonS3.getUrl(bucket,s3FileName).toString());
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
        if(findStore.getStoreImage() != null){
            int index = findStore.getStoreImage().indexOf("/",8);
            String key = findStore.getStoreImage().substring(index+1);
            amazonS3.deleteObject(bucket,key);
        }
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