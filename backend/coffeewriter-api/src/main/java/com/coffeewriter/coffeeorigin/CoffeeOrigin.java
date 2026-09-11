package com.coffeewriter.coffeeorigin;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.coffeewriter.country.Country;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "coffee_origin")
public class CoffeeOrigin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ===========================
    // Country
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;


    // ===========================
    // 생산 정보
    // ===========================

    @Column(name = "region")
    private String region;

    @Column(name = "producer")
    private String producer;

    @Column(name = "farm")
    private String farm;

    @Column(name = "variety")
    private String variety;

    @Column(name = "process")
    private String process;

    @Column(name = "grade")
    private String grade;

    @Column(name = "altitude")
    private Integer altitude;

    @Column(name = "harvest_year")
    private String harvestYear;


    // ===========================
    // 기타
    // ===========================

    @Column(columnDefinition = "TEXT")
    private String description;


    // ===========================
    // 생성 / 수정 시간
    // ===========================
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public void update(
            Country country,
            String region,
            String producer,
            String farm,
            String variety,
            String process,
            String grade,
            Integer altitude,
            String harvestYear,
            String description) {

        this.country = country;
        this.region = region;
        this.producer = producer;
        this.farm = farm;
        this.variety = variety;
        this.process = process;
        this.grade = grade;
        this.altitude = altitude;
        this.harvestYear = harvestYear;
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }
}