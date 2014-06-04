package com.winjune.wips.manager.advertisement.model;

import java.util.Date;

public class AdRow implements IRow {
	private String thumbnailImgUrl;
	private String positions;
	private String url;
	private int duration;
	private Date fromDate;
	private Date toDate;

	public String getThumbnailImgUrl() {
		return thumbnailImgUrl;
	}

	public void setThumbnailImgUrl(String thumbnailImgUrl) {
		this.thumbnailImgUrl = thumbnailImgUrl;
	}

	public String getPositions() {
		return positions;
	}

	public void setPositions(String positions) {
		this.positions = positions;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

}
