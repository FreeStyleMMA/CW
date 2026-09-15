package com.coffeewriter.country;

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
@RequestMapping("/api/countries")
@RequiredArgsConstructor
@CrossOrigin(
	    origins = {
	        "http://localhost:3000",
	        "http://localhost:5173",
	        "http://localhost"
	    },
	    allowCredentials = "true"
	)
public class CountryController {

    private final CountryService service;

    @PostMapping
    public ResponseEntity<CountryDTO> create(
            @RequestBody CountryDTO dto) {

        return ResponseEntity.ok(service.createCountry(dto));
    }

    @GetMapping
    public ResponseEntity<List<CountryDTO>> getCountries(
            @RequestParam(value = "keyword", required = false) String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.ok(service.getCountries());
        }

        return ResponseEntity.ok(service.searchCountries(keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryDTO> getCountry(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(service.getCountry(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CountryDTO> update(
            @PathVariable("id") Long id,
            @RequestBody CountryDTO dto) {

        return ResponseEntity.ok(service.updateCountry(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable("id") Long id) {

        service.deleteCountry(id);

        return ResponseEntity.noContent().build();
    }
    
  
}