package com.main_39.Spring.store.entity;

import com.main_39.Spring.member.entity.Local;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;



@Getter
@Setter
@NoArgsConstructor
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @OneToOne
    @JoinColumn(name="local_id")
    private Local local;

    @Column(nullable = false)
    private String storePhone;

    @Column(nullable = false)
    private String storeNumber;

    private String storeStatus;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String storeContent;

    private String storeImage;

    private String storeType;



//    public Store(String storeName) {
//        this.storeName = storeName;
//    }
//
//
//    public Store(String storePhone, String storeNumber, String storeName, String storeContent) {
//        this.storePhone = storePhone;
//        this.storeNumber = storeNumber;
//        this.storeName = storeName;
//        this.storeContent = storeContent;
//    }

}
