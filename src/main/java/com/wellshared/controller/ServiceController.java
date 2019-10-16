package com.wellshared.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.repository.ServiceRepository;

@RestController
@RequestMapping("api/service")
public class ServiceController {
	
	@Autowired
	private ServiceRepository serviceRepository;
	
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getCenters() {
		return ResponseEntity.ok(this.serviceRepository.findAll());
    }

}
