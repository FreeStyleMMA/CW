package com.coffeewriter.roastery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoasteryRepository
        extends JpaRepository<Roastery, Long> {
    // 검색 기능
	List<Roastery> findByNameContainingIgnoreCase(String keyword);

}