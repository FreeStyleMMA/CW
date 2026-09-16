package com.coffeewriter.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardOverviewResponse {

    private long recipeCount;
    private long beanCount;
    private Double AvgRating;
}