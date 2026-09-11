package com.coffeewriter.roastery;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "roastery")
public class Roastery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "location", length = 200)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String discription;


    // ===========================
    // Roastery 수정

    public void update(
            String name,
            String location,
            String discription) {

        this.name = name;
        this.location = location;
        this.discription = discription;
    }
}