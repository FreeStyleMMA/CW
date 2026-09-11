package com.coffeewriter.coffeeorigin;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoffeeOriginDTO {

    private Long id;

    private Long countryId;

    private String countryName;

    private String region;

    private String producer;

    private String farm;

    private String variety;

    private String process;

    private Integer altitude;

    private String harvestYear;
    
    private String grade;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}