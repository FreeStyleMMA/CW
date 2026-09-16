package com.coffeewriter.dashboard;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RecentRecipeResponse {

    private Long id;
    private Long beanId;
    private String beanName;
    private LocalDateTime createdAt;
    private float dose;
    private float grindingSize;
    private float espressoOutput;
    private int extractSecond;
    private float temperature;
    private float ebr;
    private int rating;

}