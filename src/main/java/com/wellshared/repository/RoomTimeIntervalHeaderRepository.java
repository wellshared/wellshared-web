package com.wellshared.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellshared.model.RoomTimeIntervalDetail;
import com.wellshared.model.RoomTimeIntervalHeader;

public interface RoomTimeIntervalHeaderRepository extends JpaRepository<RoomTimeIntervalHeader, Long>{

	Optional<RoomTimeIntervalDetail> findByCenterIdAndDayOfWeek(Long centerId, int dayOfWeek);
	
}
