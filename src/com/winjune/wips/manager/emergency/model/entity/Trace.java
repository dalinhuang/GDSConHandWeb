package com.winjune.wips.manager.emergency.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "traces")
public class Trace implements IEntity, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 291172876268324548L;
	
	private int id;
	private String mac;
	private int position;
	private Timestamp time;
	private String from;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "device_mac")
	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	@Column(name = "position_id")
	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	@Column(name = "time")
	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	@Column(name = "from_signal")
	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

}
