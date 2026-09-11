package com.coffeewriter.bean;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.coffeewriter.coffeeorigin.CoffeeOrigin;
import com.coffeewriter.roastery.Roastery;

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
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "bean")
public class Bean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ===========================
    // CoffeeOrigin 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true, name = "coffee_origin_id")
    private CoffeeOrigin coffeeOrigin;


    // ===========================
    // Roastery 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roastery_id")
    private Roastery roastery;


    // ===========================
    // Bean 정보

    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(nullable = true, length = 200)
    private String nickName;


    // CoffeeOrigin이 없는 경우
    // 임시로 직접 입력한 원산지 정보

    @Column(name = "origin_country", length = 100)
    private String originCountry;

    @Column(name = "origin_region", length = 100)
    private String originRegion;


    // ===========================
    // 로스팅 정보

    @Column(name = "roast_level", length = 50)
    private String roastLevel;

    @Column(name = "roast_date")
    private LocalDate roastDate;


    // ===========================
    // 기타 정보

    @Column(columnDefinition = "TEXT")
    private String description;


    // UNVERIFIED / VERIFIED
    @Builder.Default
    @Column(name = "verification_status", length = 30, nullable = false)
    private String verificationStatus = "UNVERIFIED";


    // ===========================
    // 생성 / 수정 시간
    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    // ===========================
    // Bean 수정

    public void update(
            CoffeeOrigin coffeeOrigin,
            Roastery roastery,
            String name,
            String nickName,
            String roastLevel,
            LocalDate roastDate,
            String description,
            String verificationStatus) {

        this.coffeeOrigin = coffeeOrigin;
        this.roastery = roastery;
        this.name = name;
        this.roastLevel = roastLevel;
        this.roastDate = roastDate;
        this.description = description;
        this.verificationStatus = verificationStatus;
        this.updatedAt = LocalDateTime.now();
    }
}