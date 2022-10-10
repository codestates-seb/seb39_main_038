package com.main_39.Spring.review.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


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
     * casecade 설정시 댓글 삭제 불가
     */
    @OneToOne(mappedBy = "review", cascade = CascadeType.ALL)   // 1010 추가
    private Comment comment;

    /**
     * 카카오 : 리뷰 = 1 : N 단방향
     * 카카오 삭제시 리뷰도 삭제
     */
    // 1008 수정
//    @ManyToOne(fetch = FetchType.EAGER)
    @ManyToOne
    @JoinColumn(name = "kakao_id")
    private Kakao kakao;

    public void setKakao(Kakao kakao) {
        this.kakao = kakao;
    }

    public void getKakao(Kakao kakao) {
        this.kakao = kakao;
    }


    /**
     * 로컬(사업자) : 리뷰 = 1 : N 단방향
     * 로컬 삭제시 리뷰도 삭제
     */
    // 1008 수정
//    @ManyToOne(fetch = FetchType.EAGER)
    @ManyToOne
    @JoinColumn(name = "local_id")
    private Local local;

    // 1008 김나율 추가
    public void setLocal(Local local) {
        this.local = local;
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

    public void addComment(Comment comment) {
        this.comment = comment;
    }
}