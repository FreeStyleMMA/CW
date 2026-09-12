package com.coffeewriter.recipe;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.coffeewriter.bean.Bean;
import com.coffeewriter.member.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "recipe")
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//등록 사용자 memberId
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;
	
	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime createdAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bean_id")
	private Bean bean;

//	@Column(nullable = false)
//	private String bean;//원두 종류
	
	@Column(nullable = false)
	private float dose;
	
	@Column(nullable = false)
	private float grindingSize;//분쇄도
	
	@Column(nullable = false)
	private float espressoOutput;// 추출량
	
	@Column(nullable = false)
	private int extractSecond;//추출시간
	
	@Column(nullable = false)
	private float temperature;//추출온도
	
	@Column(nullable = false)
	private float ebr;//추출비율(Espresso Brew Ratio)
	
	@Column(nullable = true)
	private int rating;
	
	@Column(columnDefinition = "TEXT")
	private String note;

	
}
