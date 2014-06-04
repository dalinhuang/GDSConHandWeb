package com.winjune.wips.manager.map.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "position")
public class Position implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2464852900091673601L;

	private int id;
	private int mapId;
	private int colId;
	private int rowId;
	private String title;
	private String description;
	private float titleRotation;
	private float titleAlpha;
	private float titleScale;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "map_id")
	public int getMapId() {
		return mapId;
	}

	public void setMapId(int mapId) {
		this.mapId = mapId;
	}

	@Column(name = "row_id")
	public int getRowId() {
		return rowId;
	}

	public void setRowId(int rowId) {
		this.rowId = rowId;
	}

	@Column(name = "col_id")
	public int getColId() {
		return colId;
	}

	public void setColId(int colId) {
		this.colId = colId;
	}

	@Column(name = "title")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "title_rotation")
	public float getTitleRotation() {
		return titleRotation;
	}

	public void setTitleRotation(float titleRotation) {
		this.titleRotation = titleRotation;
	}

	@Column(name = "title_alpha")
	public float getTitleAlpha() {
		return titleAlpha;
	}

	public void setTitleAlpha(float titleAlpha) {
		this.titleAlpha = titleAlpha;
	}

	@Column(name = "title_scale")
	public float getTitleScale() {
		return titleScale;
	}

	public void setTitleScale(float titleScale) {
		this.titleScale = titleScale;
	}

}
