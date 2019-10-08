package com.wellshared.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.repository.LocationRepository;

@RestController
@RequestMapping("api/locations")
public class LocationController {
	
	@Autowired
	private LocationRepository locationRepository;
	
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getLocations() {
		return ResponseEntity.ok(this.locationRepository.findAll());
    }
}
