package com.coffeewriter.coffeeorigin;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coffeewriter.country.Country;
import com.coffeewriter.country.CountryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CoffeeOriginService {

    private final CoffeeOriginRepository repository;
    private final CountryRepository countryRepository;


    // ===========================
    // CoffeeOrigin 등록
    // ===========================

    @Transactional
    public CoffeeOriginDTO create(CoffeeOriginDTO dto) {

        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Country를 찾을 수 없습니다. id="
                        + dto.getCountryId()
                    )
                );


        CoffeeOrigin origin = CoffeeOrigin.builder()
                .country(country)
                .region(dto.getRegion())
                .producer(dto.getProducer())
                .farm(dto.getFarm())
                .variety(dto.getVariety())
                .process(dto.getProcess())
                .grade(dto.getGrade())
                .altitude(dto.getAltitude())
                .harvestYear(dto.getHarvestYear())
                .description(dto.getDescription())
                .build();


        return convertToDTO(repository.save(origin));
    }


    // ===========================
    // 전체 조회
    // ===========================

    @Transactional(readOnly = true)
    public List<CoffeeOriginDTO> getAll() {

        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ===========================
    // 상세 조회
    // ===========================

    @Transactional(readOnly = true)
    public CoffeeOriginDTO get(Long id) {

        CoffeeOrigin origin = repository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "CoffeeOrigin을 찾을 수 없습니다. id=" + id
                    )
                );

        return convertToDTO(origin);
    }


    // ===========================
    // Entity → DTO
    // ===========================

    private CoffeeOriginDTO convertToDTO(CoffeeOrigin origin) {

        return CoffeeOriginDTO.builder()
                .id(origin.getId())

                .countryId(
                        origin.getCountry().getId()
                )

                .countryName(
                        origin.getCountry().getName()
                )

                .region(origin.getRegion())
                .producer(origin.getProducer())
                .farm(origin.getFarm())
                .variety(origin.getVariety())
                .process(origin.getProcess())
                .grade(origin.getGrade())
                .altitude(origin.getAltitude())
                .harvestYear(origin.getHarvestYear())
                .description(origin.getDescription())
                .createdAt(origin.getCreatedAt())
                .updatedAt(origin.getUpdatedAt())

                .build();
    }
    
    @Transactional
    public CoffeeOriginDTO update(Long id, CoffeeOriginDTO dto) {

        CoffeeOrigin origin = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "CoffeeOrigin을 찾을 수 없습니다. id=" + id
                        )
                );

        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Country를 찾을 수 없습니다. id="
                                + dto.getCountryId()
                        )
                );

        origin.update(
                country,
                dto.getRegion(),
                dto.getProducer(),
                dto.getFarm(),
                dto.getVariety(),
                dto.getProcess(),
                dto.getGrade(),
                dto.getAltitude(),
                dto.getHarvestYear(),
                dto.getDescription()
        );

        return convertToDTO(origin);
    }
    
    @Transactional
    public void delete(Long id) {

        if (!repository.existsById(id)) {

            throw new IllegalArgumentException(
                    "존재하지 않는 CoffeeOrigin입니다. id=" + id
            );
        }

        repository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public List<CoffeeOriginDTO> getByCountry(Long countryId) {

        return repository.findByCountryId(countryId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    @Transactional(readOnly = true)
    public CoffeeOriginOptionsDTO getOptions(Long countryId) {

        return CoffeeOriginOptionsDTO.builder()
                .regions(
                        repository.findDistinctRegionsByCountryId(countryId)
                )
                .varieties(
                        repository.findDistinctVarietiesByCountryId(countryId)
                )
                .processes(
                        repository.findDistinctProcessesByCountryId(countryId)
                )
                .grades(
                        repository.findDistinctGradesByCountryId(countryId)
                )
                .build();
    }
}   