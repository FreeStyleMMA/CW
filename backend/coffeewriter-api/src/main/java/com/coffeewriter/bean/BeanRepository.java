package com.coffeewriter.bean;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeanRepository extends JpaRepository<Bean, Long> {
	// 검색 기능
	List<Bean> findByNameContainingIgnoreCaseOrNickNameContainingIgnoreCase(
            String nameKeyword,
            String nickNameKeyword
    );
}