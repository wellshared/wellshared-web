package com.wellshared.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.Book;
import com.wellshared.model.Center;

public interface BookRepository extends JpaRepository<Book, Long>{
	List<Book> findAllByCenter(Center center);
	
	Optional<Book> findByDateAndTimeFrom(String date, String timeFrom);

	Optional<Book> findByDateAndCenterAndTimeFrom(String date, Center center, String timeFrom);
}
