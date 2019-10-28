package com.wellshared.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wellshared.model.Center;
import com.wellshared.model.Image;
import com.wellshared.repository.ImageRepository;

@Service
public class ImageService {
	@Autowired
	private ImageRepository imageRepository;
	
	public Image saveImage(MultipartFile file, Center center) throws Exception{
		Image image;
		try {
			image = new Image(center, file.getOriginalFilename(), file.getBytes());
			imageRepository.save(image);
		} catch(Exception e) {
			throw new Exception("No se ha encontrado la ruta del fichero");
		}
		return image;
	}
}
