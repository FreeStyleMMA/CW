package com.coffeewriter.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long>{
	Optional<Member> findByEmail(String email);
	boolean existsByEmail(String email);
	boolean existsByNickname(String nickname);
	boolean existsByMemberId(String memberId);
	Optional<Member> findByMemberId(String memberId);
}
