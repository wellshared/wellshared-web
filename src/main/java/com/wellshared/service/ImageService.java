package com.wellshared.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.wellshared.model.Center;
import com.wellshared.model.Image;
import com.wellshared.repository.ImageRepository;

@Service
public class ImageService {
	@Autowired
	private ImageRepository imageRepository;

	public Image saveImage(MultipartFile file, Center center) throws Exception {
		Image image;
		try {
			image = new Image(center, file.getOriginalFilename(), file.getOriginalFilename());
			imageRepository.save(image);
			this.uploadImage(file, center);
		} catch (Exception e) {
			throw new Exception("No se ha encontrado la ruta del fichero");
		}
		return image;
	}

	public void uploadImage(MultipartFile file, Center center) {
		try {
			AWSCredentials credentials = new BasicAWSCredentials("AKIATJDKBTMDO7GETMJA", "zNQs+22yjpFQPZvKBFrijfLDxQBvhUIL0jdR251X");
			AmazonS3 s3client = AmazonS3ClientBuilder.standard()
					.withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(Regions.EU_WEST_3)
					.build();
			String bucketName = "wellshared-assets";

			// Upload a file as a new object with ContentType and title specified.
			PutObjectRequest request = new PutObjectRequest(bucketName, "centers/"+center.getId()+"/"+file.getOriginalFilename(),
					this.convert(file));
			s3client.putObject(request);
		} catch (AmazonServiceException e) {
			// The call was transmitted successfully, but Amazon S3 couldn't process
			// it, so it returned an error response.
			e.printStackTrace();
		} catch (Exception e) {
			// Amazon S3 couldn't be contacted for a response, or the client
			// couldn't parse the response from Amazon S3.
			e.printStackTrace();
		}
	}

	public File convert(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		if(convFile.exists()) {
			convFile.delete();
		}
		try (InputStream is = file.getInputStream()) {
			Files.copy(is, convFile.toPath());
		}
		return convFile;
	}
}