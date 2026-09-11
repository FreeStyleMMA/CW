package com.coffeewriter.country;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
	// 검색 기능
	 List<Country> findByNameContainingIgnoreCase(String keyword);
}