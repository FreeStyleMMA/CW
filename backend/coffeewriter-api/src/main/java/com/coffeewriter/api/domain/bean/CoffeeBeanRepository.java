package com.coffeewriter.api.domain.bean;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeBeanRepository extends JpaRepository<CoffeeBean, Long> {
}