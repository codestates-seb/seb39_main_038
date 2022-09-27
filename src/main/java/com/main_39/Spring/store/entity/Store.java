package com.main_39.Spring.store.entity;

import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.menu.entity.Menu;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

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

    // 외래키
    @OneToOne
    @JoinColumn(name = "local_id")
    private Local local;

    // 일대다 양방향 매핑
    @OneToMany(mappedBy = "store")
    private List<Menu> menus = new ArrayList<>();


    public enum StoreType{
        CHICKEN("치킨"),
        PIZZA("피자"),
        BUNSICK("분식"),
        KOREAN("한식"),
        WESTERN("양식"),
        COFFEE("커피"),
        NIGHT_FOOD("야식"),
        CHINESE("중국집"),
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
}
