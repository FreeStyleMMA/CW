package com.coffeewriter.roastery;

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
@RequestMapping("/api/roasteries")
@RequiredArgsConstructor

public class RoasteryController {

    private final RoasteryService service;


    // ===========================
    // Roastery 등록

    @PostMapping
    public ResponseEntity<RoasteryDTO> createRoastery(
            @RequestBody RoasteryDTO dto) {

        return ResponseEntity.ok(
                service.createRoastery(dto)
        );
    }


    // ===========================
    // Roastery 전체 조회

    @GetMapping
    public ResponseEntity<List<RoasteryDTO>> getRoasteries(
            @RequestParam(value = "keyword", required = false) String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.ok(service.getRoasteries());
        }

        return ResponseEntity.ok(service.searchRoasteries(keyword));
    }


    // ===========================
    // Roastery 상세 조회

    @GetMapping("/{id}")
    public ResponseEntity<RoasteryDTO> getRoastery(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(
                service.getRoastery(id)
        );
    }


    // ===========================
    // Roastery 수정

    @PutMapping("/{id}")
    public ResponseEntity<RoasteryDTO> updateRoastery(
            @PathVariable("id") Long id,
            @RequestBody RoasteryDTO dto) {

        return ResponseEntity.ok(
                service.updateRoastery(id, dto)
        );
    }


    // ===========================
    // Roastery 삭제

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoastery(
            @PathVariable("id") Long id) {

        service.deleteRoastery(id);

        return ResponseEntity.noContent().build();
    }
}