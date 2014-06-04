package com.winjune.wips.manager.advertisement.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "ad")
public class Ad implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4936424221724838520L;

	private int id;
	private String thumbnailImgUrl;
	private String largeImgUrl;
	private String thumbnailImgId;
	private String largeImgId;
	private String url;
	private int duration;
	private Date fromDate;
	private Date toDate;
	private Timestamp lastUpdate;

	@Id
	@GeneratedValue
	@Column(name = "ad_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "thumbnail_img_url")
	public String getThumbnailImgUrl() {
		return thumbnailImgUrl;
	}

	public void setThumbnailImgUrl(String thumbnailImgUrl) {
		this.thumbnailImgUrl = thumbnailImgUrl;
	}

	@Column(name = "large_img_url")
	public String getLargeImgUrl() {
		return largeImgUrl;
	}

	public void setLargeImgUrl(String largeImgUrl) {
		this.largeImgUrl = largeImgUrl;
	}

	@Column(name = "thumbnail_img_id")
	public String getThumbnailImgId() {
		return thumbnailImgId;
	}

	public void setThumbnailImgId(String thumbnailImgId) {
		this.thumbnailImgId = thumbnailImgId;
	}

	@Column(name = "large_img_id")
	public String getLargeImgId() {
		return largeImgId;
	}

	public void setLargeImgId(String largeImgId) {
		this.largeImgId = largeImgId;
	}

	@Column(name = "url")
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "duration")
	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	@Column(name = "from_date")
	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	@Column(name = "to_date")
	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	@Column(name = "last_update")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

}
