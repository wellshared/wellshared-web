package com.wellshared.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellshared.model.Book;
import com.wellshared.model.Center;

public interface BookRepository extends JpaRepository<Book, Long>{
	List<Book> findAllByCenter(Center center);
	
	Optional<Book> findByDateAndTimeFrom(String date, String timeFrom);

	@Query(value = "select * from book " + 
			"where center_id = ?1 " + 
			"and date = ?2 " + 
			"and SUBSTR(?3, 1, 2) between SUBSTR(time_from, 1, 2) " +
			"and SUBSTR(time_to, 1, 2) ", nativeQuery = true)
	Optional<Book> findByDateAndCenterAndTimeFrom(Long centerId, String date, String timeFrom);
}
