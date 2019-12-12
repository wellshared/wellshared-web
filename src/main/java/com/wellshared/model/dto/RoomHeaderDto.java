package com.wellshared.model.dto;

import java.util.Date;

public class RoomHeaderDto {
	
	private Date dayFrom;
	private Date dayTo;
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
	
}
