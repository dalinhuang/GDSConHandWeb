package com.winjune.wips.manager.map.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "map")
public class Map implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8883693529452157000L;

	private int id;
	private String name;
	private String thumbnailImgUrl;
	private String largeImgUrl;
	private Timestamp lastUpdate;
	private int rows;
	private int columns;
	private int pixels;
	private String version;
	private int versionCode;
	private int generation;

	@Id
	@GeneratedValue
	@Column(name = "map_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	@Column(name = "edit_time")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	
	@Column(name = "rows")
	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	@Column(name = "columns")
	public int getColumns() {
		return columns;
	}

	public void setColumns(int columns) {
		this.columns = columns;
	}

	@Column(name = "cell_pixel")
	public int getPixels() {
		return pixels;
	}

	public void setPixels(int pixels) {
		this.pixels = pixels;
	}

	@Column(name = "version")
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name = "version_code")
	public int getVersionCode() {
		return versionCode;
	}

	public void setVersionCode(int versionCode) {
		this.versionCode = versionCode;
	}

	@Column(name = "generation")
	public int getGeneration() {
		return generation;
	}

	public void setGeneration(int generation) {
		this.generation = generation;
	}

}
