package com.wellshared.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long>{

}
