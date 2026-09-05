package com.coffeewriter.recipe;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor

public class RecipeService {

	
private final RecipeRepository recipeRepository;	
    
//===========================
//레시피 작성
	public void writeRecipe(RecipeDTO request) {
		final LocalDateTime serverTime = LocalDateTime.now();//서버시간 생성
			
		Recipe recipe = Recipe.builder()//파라리미터로 받은 recipe 생성
				.createdAt(serverTime)
				.memberId(request.getMemberId())
				.bean(request.getBean())
				.dose(request.getDose())
				.grindingSize(request.getGrindingSize())
				.espressoOutput(request.getEspressoOutput())
				.extractSecond(request.getExtractSecond())
				.temperature(request.getTemperature())
				.ebr(request.getEbr()) // EBR 나중에 자동 계산되게 하기.
				.build();
		
		recipeRepository.save(recipe);
	}
	
	//===========================
	//Recipe 목록 가져오기
	public List<RecipeDTO> getAllRecipes(String memberId){
	List<Recipe> allRecipes = recipeRepository.findByMemberId(memberId);
		
		return allRecipes.stream()
				.map(recipe -> new RecipeDTO(
						recipe.getId(),
						recipe.getCreatedAt(),
	                    recipe.getMemberId(),
	                    recipe.getBean(),
	                    recipe.getDose(),
	                    recipe.getGrindingSize(),
	                    recipe.getEspressoOutput(),
	                    recipe.getExtractSecond(),
	                    recipe.getTemperature(),
	                    recipe.getEbr()
						))
						.collect(Collectors.toList());
	}
	
	//===========================
	//recipe 객체의 detail 정보 가져오기(id 기준)
	public RecipeDTO getRecipeDetail(Long id) {
		  Recipe recipe = recipeRepository.findById(id)
	                .orElseThrow(() ->
	                    new RuntimeException("해당 레시피를 찾을 수 없습니다.")
	                );
		  RecipeDTO detail = new RecipeDTO(
				  recipe.getId(),
				recipe.getCreatedAt(),
                  recipe.getMemberId(),
                  recipe.getBean(),
                  recipe.getDose(),
                  recipe.getGrindingSize(),
                  recipe.getEspressoOutput(),
                  recipe.getExtractSecond(),
                  recipe.getTemperature(),
                  recipe.getEbr()
                  );
		
		return detail;
	}
	
	//==============================
	//recipe update
	@Transactional
	public RecipeDTO updateRecipe(Long id, RecipeDTO dto)
	{
		Recipe recipe = recipeRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("레시피를 찾지 못했습니다"));
		
		  recipe.setBean(dto.getBean());
		  recipe.setDose(dto.getDose());
		  recipe.setGrindingSize(dto.getGrindingSize());
		  recipe.setEspressoOutput(dto.getEspressoOutput());
		  recipe.setExtractSecond(dto.getExtractSecond());
		  recipe.setTemperature(dto.getTemperature());
		  recipe.setEbr(dto.getEbr());
		
		    
		    return RecipeDTO.builder()
		    		.createdAt(recipe.getCreatedAt())
		    		.memberId(recipe.getMemberId())
		            .bean(recipe.getBean())
		            .dose(recipe.getDose())
		            .grindingSize(recipe.getGrindingSize())
		            .espressoOutput(recipe.getEspressoOutput())
		            .extractSecond(recipe.getExtractSecond())
		            .temperature(recipe.getTemperature())
		            .ebr(recipe.getEbr())		           	            
		            .build();
		}
	@Transactional
	public void delete(Long id) {
	    if (!recipeRepository.existsById(id)) {
	        throw new IllegalArgumentException("존재하지 않는 레시피입니다. id=" + id);
	    }
	    recipeRepository.deleteById(id);
	}
	
}