package com.wellshared.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellshared.model.RoomTimeIntervalDetail;

public interface RoomTimeIntervalDetailRepository extends JpaRepository<RoomTimeIntervalDetail, Long>{
	
	@Query(value="select * from room_time_interval_detail where room_time_interval_header_id = ?1 ", nativeQuery = true)
	List<RoomTimeIntervalDetail> findAllByHeader(Long id);
	
	@Query(value = "select id.* from center c " + 
			"inner join room_time_interval_header ih on (c.id = ih.center_id) " + 
			"inner join room_time_interval_detail id on (ih.id = id.room_time_interval_header_id) " + 
			"where c.id = ?1 " +
			"and ?2 between ih.day_from and ih.day_to " + 
			"and CAST(id.time_from As Time) <= CAST(?3 As Time) " + 
			"and CAST(id.time_to As Time) >= CAST(?4 As Time) " +
			"and ih.active = 1 and id.active = 1 ", nativeQuery = true)
	Optional<RoomTimeIntervalDetail> findFreeByDateAndCenterAndTimeFrom(Long centerId, Date date, String timeFrom, String timeTo);
	
	@Query(value = "select id.* from room_time_interval_detail id  " + 
			" inner join room_time_interval_header ih on (ih.id = id.room_time_interval_header_id)  " + 
			" where ih.id = ?1 " + 
			" and (" + 
			"	(CAST(id.time_from As Time) > CAST(?2 As Time) and" + 
			"    CAST(id.time_from As Time) < CAST(?3 As Time)" + 
			"	) or" + 
			"    (CAST(id.time_to As Time) > CAST(?2 As Time) and" + 
			"    CAST(id.time_to As Time) < CAST(?3 As Time)" + 
			"	)" + 
			" )" + 
			" and ih.active = 1 and id.active = 1  ", nativeQuery = true)
	Optional<RoomTimeIntervalDetail> findByHeaderAndInterval(Long headerId, String timeFrom, String timeTo);
}
