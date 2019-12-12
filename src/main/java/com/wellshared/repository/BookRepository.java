package com.wellshared.repository;

import java.util.Date;
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
			"and CAST(time_from As Time) <= CAST(?3 As Time) " + 
			"and CAST(time_to As Time) >= CAST(?4 As Time) limit 1 ", nativeQuery = true)
	Optional<Book> findByDateAndCenterAndTimeFrom(Long centerId, Date date, String timeFrom, String timeTo);
}
