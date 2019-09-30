package com.wellshared.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Center;
import com.wellshared.model.Location;

public interface CenterRepository extends JpaRepository<Center, Long>{
	
	List<Center> findAllByLocation(Location location);

	Optional<Center> findById(Long id);

}
