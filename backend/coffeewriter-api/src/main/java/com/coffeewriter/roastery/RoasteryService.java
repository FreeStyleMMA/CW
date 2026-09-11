package com.coffeewriter.roastery;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoasteryService {

    private final RoasteryRepository roasteryRepository;


    // ===========================
    // Roastery 등록

    public RoasteryDTO createRoastery(RoasteryDTO dto) {

        Roastery roastery = Roastery.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .discription(dto.getDiscription())
                .build();

        Roastery savedRoastery =
                roasteryRepository.save(roastery);

        return convertToDTO(savedRoastery);
    }


    // ===========================
    // Roastery 전체 조회

    @Transactional(readOnly = true)
    public List<RoasteryDTO> getRoasteries() {

        return roasteryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ===========================
    // Roastery 상세 조회

    @Transactional(readOnly = true)
    public RoasteryDTO getRoastery(Long id) {

        Roastery roastery =
                roasteryRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Roastery를 찾을 수 없습니다. id=" + id
                                )
                        );

        return convertToDTO(roastery);
    }


    // ===========================
    // Roastery 수정

    public RoasteryDTO updateRoastery(
            Long id,
            RoasteryDTO dto) {

        Roastery roastery =
                roasteryRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Roastery를 찾을 수 없습니다. id=" + id
                                )
                        );

        roastery.update(
                dto.getName(),
                dto.getLocation(),
                dto.getDiscription()
        );

        return convertToDTO(roastery);
    }


    // ===========================
    // Roastery 삭제

    public void deleteRoastery(Long id) {

        if (!roasteryRepository.existsById(id)) {

            throw new IllegalArgumentException(
                    "존재하지 않는 Roastery입니다. id=" + id
            );
        }

        roasteryRepository.deleteById(id);
    }


    // ===========================
    // Entity → DTO

    private RoasteryDTO convertToDTO(
            Roastery roastery) {

        return RoasteryDTO.builder()
                .id(roastery.getId())
                .name(roastery.getName())
                .location(roastery.getLocation())
                .discription(roastery.getDiscription())
                .build();
    }
    
    @Transactional(readOnly = true)
    public List<RoasteryDTO> searchRoasteries(String keyword) {

        return roasteryRepository
                .findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
}