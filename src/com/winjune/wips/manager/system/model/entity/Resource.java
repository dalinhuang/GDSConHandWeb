package com.winjune.wips.manager.system.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "resource")
public class Resource implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8091601657720783272L;

	private int id;
	private String resourceName;
	private String resourceType;
	private String resourceString;
	private int priority;
	private String description;
	private Timestamp lastUpdate;

	@Id
	@GeneratedValue
	@Column(name = "resource_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "resource_name")
	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	@Column(name = "resource_type")
	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	@Column(name = "resource_string")
	public String getResourceString() {
		return resourceString;
	}

	public void setResourceString(String resourceString) {
		this.resourceString = resourceString;
	}

	@Column(name = "priority")
	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "last_update")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
}
