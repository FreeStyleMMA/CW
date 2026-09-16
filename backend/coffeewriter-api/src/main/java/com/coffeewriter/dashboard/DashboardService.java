package com.coffeewriter.dashboard;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coffeewriter.bean.BeanRepository;
import com.coffeewriter.recipe.Recipe;
import com.coffeewriter.recipe.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final BeanRepository beanRepository;
    private final RecipeRepository recipeRepository;

    public DashboardOverviewResponse getOverview() {

        long recipeCount = recipeRepository.count();
        long beanCount = beanRepository.count();
        Double AvgRating= recipeRepository.findAverageRating();

        return new DashboardOverviewResponse(
                recipeCount,
                beanCount,
                AvgRating
        );
    }

    public List<RecentRecipeResponse> getRecentRecords() {

        return recipeRepository.findTop4ByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private RecentRecipeResponse toResponse(Recipe recipe) {

        return new RecentRecipeResponse(
                recipe.getId(),
                recipe.getBean() != null
                        ? recipe.getBean().getId()
                        : null,
                recipe.getBean() != null
                        ? recipe.getBean().getName()
                        : null,
                recipe.getCreatedAt(),
                recipe.getDose(),
                recipe.getGrindingSize(),
                recipe.getEspressoOutput(),
                recipe.getExtractSecond(),
                recipe.getTemperature(),
                recipe.getEbr(),
                recipe.getRating()
        );
    }
}