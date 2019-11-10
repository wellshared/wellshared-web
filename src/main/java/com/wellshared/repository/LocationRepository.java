package com.wellshared.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellshared.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

	Optional<Location> findById(Long locationId);

	@Query(value = "select distinct l.* from location l " + 
			"inner join center c on (l.id = c.location_id) ", nativeQuery = true)
	List<Location> findAllWithCenters();
}
