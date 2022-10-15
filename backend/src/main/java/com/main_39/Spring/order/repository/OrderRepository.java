package com.main_39.Spring.order.repository;

import com.main_39.Spring.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
