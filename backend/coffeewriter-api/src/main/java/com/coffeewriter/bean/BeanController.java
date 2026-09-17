package com.coffeewriter.bean;

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
@RequestMapping("/api/beans")
@RequiredArgsConstructor

public class BeanController {

    private final BeanService service;


    // Bean 등록
    @PostMapping
    public ResponseEntity<BeanDTO> createBean(
            @RequestBody BeanDTO beanDTO) {

        return ResponseEntity.ok(
                service.createBean(beanDTO)
        );
    }


    // Bean 전체 조회
    @GetMapping
    public ResponseEntity<List<BeanDTO>> getBeans(
            @RequestParam(value = "keyword", required = false) String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.ok(service.getBeans());
        }

        return ResponseEntity.ok(service.searchBeans(keyword));
    }

    // Bean 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BeanDTO> getBean(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(
                service.getBean(id)
        );
    }


    // Bean 수정
    @PutMapping("/{id}")
    public ResponseEntity<BeanDTO> updateBean(
            @PathVariable("id") Long id,
            @RequestBody BeanDTO beanDTO) {

        return ResponseEntity.ok(
                service.updateBean(id, beanDTO)
        );
    }


    // Bean 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBean(
            @PathVariable("id") Long id) {

        service.deleteBean(id);

        return ResponseEntity.noContent().build();
    }
}