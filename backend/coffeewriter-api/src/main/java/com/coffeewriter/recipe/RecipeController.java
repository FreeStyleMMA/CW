package com.coffeewriter.recipe;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor

public class RecipeController {

	private final RecipeService service;
	
	
	//=======================
	//레시피 작성 로직.
	@PostMapping("/write")  
	public ResponseEntity<Void> recipeWrite(@RequestBody RecipeDTO request){
		service.writeRecipe(request);
		return ResponseEntity.ok().build();
	}
	
	//=======================
	//레시피 리스트(게시판)
	@GetMapping("/getRecipes")
	public ResponseEntity<List<RecipeDTO>> getRecipes(@RequestParam("memberId") String memberId ) {
		List<RecipeDTO> recipeList = service.getAllRecipes(memberId);
		return ResponseEntity.ok(recipeList);
	}
	
	//=======================
	//레시피 상세 조회 페이지
	@GetMapping("/{id}")
	public ResponseEntity<RecipeDTO> getRecipeDetail(
			@PathVariable("id") Long id
	) {
		RecipeDTO recipeDetail = service.getRecipeDetail(id);
		return ResponseEntity.ok(recipeDetail);
	}
	
	//=======================
	//레시피 수정
	@PutMapping("/{id}")
	public ResponseEntity<RecipeDTO> updateRecipe(
			@PathVariable("id") Long id, 
			@RequestBody RecipeDTO recipeDTO
			){
		RecipeDTO updateRecipe = service.updateRecipe(id,recipeDTO);
		return ResponseEntity.ok(updateRecipe);
		
	}
	
	//=======================
	//레시피 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(
			@PathVariable("id") Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
		
	}
	
	   @GetMapping("/bean/{beanId}")
	    public ResponseEntity<List<RecipeDTO>> getRecipesByBeanId(
	            @PathVariable("beanId") Long beanId
	    ) {

		   List<RecipeDTO> recipeList = service.getRecipesByBeanId(beanId);
		   
	        return ResponseEntity.ok(
	                service.getRecipesByBeanId(beanId)
	        );
	    }
}


 