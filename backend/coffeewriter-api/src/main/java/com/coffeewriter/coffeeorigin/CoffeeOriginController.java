package com.coffeewriter.coffeeorigin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/coffee-origins")
@RequiredArgsConstructor
@CrossOrigin(
	    origins = {
	        "http://localhost:3000",
	        "http://localhost:5173",
	        "http://localhost"
	    },
	    allowCredentials = "true"
	)
public class CoffeeOriginController {

    private final CoffeeOriginService service;

    @PostMapping
    public ResponseEntity<CoffeeOriginDTO> create(
            @RequestBody CoffeeOriginDTO dto) {

        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<CoffeeOriginDTO>> getAll() {

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoffeeOriginDTO> get(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(service.get(id));
    }
    
    @GetMapping("/country/{countryId}")
    public ResponseEntity<List<CoffeeOriginDTO>> getByCountry(
    		@PathVariable("countryId") Long countryId) {

        return ResponseEntity.ok(
                service.getByCountry(countryId)
        );
    }
    
    @GetMapping("/options")
    public ResponseEntity<CoffeeOriginOptionsDTO> getOptions(
            @RequestParam("countryId") Long countryId) {

        return ResponseEntity.ok(
                service.getOptions(countryId)
        );
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CoffeeOriginDTO> updateCoffeeOrigin(
            @PathVariable("id") Long id,
            @RequestBody CoffeeOriginDTO dto) {

        return ResponseEntity.ok(
                service.update(id, dto)
        );
    }
}