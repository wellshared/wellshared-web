package com.wellshared.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="room_time_interval_detail")
public class RoomTimeIntervalDetail {
	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	@NotNull
	@JsonIgnore
	@JoinColumn(name="room_time_interval_header_id")
	private RoomTimeIntervalHeader roomTimeIntervalHeader;
	private String timeFrom;
	private String timeTo;
	private Byte active;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public RoomTimeIntervalHeader getRoomTimeIntervalHeader() {
		return roomTimeIntervalHeader;
	}
	public void setRoomTimeIntervalHeader(RoomTimeIntervalHeader roomTimeIntervalHeader) {
		this.roomTimeIntervalHeader = roomTimeIntervalHeader;
	}
	public String getTimeFrom() {
		return timeFrom;
	}
	public void setTimeFrom(String timeFrom) {
		this.timeFrom = timeFrom;
	}
	public String getTimeTo() {
		return timeTo;
	}
	public void setTimeTo(String timeTo) {
		this.timeTo = timeTo;
	}
	public Byte getActive() {
		return active;
	}
	public void setActive(Byte active) {
		this.active = active;
	}
	
}
