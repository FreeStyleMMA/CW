package com.coffeewriter.bean;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coffeewriter.coffeeorigin.CoffeeOrigin;
import com.coffeewriter.coffeeorigin.CoffeeOriginRepository;
import com.coffeewriter.roastery.Roastery;
import com.coffeewriter.roastery.RoasteryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BeanService {

    private final BeanRepository beanRepository;

    private final CoffeeOriginRepository coffeeOriginRepository;

    private final RoasteryRepository roasteryRepository;


    // ===========================
    // Bean 등록
    // ===========================

    public BeanDTO createBean(BeanDTO dto) {

        CoffeeOrigin coffeeOrigin = null;
        Roastery roastery = null;


        // ===========================
        // CoffeeOrigin 조회
        // 선택 사항
        // ===========================

        if (dto.getCoffeeOriginId() != null) {

            coffeeOrigin = coffeeOriginRepository
                    .findById(dto.getCoffeeOriginId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "CoffeeOrigin을 찾을 수 없습니다. id="
                                    + dto.getCoffeeOriginId()
                            )
                    );
        }


        // ===========================
        // Roastery 조회
        // 선택 사항
        // ===========================

        if (dto.getRoasteryId() != null) {

            roastery = roasteryRepository
                    .findById(dto.getRoasteryId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Roastery를 찾을 수 없습니다. id="
                                    + dto.getRoasteryId()
                            )
                    );
        }


        // ===========================
        // Bean 생성
        // ===========================

        LocalDateTime now = LocalDateTime.now();

        Bean bean = Bean.builder()
                .coffeeOrigin(coffeeOrigin)
                .roastery(roastery)
                .name(dto.getName())
                .nickName(dto.getNickName())
                .roastLevel(dto.getRoastLevel())
                .roastDate(dto.getRoastDate())
                .description(dto.getDescription())
                .verificationStatus(
                        dto.getVerificationStatus() != null
                                ? dto.getVerificationStatus()
                                : "UNVERIFIED"
                )
                .createdAt(now)
                .updatedAt(now)
                .build();


        Bean savedBean = beanRepository.save(bean);

        return convertToDTO(savedBean);
    }


    // ===========================
    // Bean 전체 조회
    // ===========================

    @Transactional(readOnly = true)
    public List<BeanDTO> getBeans() {

        return beanRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ===========================
    // Bean 상세 조회
    // ===========================

    @Transactional(readOnly = true)
    public BeanDTO getBean(Long id) {

        Bean bean = beanRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bean을 찾을 수 없습니다. id=" + id
                        )
                );

        return convertToDTO(bean);
    }


    // ===========================
    // Bean 수정
    // ===========================

    public BeanDTO updateBean(Long id, BeanDTO dto) {

        Bean bean = beanRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Bean을 찾을 수 없습니다. id=" + id
                        )
                );


        CoffeeOrigin coffeeOrigin = null;
        Roastery roastery = null;


        // ===========================
        // CoffeeOrigin 조회
        // 선택 사항
        // ===========================

        if (dto.getCoffeeOriginId() != null) {

            coffeeOrigin = coffeeOriginRepository
                    .findById(dto.getCoffeeOriginId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "CoffeeOrigin을 찾을 수 없습니다. id="
                                    + dto.getCoffeeOriginId()
                            )
                    );
        }


        // ===========================
        // Roastery 조회
        // 선택 사항
        // ===========================

        if (dto.getRoasteryId() != null) {

            roastery = roasteryRepository
                    .findById(dto.getRoasteryId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Roastery를 찾을 수 없습니다. id="
                                    + dto.getRoasteryId()
                            )
                    );
        }


        // ===========================
        // Bean 수정
        // ===========================

        bean.update(
                coffeeOrigin,
                roastery,
                dto.getName(),
                dto.getNickName(),
                dto.getRoastLevel(),
                dto.getRoastDate(),
                dto.getDescription(),
                dto.getVerificationStatus()
        );


        return convertToDTO(bean);
    }


    // ===========================
    // Bean 삭제
    // ===========================

    public void deleteBean(Long id) {

        if (!beanRepository.existsById(id)) {

            throw new IllegalArgumentException(
                    "존재하지 않는 Bean입니다. id=" + id
            );
        }

        beanRepository.deleteById(id);
    }


    // ===========================
    // Entity → DTO
    // ===========================

    private BeanDTO convertToDTO(Bean bean) {

        String countryName = null;
        String region = null;
        String producer = null;
        String farm = null;
        String variety = null;
        String process = null;
        String grade = null;
        Integer altitude = null;
        String harvestYear = null;
        String originDescription = null;

        if (bean.getCoffeeOrigin() != null) {

            if (bean.getCoffeeOrigin().getCountry() != null) {
                countryName =
                        bean.getCoffeeOrigin()
                            .getCountry()
                            .getName();
            }

            region =
                    bean.getCoffeeOrigin().getRegion();

            producer =
                    bean.getCoffeeOrigin().getProducer();

            farm =
                    bean.getCoffeeOrigin().getFarm();

            variety =
                    bean.getCoffeeOrigin().getVariety();

            process =
                    bean.getCoffeeOrigin().getProcess();

            grade =
                    bean.getCoffeeOrigin().getGrade();

            altitude =
                    bean.getCoffeeOrigin().getAltitude();

            harvestYear =
                    bean.getCoffeeOrigin().getHarvestYear();

            originDescription =
                    bean.getCoffeeOrigin().getDescription();
        }

        return BeanDTO.builder()

                .id(bean.getId())

                .coffeeOriginId(
                        bean.getCoffeeOrigin() != null
                                ? bean.getCoffeeOrigin().getId()
                                : null
                )

                .coffeeOriginCountry(countryName)
                .coffeeOriginRegion(region)

                .producer(producer)
                .farm(farm)
                .variety(variety)
                .process(process)
                .grade(grade)
                .altitude(altitude)
                .harvestYear(harvestYear)
                .coffeeOriginDescription(originDescription)

                .roasteryId(
                        bean.getRoastery() != null
                                ? bean.getRoastery().getId()
                                : null
                )

                .roasteryName(
                        bean.getRoastery() != null
                                ? bean.getRoastery().getName()
                                : null
                )

                .name(bean.getName())
                .nickName(bean.getNickName())

                .roastLevel(bean.getRoastLevel())
                .roastDate(bean.getRoastDate())

                .description(bean.getDescription())

                .verificationStatus(
                        bean.getVerificationStatus()
                )

                .createdAt(bean.getCreatedAt())
                .updatedAt(bean.getUpdatedAt())

                .build();
    }
    
    @Transactional(readOnly = true)
    public List<BeanDTO> searchBeans(String keyword) {

        return beanRepository
                .findByNameContainingIgnoreCaseOrNickNameContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
}