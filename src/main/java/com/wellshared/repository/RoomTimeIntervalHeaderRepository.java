package com.wellshared.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellshared.model.RoomTimeIntervalHeader;

public interface RoomTimeIntervalHeaderRepository extends JpaRepository<RoomTimeIntervalHeader, Long>{

	@Query(value="select * from room_time_interval_header " + 
			" where center_id = ?1 " + 
			" and (" + 
			" (day_from > ?2" + 
			" and day_from < ?3 " + 
			" ) or " + 
			" (day_To > ?2 " + 
			" and day_To < ?3)) limit 1 ", nativeQuery = true)
	Optional<RoomTimeIntervalHeader> findByCenterAndTimeInterval(Long centerId, Date dateFrom, Date dateTo);
	
	@Query(value="select * from room_time_interval_header where center_id = ?1 ", nativeQuery = true)
	List<RoomTimeIntervalHeader> findAllByCenter(Long centerId);
	
}
