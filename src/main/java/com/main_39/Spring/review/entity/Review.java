package com.main_39.Spring.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String reviewContent;

    private String reviewImage;

    private int reviewGrade;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}
