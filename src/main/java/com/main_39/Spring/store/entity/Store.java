package com.main_39.Spring.store.entity;

import com.main_39.Spring.comment.dto.CommentResponseDto;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    @Column(nullable = false)
    private String storePhone;

    @Column(nullable = false)
    private String storeNumber;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StoreStatus storeStatus = StoreStatus.OPEN;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String storeContent;

    private String storeImage;

    /**
     * 타입별 필터
     */
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StoreType storeType = StoreType.all;

    private String storeTime;

    private String storeWaitTime;

    private String storeAddress;

    private String storePayment;

    private String storeTag;

    /**
     * 타입별 필터
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
     * 가게 상태
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
     * store : menu = 1 : N
     */
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
     * total review
     * store : review = 1: N
     */
    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Review> reviews = new ArrayList<>();

    public int getTotalReview() {
        return reviews.size();
    }

    public double getTotalGrade() {
        long total = reviews.stream().mapToInt(review -> review.getReviewGrade()).sum();
        double avg = (double)total / (double)reviews.size();
        avg = Math.round(avg * 10) / 10.0;
        return avg;
    }

    public int getTotalComment() {
        return comments.size();
    }

    /**
     * store : comment = 1 : N
     */
    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
}
