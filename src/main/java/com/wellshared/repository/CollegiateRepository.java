package com.wellshared.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Collegiate;

public interface CollegiateRepository extends JpaRepository<Collegiate, Long>{
	
	Optional<Collegiate> findByNumber(Long number);
}
