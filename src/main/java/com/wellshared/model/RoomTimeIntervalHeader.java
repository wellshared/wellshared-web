package com.wellshared.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="room_time_interval_header")
public class RoomTimeIntervalHeader {
	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	@NotNull
	@JsonIgnore
	@JoinColumn(name="center_id")
	private Center center;
	private Date dayFrom;
	private Date dayTo;
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "room_time_interval_header_id")
	private List<RoomTimeIntervalDetail> roomTimeIntervalDetails;
	private Byte active;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Center getCenter() {
		return center;
	}
	public void setCenter(Center center) {
		this.center = center;
	}
	public Date getDayFrom() {
		return dayFrom;
	}
	public void setDayFrom(Date dayFrom) {
		this.dayFrom = dayFrom;
	}
	public Date getDayTo() {
		return dayTo;
	}
	public void setDayTo(Date dayTo) {
		this.dayTo = dayTo;
	}
	public Byte getActive() {
		return active;
	}
	public void setActive(Byte active) {
		this.active = active;
	}
	public List<RoomTimeIntervalDetail> getRoomTimeIntervalDetails() {
		return roomTimeIntervalDetails;
	}
	public void setRoomTimeIntervalDetails(List<RoomTimeIntervalDetail> roomTimeIntervalDetails) {
		this.roomTimeIntervalDetails = roomTimeIntervalDetails;
	}
	
	
}
