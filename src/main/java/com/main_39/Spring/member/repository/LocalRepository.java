package com.main_39.Spring.member.repository;

import com.main_39.Spring.member.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocalRepository extends JpaRepository<Local,Long> {
    @Query(value = "SELECT * FROM local WHERE account_email = :accountEmail", nativeQuery = true)

    Optional<Local> findByAccount_email(String accountEmail);
}
