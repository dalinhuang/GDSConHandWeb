package com.winjune.wips.manager.navigation.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "navigator_neighbor_maps")
public class Neighbor implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4524624721681022386L;
	
	private int id;
	private int fromMap;
	private int toMap;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "from_map")
	public int getFromMap() {
		return fromMap;
	}

	public void setFromMap(int fromMap) {
		this.fromMap = fromMap;
	}

	@Column(name = "to_map")
	public int getToMap() {
		return toMap;
	}

	public void setToMap(int toMap) {
		this.toMap = toMap;
	}

}
