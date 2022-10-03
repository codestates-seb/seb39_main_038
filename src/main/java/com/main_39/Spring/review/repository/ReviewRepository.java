package com.main_39.Spring.review.repository;

import com.main_39.Spring.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT * FROM Store WHERE review_grade = :reviewGrade", nativeQuery = true)
    Optional<Review> findByGrade(int reviewGrade);

    //public Page<Kakao> findByKakao_kakaoId(long kakaoId, Pageable pageable);
}