package com.coffeewriter.coffeeorigin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoffeeOriginRepository
        extends JpaRepository<CoffeeOrigin, Long> {

    List<CoffeeOrigin> findByCountryId(Long countryId);


    @Query("""
        SELECT DISTINCT c.region
        FROM CoffeeOrigin c
        WHERE c.country.id = :countryId
          AND c.region IS NOT NULL
        ORDER BY c.region
    """)
    List<String> findDistinctRegionsByCountryId(
            @Param("countryId") Long countryId
    );


    @Query("""
        SELECT DISTINCT c.variety
        FROM CoffeeOrigin c
        WHERE c.country.id = :countryId
          AND c.variety IS NOT NULL
        ORDER BY c.variety
    """)
    List<String> findDistinctVarietiesByCountryId(
            @Param("countryId") Long countryId
    );


    @Query("""
        SELECT DISTINCT c.process
        FROM CoffeeOrigin c
        WHERE c.country.id = :countryId
          AND c.process IS NOT NULL
        ORDER BY c.process
    """)
    List<String> findDistinctProcessesByCountryId(
            @Param("countryId") Long countryId
    );


    @Query("""
        SELECT DISTINCT c.grade
        FROM CoffeeOrigin c
        WHERE c.country.id = :countryId
          AND c.grade IS NOT NULL
        ORDER BY c.grade
    """)
    List<String> findDistinctGradesByCountryId(
            @Param("countryId") Long countryId
    );
}