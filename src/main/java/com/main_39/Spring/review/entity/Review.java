package com.main_39.Spring.review.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.comment.entity.Comment;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String reviewContent;

    private String reviewImage;

    private int reviewGrade;

    /**
     * 리뷰 : 댓글 = 1 : 1
     * 리뷰 삭제시 댓글도 삭제
     */
    @OneToOne(mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Comment comment;


    /**
     * 카카오 : 리뷰 = 1 : N
     * 카카오 삭제시 리뷰도 삭제
     */
    @ManyToOne
    @JoinColumn(name = "kakao_id")
    private Kakao kakao;
//    List<Kakao> kakaos = new ArrayList<>();

//    public void setKakao(Kakao kakao) {
//        this.kakao = kakao;
//        if(!kakao.getReviews().contains(this))
//            kakao.getReviews().add(this);
//    }

    /**
     * 스토어 : 리뷰 = 1 : N
     */
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    public void addStore(Store store) {
        this.store = store;
        if(store.getReviews().contains(this))
            store.getReviews().add(this);
    }



//    public Review(Long reviewId, String reviewContent,String reviewImage, int reviewGrade) {
//        this.reviewId = reviewId;
//        this.reviewContent = reviewContent;
//        this.reviewImage = reviewImage;
//        this.reviewGrade = reviewGrade;
//    }
}
