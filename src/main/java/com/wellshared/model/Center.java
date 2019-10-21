package com.wellshared.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="center")
public class Center {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	@JsonIgnore
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER, mappedBy="center", orphanRemoval=true)
	private Set<Image> images;
	@ManyToOne
	@NotNull
	@JoinColumn(name="location_id")
	private Location location;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="center_service",
				joinColumns = @JoinColumn(name="center_id"),
				inverseJoinColumns = @JoinColumn(name="service_id"))
	private List<Service> services;
	private String adress;
	private String description;
	private String description2;
	private String phone;
	private String mainImage;
	private String price;
	private String lat;
	private String lon;
	private Byte individual;
	private Byte activities;	
	@Size(min = 3, max = 500)
	private String url;
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
	public Set<Image> getImages() {
		return images;
	}
	public void setImages(Set<Image> images) {
		this.images = images;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
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
	public void setMainImage(String imgStr) {
		this.mainImage = imgStr;
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
	public List<Service> getServices() {
		return services;
	}
	public void setServices(List<Service> services) {
		this.services = services;
	}

}
