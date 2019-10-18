package com.wellshared.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Book;
import com.wellshared.model.Center;

public interface BookRepository extends JpaRepository<Book, Long>{
	List<Book> findAllByCenter(Center center);
}
