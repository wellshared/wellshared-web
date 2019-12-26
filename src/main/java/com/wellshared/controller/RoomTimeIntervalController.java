package com.wellshared.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.model.Center;
import com.wellshared.model.RoomTimeIntervalDetail;
import com.wellshared.model.RoomTimeIntervalHeader;
import com.wellshared.model.dto.RoomDetailDto;
import com.wellshared.model.dto.RoomHeaderDto;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.RoomTimeIntervalDetailRepository;
import com.wellshared.repository.RoomTimeIntervalHeaderRepository;

@RestController
@RequestMapping("api/intervals")
public class RoomTimeIntervalController {
	@Autowired
	private CenterRepository centerRepository;
	@Autowired
	private RoomTimeIntervalHeaderRepository roomTimeIntervalHeaderRepository;
	@Autowired
	private RoomTimeIntervalDetailRepository roomTimeIntervalDetailRepository;
	
	@RequestMapping(path = "/center/{centerId}", method = RequestMethod.GET)
    public ResponseEntity<Object> findAllByCenter(@PathVariable Long centerId) {
		Optional<Center> center = centerRepository.findById(centerId);
		if(center.isPresent()) {
			List<RoomTimeIntervalHeader> list = this.roomTimeIntervalHeaderRepository.findAllByCenter(centerId);
			return ResponseEntity.ok(list);
		} else {
			return new ResponseEntity<Object>("El centro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
	@RequestMapping(path = "/center/{centerId}", method = RequestMethod.POST)
    public ResponseEntity<Object> addIntervalHeader(@PathVariable Long centerId, @RequestBody RoomHeaderDto headerDto) {
		Center center = centerRepository.findOne(centerId);
		if(center != null) {
			Optional<RoomTimeIntervalHeader> h = roomTimeIntervalHeaderRepository.findByCenterAndTimeInterval(centerId, headerDto.getDayFrom(), headerDto.getDayTo());
			if(!h.isPresent()){
				RoomTimeIntervalHeader header = new RoomTimeIntervalHeader();
				header.setActive(new Byte("1"));
				header.setCenter(center);
				header.setDayFrom(headerDto.getDayFrom());
				header.setDayTo(headerDto.getDayTo());
				roomTimeIntervalHeaderRepository.save(header);
				return ResponseEntity.ok("Header guardado correctamente");
			} else {
				return new ResponseEntity<Object>("Ya existe una franja en esas fechas", HttpStatus.NOT_ACCEPTABLE);
			}
			
		} else {
			return new ResponseEntity<Object>("El centro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
	@RequestMapping(path = "/{headerId}/detail", method = RequestMethod.POST)
    public ResponseEntity<Object> addIntervalDetail(@PathVariable Long headerId, @RequestBody RoomDetailDto detailDto) {
		RoomTimeIntervalHeader header = roomTimeIntervalHeaderRepository.findOne(headerId);
		if(header != null) {
			Optional<RoomTimeIntervalDetail> d = roomTimeIntervalDetailRepository.findByHeaderAndInterval(headerId, detailDto.getTimeFrom(), detailDto.getTimeTo());
			if(!d.isPresent()) {
				RoomTimeIntervalDetail detail = new RoomTimeIntervalDetail();
				detail.setActive(new Byte("1"));
				detail.setRoomTimeIntervalHeader(header);
				detail.setTimeFrom(detailDto.getTimeFrom());
				detail.setTimeTo(detailDto.getTimeTo());
				roomTimeIntervalDetailRepository.save(detail);
				return ResponseEntity.ok("Detalle guardado correctamente");
			} else {
				return new ResponseEntity<Object>("Ya existe un detalle con esas franjas", HttpStatus.NOT_ACCEPTABLE);
			}
			
		} else {
			return new ResponseEntity<Object>("El registro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
	@RequestMapping(path = "/{headerId}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeIntervalHeader(@PathVariable Long headerId) {
		RoomTimeIntervalHeader header = roomTimeIntervalHeaderRepository.findOne(headerId);
		if(header != null) {
			List<RoomTimeIntervalDetail> list = roomTimeIntervalDetailRepository.findAllByHeader(headerId);
			for (RoomTimeIntervalDetail detail : list) {
				roomTimeIntervalDetailRepository.delete(detail);
			}
			roomTimeIntervalHeaderRepository.delete(headerId);
			return ResponseEntity.ok("Registro eliminado correctamente");
		} else {
			return new ResponseEntity<Object>("El registro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
	@RequestMapping(path = "/detail/{detailId}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeIntervalDetail(@PathVariable Long detailId) {
		RoomTimeIntervalDetail header = roomTimeIntervalDetailRepository.findOne(detailId);
		if(header != null) {
			roomTimeIntervalDetailRepository.delete(detailId);
			return ResponseEntity.ok("Registro eliminado correctamente");
		} else {
			return new ResponseEntity<Object>("El registro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
}
