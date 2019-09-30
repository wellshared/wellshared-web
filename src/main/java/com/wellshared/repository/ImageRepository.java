package com.wellshared.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long>{

}
