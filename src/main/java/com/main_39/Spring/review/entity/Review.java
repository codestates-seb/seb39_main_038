package com.main_39.Spring.review.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.store.entity.Store;
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
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    private String reviewContent;

    @Column(length = 255)
    private String reviewImage;

    @Column(nullable = false)
    private int reviewGrade;

    /**
     * 리뷰 : 댓글 = 1 : 1 양방향
     * 리뷰 삭제시 댓글도 삭제
     */
//    @OneToOne(mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @OneToOne(mappedBy = "review")
    private Comment comment;
//    @OneToMany(mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Comment> comment = new ArrayList<>();



    /**
     * 카카오 : 리뷰 = 1 : N 단방향
     * 카카오 삭제시 리뷰도 삭제
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "kakao_id")
    private Kakao kakao;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "local_id")
    private Local local;

    public void setKakao(Kakao kakao) {
        this.kakao = kakao;
    }

    public void getKakao(Kakao kakao) {
        this.kakao = kakao;
    }

    /**
     * 스토어 : 리뷰 = 1 : N 양방향 
     */
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    public void addStore(Store store) {
        this.store = store;
        if(store.getReviews().contains(this))
            store.getReviews().add(this);
    }



}