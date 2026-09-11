package com.coffeewriter.recipe;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coffeewriter.bean.Bean;
import com.coffeewriter.bean.BeanRepository;
import com.coffeewriter.member.Member;
import com.coffeewriter.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final BeanRepository beanRepository;
    private final MemberRepository memberRepository;


    // ===========================
    // Recipe 작성

    public void writeRecipe(RecipeDTO request) {

        // Member 조회
        Member member = memberRepository.findByMemberId(
                request.getMemberId()
        ).orElseThrow(() ->
                new IllegalArgumentException(
                        "회원을 찾을 수 없습니다. memberId="
                        + request.getMemberId()
                )
        );


        // Bean 조회
        Bean bean;
        
        if (request.getBeanId() != null) {

            // 기존 Bean 선택
            bean = beanRepository.findById(request.getBeanId())
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Bean을 찾을 수 없습니다. beanId="
                        + request.getBeanId()
                    )
                );

        } else {

            // 새로운 Bean 직접 입력
            bean = new Bean();
            bean.setName(request.getBeanName());

            bean = beanRepository.save(bean);
        }


        // Recipe 생성
        Recipe recipe = Recipe.builder()
                .createdAt(LocalDateTime.now())

                // String memberId를 넣는 게 아니라
                // Member Entity 자체를 넣음
                .member(member)

                // Bean Entity 자체를 넣음
                .bean(bean)
                
                .dose(request.getDose())
                .grindingSize(request.getGrindingSize())
                .espressoOutput(request.getEspressoOutput())
                .extractSecond(request.getExtractSecond())
                .temperature(request.getTemperature())
                .ebr(request.getEbr())

                .build();

        recipeRepository.save(recipe);
    }


    // ===========================
    // Recipe 목록 조회

    public List<RecipeDTO> getAllRecipes(String memberId) {

        List<Recipe> recipes =
                recipeRepository.findByMember_MemberId(memberId);

        return recipes.stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ===========================
    // Recipe 상세 조회

    public RecipeDTO getRecipeDetail(Long id) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "해당 레시피를 찾을 수 없습니다. id="
                                + id
                        )
                );

        return convertToDTO(recipe);
    }


    // ===========================
    // Recipe 수정

    public RecipeDTO updateRecipe(
            Long id,
            RecipeDTO dto) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "레시피를 찾지 못했습니다. id="
                                + id
                        )
                );


        // ===========================
        // Bean 변경

        if (dto.getBeanId() != null
                && (
                    recipe.getBean() == null
                    || !dto.getBeanId()
                            .equals(recipe.getBean().getId())
                )) {

            Bean bean = beanRepository.findById(
                    dto.getBeanId()
            ).orElseThrow(() ->
                    new IllegalArgumentException(
                            "Bean을 찾을 수 없습니다. beanId="
                            + dto.getBeanId()
                    )
            );

            recipe.setBean(bean);
        }


        // ===========================
        // 추출 정보 수정

        recipe.setDose(dto.getDose());

        recipe.setGrindingSize(
                dto.getGrindingSize()
        );

        recipe.setEspressoOutput(
                dto.getEspressoOutput()
        );

        recipe.setExtractSecond(
                dto.getExtractSecond()
        );

        recipe.setTemperature(
                dto.getTemperature()
        );

        recipe.setEbr(
                dto.getEbr()
        );


        return convertToDTO(recipe);
    }


    // ===========================
    // Recipe 삭제

    public void delete(Long id) {

        if (!recipeRepository.existsById(id)) {

            throw new IllegalArgumentException(
                    "존재하지 않는 레시피입니다. id=" + id
            );
        }

        recipeRepository.deleteById(id);
    }


    // ===========================
    // Entity → DTO

    private RecipeDTO convertToDTO(
            Recipe recipe) {

        return RecipeDTO.builder()

                .id(recipe.getId())

                .createdAt(
                        recipe.getCreatedAt()
                )


                // ===========================
                // Member Entity → memberId

                .memberId(
                        recipe.getMember() != null
                                ? recipe.getMember()
                                        .getMemberId()
                                : null
                )


                // ===========================
                // Bean Entity → beanId

                .beanId(
                        recipe.getBean() != null
                                ? recipe.getBean().getId()
                                : null
                )


                // Bean Entity → beanName

                .beanName(
                        recipe.getBean() != null
                                ? recipe.getBean().getName()
                                : null
                )


                // ===========================
                // 추출 정보

                .dose(recipe.getDose())

                .grindingSize(
                        recipe.getGrindingSize()
                )

                .espressoOutput(
                        recipe.getEspressoOutput()
                )

                .extractSecond(
                        recipe.getExtractSecond()
                )

                .temperature(
                        recipe.getTemperature()
                )

                .ebr(recipe.getEbr())

                .build();
    }
    
    @Transactional(readOnly = true)
    public List<Recipe> getRecipesByBeanId(Long beanId) {
        return recipeRepository
                .findByBeanIdOrderByRecordDateDesc(beanId);
    }
}