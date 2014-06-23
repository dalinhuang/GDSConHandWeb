package com.winjune.wips.manager.navipath.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "navi_path")
public class NaviPath implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8788882000927313723L;

	private int id;
	
	private int fromNode;
	
	private int toNode;
	private int direction;
	
	private String forwardGuide;
	private String backwardGuide;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "fromNode")
	public int getFromNode() {
		return fromNode;
	}

	public void setFromNode(int fromNode) {
		this.fromNode = fromNode;
	}

	@Column(name = "toNode")
	public int getToNode() {
		return toNode;
	}

	public void setToNode(int toNode) {
		this.toNode = toNode;
	}

	@Column(name = "direction")
	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	@Column(name = "forwardGuide")
	public String getForwardGuide() {
		return forwardGuide;
	}

	public void setForwardGuide(String forwardGuide) {
		this.forwardGuide = forwardGuide;
	}

	@Column(name = "backwardGuide")
	public String getBackwardGuide() {
		return backwardGuide;
	}

	public void setBackwardGuide(String backwardGuide) {
		this.backwardGuide = backwardGuide;
	}

}
