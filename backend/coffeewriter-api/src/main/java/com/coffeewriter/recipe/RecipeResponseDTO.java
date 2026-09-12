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
public class RecipeResponseDTO {
	private Long id;

	@CreatedDate
    private LocalDateTime createdAt;	
	
    // ===========================
    
	
    // ===========================
    // Bean
	
	private Long beanId;//원두 id
	
	private String beanName;// 원두 이름
	
	
	//=====에스프레소 추출 정보 =====
	
	private float dose; // 도징량
	
	private float grindingSize;//분쇄도
	
	private float espressoOutput;// 추출량
	
	private int extractSecond;//추출시간
	
	private float temperature;//추출온도
	
	private float ebr;//추출비율(Espresso Brew Ratio)
	
	private int rating;
	
	// Member
	
		private String memberId;//작성자id
		
}
