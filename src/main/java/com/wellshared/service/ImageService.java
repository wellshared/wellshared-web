package com.wellshared.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wellshared.model.Center;
import com.wellshared.model.Image;
import com.wellshared.repository.ImageRepository;

@Service
public class ImageService {
	private final static String FILE_DIRECTORY = "frontend/src/assets/imgs/centros";
	
	@Autowired
	private ImageRepository imageRepository;
	
	public Image saveImage(MultipartFile file, Center center) throws Exception{
		Image image;
		try {
			Path filePath = Paths.get(FILE_DIRECTORY + "/" + center.getId() + "/" + file.getOriginalFilename());
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
			image = new Image(center, file.getOriginalFilename(), filePath.getFileName().toString());
			imageRepository.save(image);
		} catch(Exception e) {
			throw new Exception("No se ha encontrado la ruta del fichero");
		}
		return image;
	}
}
