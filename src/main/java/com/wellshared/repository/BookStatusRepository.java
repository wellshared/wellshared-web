package com.wellshared.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.BookStatus;

public interface BookStatusRepository extends JpaRepository<BookStatus, Long>{
	
}
