package com.main_39.Spring.store.repository;

import com.main_39.Spring.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query(value = "SELECT * FROM store WHERE store_name = :storeName", nativeQuery = true)
    Optional<Store> findByName(String storeName);

    @Query(value = "SELECT * FROM store WHERE store_number = :storeNumber", nativeQuery = true)
    Optional<Store> findByNumber(String storeNumber);

    @Query(value = "SELECT * FROM store WHERE store_phone = :storePhone", nativeQuery = true)
    Optional<Store> findByPhone(String storePhone);

    public Page<Store> findByStoreType(Store.StoreType storeType, PageRequest pageable);

    Optional<Store> findByLocal_LocalId(long localId);
}