package com.main_39.Spring.store.entity;

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

    private String storeStatus;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String storeContent;

    private String storeImage;

    private String storeType;

    private String storeTime;

    private String storeWaitTime;

    private String storeAddress;

    private String storePayment;

    private String storeTag;


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

    public int getTotalGrade() {
        return reviews.size();
    }

    /**
     * total comment
     * store : comment = 1:N
     */

    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

    public int getTotalComment() {
        return comments.size();
    }


}
