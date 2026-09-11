package com.coffeewriter.bean;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class BeanDTO {

    private Long id;

    // 연관관계 ID
    private Long coffeeOriginId;
    private Long roasteryId;

    // 표시용 정보
    private String coffeeOriginCountry;
    private String coffeeOriginRegion;
    private String roasteryName;

    // CoffeeOrigin 상세
    private String producer;
    private String farm;
    private String variety;
    private String process;
    private String grade;
    private Integer altitude;
    private String harvestYear;
    private String coffeeOriginDescription;

    // Bean 정보
    private String name;
    private String nickName;

    private String roastLevel;
    private LocalDate roastDate;

    private String description;

    private String verificationStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}