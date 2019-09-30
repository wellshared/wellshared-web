package com.wellshared.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.model.Center;
import com.wellshared.model.Location;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.LocationRepository;

@RestController
@RequestMapping("api/center")
public class CenterController {
	@Autowired
	private CenterRepository centerRepository;
	@Autowired
	private LocationRepository locationRepository;

	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getCenters() {
		return ResponseEntity.ok(this.centerRepository.findAll());
    }
	
	@RequestMapping(path = "/{locationId}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCentersByLocation(@RequestParam() Long locationId) {
		Optional<Location> location = locationRepository.findById(locationId);
		if(location.isPresent()) {
			return ResponseEntity.ok(this.centerRepository.findAllByLocation(location.get()));
		} else {
			return new ResponseEntity<Object>("La localidad introducida no existe", HttpStatus.BAD_REQUEST);
		}
    }

}
