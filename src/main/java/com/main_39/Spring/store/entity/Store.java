package com.main_39.Spring.store.entity;

import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.CascadeType;
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


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @Column(length=20, nullable = false)
    private String storePhone;

    @Column(length=20, nullable = false)
    private String storeNumber;

    /**
     * 스토어 상태별 필터
     */
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StoreStatus storeStatus = StoreStatus.OPEN;

    @Column(length= 50, nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String storeContent;

    @Column(length = 255)
    private String storeImage;

    /**
     * 스토어 타입별 필터
     */
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StoreType storeType = StoreType.all;

    @Column(length = 100, nullable = false)
    private String storeTime;

    @Column(length = 50, nullable = false)
    private String storeWaitTime;

    @Column(length = 255, nullable = false)
    private String storeAddress;

    @Column(length = 100, nullable = false)
    private String storePayment;

    @Column(length = 50, nullable = false)
    private String storeTag;

    /**
     * 스토어 타입
     */
    public enum StoreType {
        all("전체 보기"),
        western("양식"),
        korean("한식"),
        chinese("중식"),
        japanese("일식"),
        snackbar("분식"),
        nightsnack("야식"),
        cafe("카페/디저트");

        @Getter
        private String type;

        StoreType(String type){
            this.type = type;
        }
    }

    /**
     * 스토어 상태
     */
    public enum StoreStatus {
        OPEN("주문 가능"),
        BRAKE("재료 준비중"),
        CLOSE("주문 마감");

        @Getter
        private String status;

        StoreStatus(String status) {
            this.status = status;
        }

    }

    /**
     * store : menu = 1 : N 양방향
     */
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Menu> menus = new ArrayList<>();

    public int getTotalMenu() {
        return menus.size();
    }

    /**
     * local : store = 1 : 1 양방향
     */
    @OneToOne
    @JoinColumn(name = "local_id")
    private Local local;

    public void setLocal(Local local) {
        this.local = local;
        if(local.getStore() !=this) {
            local.setStore(this);
        }
    }

    /**
     * store : review = 1: N 양방향
     */
    // 1007 수정
//    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "store")
    private List<Review> reviews = new ArrayList<>();

    public int getTotalReview() {
        return reviews.size();
    }

    public boolean hasMenu() {
        return menus.size() > 0;
    }

    // 추가
    public boolean hasReview() {
        return reviews.size() > 0;
    }

    public double getTotalGrade() {
        long total = 0;
        total = reviews.stream().mapToInt(review -> review.getReviewGrade()).sum();
        double avg = (double)total / (double)reviews.size();
        avg = Math.round(avg * 10) / 10.0;
        return avg;
    }

    public int getTotalComment() {
        return comments.size();
    }

    /**
     * store : comment = 1 : N 양방향
     */
    // 1007 수정
//    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "store")
    private List<Comment> comments = new ArrayList<>();
}