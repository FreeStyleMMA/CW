
package com.coffeewriter.country;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryRepository countryRepository;

    @Transactional
    public CountryDTO createCountry(CountryDTO dto) {

        Country country = Country.builder()
                .name(dto.getName())
                .code(dto.getCode())
                .build();

        return convertToDTO(countryRepository.save(country));
    }

    @Transactional(readOnly = true)
    public List<CountryDTO> getCountries() {

        return countryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public CountryDTO getCountry(Long id) {

        Country country = countryRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException("Country를 찾을 수 없습니다."));

        return convertToDTO(country);
    }

    @Transactional
    public CountryDTO updateCountry(Long id, CountryDTO dto) {

        Country country = countryRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException("Country를 찾을 수 없습니다."));

        country.update(dto.getName(), dto.getCode());

        return convertToDTO(country);
    }

    @Transactional
    public void deleteCountry(Long id) {

        countryRepository.deleteById(id);
    }

    private CountryDTO convertToDTO(Country country) {

        return CountryDTO.builder()
                .id(country.getId())
                .name(country.getName())
                .code(country.getCode())
                .build();
    }
    
    @Transactional(readOnly = true)
    public List<CountryDTO> searchCountries(String keyword) {
        return countryRepository
                .findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
}