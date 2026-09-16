package com.coffeewriter.recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByMember_MemberId(String memberId);
    List<Recipe> findByBeanIdOrderByCreatedAtDesc(Long beanId);
    List<Recipe> findTop4ByOrderByCreatedAtDesc();
    @Query("SELECT AVG(r.rating) FROM Recipe r")
    Double findAverageRating();
	}