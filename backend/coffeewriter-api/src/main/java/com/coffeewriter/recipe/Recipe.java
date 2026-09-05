package com.coffeewriter.recipe;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "recipe")
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String memberId;
	
	@Column(nullable = false)
	private LocalDateTime createdAt;
	
	@Column(nullable = false)
	private String bean;//원두 종류
	
	@Column(nullable = false)
	private float dose;
	
	@Column(nullable = false)
	private float grindingSize;//분쇄도
	
	@Column(nullable = false)
	private float espressoOutput;// 추출량
	
	@Column(nullable = false)
	private int extractSecond;//추출시간
	
	@Column(nullable = false)
	private float temperature;//추출온도
	
	@Column(nullable = false)
	private float ebr;//추출비율(Espresso Brew Ratio)
	
}
