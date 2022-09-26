package com.main_39.Spring.store.entity;

import com.main_39.Spring.member.entity.Local;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @Column(nullable = false, length = 20)
    private String storePhone;

    @Column(nullable = false, length = 20)
    private String storeNumber;

    @Column(nullable = false, length = 20)
    private String storeName;

    @Column
    private String storeContent;

    @Column
    private String storeImage;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private StoreType storeType;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private StoreStatus storeStatus = StoreStatus.CLOSE;

    public enum StoreType{
        FAST_FOOD("패스트푸드"),
        CHICKEN("치킨"),
        WESTERN("양식"),
        COFFEE("커피"),
        NIGHT_FOOD("야식"),
        CHINESE("중식"),
        JAPANESE("일식");

        @Getter
        private String type;

        StoreType(String type){
            this.type = type;
        }
    }

    public enum StoreStatus{
        OPEN("영업 중"),
        CLOSE("마감");

        @Getter
        private String status;

        StoreStatus(String status){
            this.status = status;
        }
    }

    // 매핑
    @OneToOne
    @JoinColumn(name = "local_id")
    private Local local;
}
