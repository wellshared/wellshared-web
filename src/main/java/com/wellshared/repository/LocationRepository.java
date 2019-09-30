package com.wellshared.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

}
