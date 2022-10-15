package com.main_39.Spring.member.repository;

import com.main_39.Spring.member.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LocalRepository extends JpaRepository<Local,Long> {
    Optional<Local> findByEmail(String email);
    Optional<Local> findByNameAndPhone(String name, String phone);
    Optional<Local> findByEmailAndRefreshToken(String email, String refreshToken);
}
