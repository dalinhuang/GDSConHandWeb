package com.winjune.wips.manager.map.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "building")
public class Building implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1630548923983266800L;
	

	private int id;
	private String category;
	private String name;
	private float latitude;
	private float longitude;
	private String maps;
	private int generation;

	@Id
	@GeneratedValue
	@Column(name = "id")
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

	@Column(name = "generation")
	public int getGeneration() {
		return generation;
	}

	public void setGeneration(int generation) {
		this.generation = generation;
	}

	@Column(name = "category")
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Column(name = "latitude")
	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	@Column(name = "longitude")
	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	@Column(name = "maps")
	public String getMaps() {
		return maps;
	}

	public void setMaps(String maps) {
		this.maps = maps;
	}

}
