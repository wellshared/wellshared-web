package com.wellshared.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	
}
