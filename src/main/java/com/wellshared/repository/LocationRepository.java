package com.wellshared.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

	Optional<Location> findById(Long locationId);

}
