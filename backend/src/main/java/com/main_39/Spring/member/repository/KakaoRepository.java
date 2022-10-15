package com.main_39.Spring.member.repository;

import com.main_39.Spring.member.entity.Kakao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KakaoRepository extends JpaRepository<Kakao,Long> {
}
