package com.winjune.wips.manager.system.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "role_resource")
public class RoleResource implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5145707090898357355L;

	private int id;
	private int roleId;
	private int resourceId;
	private Timestamp lastUpdate;

	@Id
	@GeneratedValue
	@Column(name = "role_resource_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "role_id")
	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	@Column(name = "resource_id")
	public int getResourceId() {
		return resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}

	@Column(name = "last_update")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
}
