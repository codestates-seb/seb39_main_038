package com.main_39.Spring.member.repository;

import com.main_39.Spring.member.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocalRepository extends JpaRepository<Local,Long> {
    Optional<Local> findByAccountEmail(String accountEmail);
    Optional<Local> findByNameAndPhoneNumber(String name, String phoneNumber);
    Optional<Local> findByAccountEmailAndNameAndPhoneNumber(String accountEmail, String name, String phoneNumber);
}
