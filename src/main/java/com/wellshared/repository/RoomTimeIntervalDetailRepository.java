package com.wellshared.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellshared.model.RoomTimeIntervalDetail;

public interface RoomTimeIntervalDetailRepository extends JpaRepository<RoomTimeIntervalDetail, Long>{
	
	@Query(value="select * from room_time_interval_detail where room_time_interval_detail_id = ?1 ", nativeQuery = true)
	List<RoomTimeIntervalDetail> findAllByHeader(Long id);
	
}
