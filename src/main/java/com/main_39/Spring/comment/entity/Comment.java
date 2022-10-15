package com.main_39.Spring.comment.entity;

import com.main_39.Spring.audit.Auditable;
import com.main_39.Spring.review.entity.Review;
import com.main_39.Spring.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String commentContent;

    public Comment(Long commentId, String commentContent) {
        this.commentId = commentId;
        this.commentContent = commentContent;
    }

    /**
     * 리뷰 : 댓글 = 1 : 1 양방향
     */
    @OneToOne
    @JoinColumn(name = "review_id")
    private Review review;

    public void setReview(Review review) {
        this.review = review;
        if(review.getComment() !=this) {
            review.setComment(this);
        }
    }

    public void addReview(Review review) {
        this.review = review;
    }

    /**
     * 스토어 : 댓글 = 1: N 양방향
     */
    @ManyToOne
    @JoinColumn(name="store_id")
    private Store store;

    public void setStore(Store store) {
        this.store = store;
    }
}