package com.winjune.wips.manager.navigation.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "navigator_nodes")
public class Node implements IEntity, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3098950932290248546L;
	
	private int id;
	private int mapId;
	private int colId;
	private int rowId;
	private String name;

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

	@Column(name = "col_id")
	public int getColId() {
		return colId;
	}

	public void setColId(int colId) {
		this.colId = colId;
	}

	@Column(name = "row_id")
	public int getRowId() {
		return rowId;
	}

	public void setRowId(int rowId) {
		this.rowId = rowId;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


}
