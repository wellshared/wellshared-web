package com.wellshared.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.RoomTimeIntervalDetail;
import com.wellshared.model.RoomTimeIntervalHeader;

public interface RoomTimeIntervalDetailRepository extends JpaRepository<RoomTimeIntervalDetail, Long>{
	
	List<RoomTimeIntervalDetail> findAllByRoomTimeIntervalHeader(RoomTimeIntervalHeader roomTimeIntervalHeader);
	
}
