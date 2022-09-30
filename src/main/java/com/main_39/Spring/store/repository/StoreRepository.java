package com.main_39.Spring.store.repository;

import com.main_39.Spring.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Optional;



public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query(value = "SELECT * FROM store WHERE store_name = :storeName", nativeQuery = true)
    Optional<Store> findByName(String storeName);

//    @Query(value = "SELECT * FROM Store WHERE store_id = :storeId", nativeQuery = true)
//    Optional<Store> findByStore(long storeId);
//    public Page<Store>  findByStoreMenu(long menuId, Pageable pageable);

}
