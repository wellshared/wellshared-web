package com.wellshared.model.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.wellshared.model.Center;
import com.wellshared.model.Image;
import com.wellshared.model.Location;
import com.wellshared.model.Service;

public class CenterDto {
	private Long id;
	private String name;
	private List<ImageDto> images;
	private Location location;
	private List<Service> services;
	private String adress;
	private String description;
	private String description2;
	private String phone;
	private String email;	
	private String mainImage;
	private String price;
	private String lat;
	private String lon;
	private Byte individual;
	private Byte activities;
	private String url;
	
	public CenterDto() {}
	
	public void populate(Center center) {
		this.setId(center.getId());
		this.setName(center.getName());
		this.setImages(new ArrayList<ImageDto>());
		ImageDto imageDto;
		for (Image image : center.getImages()) {
			imageDto = new ImageDto();
			imageDto.populate(image);
			this.getImages().add(imageDto);
		}
		this.setLocation(center.getLocation());
		this.setServices(center.getServices());
		this.setAdress(center.getAdress());
		this.setDescription(center.getDescription());
		this.setDescription2(center.getDescription2());
		this.setPhone(center.getPhone());
		this.setMainImage(center.getMainImage());
		this.setPrice(center.getPrice());
		this.setLat(center.getLat());
		this.setLon(center.getLon());
		this.setEmail(center.getEmail());
		this.setIndividual(center.getIndividual());
		this.setActivities(center.getActivities());
		this.setUrl(center.getUrl());
	}
	
	public Center populateEntity() {
		Center center = new Center();
		center.setId(this.getId());
		center.setName(this.getName());
		center.setLocation(this.getLocation());
		center.setServices(this.getServices());
		center.setAdress(this.getAdress());
		center.setDescription(this.getDescription());
		center.setDescription2(this.getDescription2());
		center.setPhone(this.getPhone());
		center.setMainImage(this.getMainImage());
		center.setPrice(this.getPrice());
		center.setLat(this.getLat());
		center.setLon(this.getLon());
		center.setEmail(this.getEmail());
		center.setIndividual(this.getIndividual());
		center.setActivities(this.getActivities());
		center.setUrl(this.getUrl());
		center.setImages(new HashSet<Image>());
		for (ImageDto imageDto : this.getImages()) {
			center.getImages().add(imageDto.populateEntity(center));
		}
		center.setServices(this.getServices());
		return center;
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
	public List<ImageDto> getImages() {
		return images;
	}
	public void setImages(List<ImageDto> images) {
		this.images = images;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public List<Service> getServices() {
		return services;
	}
	public void setServices(List<Service> services) {
		this.services = services;
	}
	public String getAdress() {
		return adress;
	}
	public void setAdress(String adress) {
		this.adress = adress;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDescription2() {
		return description2;
	}
	public void setDescription2(String description2) {
		this.description2 = description2;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getMainImage() {
		return mainImage;
	}
	public void setMainImage(String mainImage) {
		this.mainImage = mainImage;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}
	public Byte getIndividual() {
		return individual;
	}
	public void setIndividual(Byte individual) {
		this.individual = individual;
	}
	public Byte getActivities() {
		return activities;
	}
	public void setActivities(Byte activities) {
		this.activities = activities;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
