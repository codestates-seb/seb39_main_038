package com.main_39.Spring.comment.repository;

import com.main_39.Spring.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    public Page<Comment> findByReview_ReviewId(long reviewId, Pageable pageable);
}