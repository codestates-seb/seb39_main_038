package com.main_39.Spring.menu.repository;

import com.main_39.Spring.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
