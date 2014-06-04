package com.winjune.wips.manager.emergency.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "news")
public class NormalNotice implements IEntity, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7709271422038984376L;
	
	private int id;
	private int position;
	private String message;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "position_id")
	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	@Column(name = "message")
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	

}
