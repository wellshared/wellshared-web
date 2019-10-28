package com.wellshared.model.dto;

import com.wellshared.model.Center;
import com.wellshared.model.Image;

public class ImageDto {
	private Long id;
	private String name;
	private byte[] bytes;
	private Long centerId;

	public void populate(Image image) {
		this.setId(image.getId());
		this.setName(image.getName());
		this.setBytes(image.getBytes());
		this.setCenterId(image.getCenter().getId());
	}
	
	public Image populateEntity(Center center) {
		Image image = new Image();
		image.setId(this.getId());
		image.setName(this.getName());
		image.setBytes(this.getBytes());
		image.setCenter(center);
		return image;
	}
	
	public ImageDto() {
		super();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public byte[] getBytes() {
		return bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}

	public Long getCenterId() {
		return centerId;
	}

	public void setCenterId(Long centerId) {
		this.centerId = centerId;
	}
	
}
