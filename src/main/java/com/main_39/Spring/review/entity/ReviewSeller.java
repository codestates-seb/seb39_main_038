package com.main_39.Spring.review.entity;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

public class ReviewSeller {

    private String content;

    @OneToOne
    @JoinColumn(name="review_id")
    private Review review;

}
