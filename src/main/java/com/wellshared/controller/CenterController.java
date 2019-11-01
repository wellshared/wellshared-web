package com.wellshared.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wellshared.model.Center;
import com.wellshared.model.Image;
import com.wellshared.model.Location;
import com.wellshared.model.Service;
import com.wellshared.model.dto.CenterDto;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.LocationRepository;
import com.wellshared.service.ImageService;

@RestController
@RequestMapping("api/center")
public class CenterController {
	@Autowired
	private CenterRepository centerRepository;
	@Autowired
	private ImageService imageService;
	@Autowired
	private LocationRepository locationRepository;

	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getCenters() {
		List<CenterDto> centers = new ArrayList<>();
		List<Center> centerJpa = this.centerRepository.findAll();
		CenterDto centerDto;
		for (Center center : centerJpa) {
			centerDto = new CenterDto();
			centerDto.populate(center);
			centers.add(centerDto);
		}
		return ResponseEntity.ok(centers);
    }
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCenterById(@PathVariable Long id) {
		CenterDto centerDto = new CenterDto();
		centerDto.populate(this.centerRepository.findById(id).get());
		return ResponseEntity.ok(centerDto);
    }
	
	@RequestMapping(path = "/", method = RequestMethod.POST)
    public ResponseEntity<Object> getCenterById(@RequestBody CenterDto center) {
		this.centerRepository.save(center.populateEntity());
		return ResponseEntity.ok("Centro guardado correctamente");
    }
	
	@RequestMapping(path = "/img/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> loadImg(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
		Center center = this.centerRepository.findById(id).get();
		try {
			Image image = this.imageService.saveImage(file, center);
			center.getImages().add(image);			
			centerRepository.save(center);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return ResponseEntity.ok("Centro guardado correctamente");
    }
	
	@RequestMapping(path = "/location/{locationId}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCentersByLocation(@PathVariable Long locationId) {
		Optional<Location> location = locationRepository.findById(locationId);
		if(location.isPresent()) {
			List<CenterDto> centers = new ArrayList<>();
			List<Center> centerJpa = this.centerRepository.findAllByLocation(location.get());
			CenterDto centerDto;
			for (Center center : centerJpa) {
				centerDto = new CenterDto();
				centerDto.populate(center);
				centers.add(centerDto);
			}
			return ResponseEntity.ok(centers);
		} else {
			return new ResponseEntity<Object>("La localidad introducida no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCenter(@PathVariable Long id) {
		Optional<Center> center = centerRepository.findById(id);
		if(center.isPresent()) {
			center.get().getServices().removeAll(center.get().getServices());
			centerRepository.delete(id);
			return ResponseEntity.ok("Centro eliminado correctamente");
		} else {
			return new ResponseEntity<Object>("El centro indicado no existe", HttpStatus.BAD_REQUEST);
		}
    }
	
}
