package com.coffeewriter.recipe;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDTO {
	
	private Long id;

	@CreatedDate
    private LocalDateTime createdAt;	
	
	private String memberId;//작성자id
	
	private String bean;//원두 종류
	
	private float dose; // 도징량
	
	private float grindingSize;//분쇄도
	
	private float espressoOutput;// 추출량
	
	private int extractSecond;//추출시간
	
	private float temperature;//추출온도
	
	private float ebr;//추출비율(Espresso Brew Ratio)
		
}
