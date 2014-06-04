package com.winjune.wips.manager.navigation.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "navigator_data")
public class NodePair implements IEntity, Serializable {		
	/**
	 * 
	 */
	private static final long serialVersionUID = 2634483520339281922L;
	
	private int id;
	private int fromNode;
	private int toNode;
	private float distance;
	private String guideInfo;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "from_node")
	public int getFromNode() {
		return fromNode;
	}

	public void setFromNode(int fromNode) {
		this.fromNode = fromNode;
	}

	@Column(name = "to_node")
	public int getToNode() {
		return toNode;
	}

	public void setToNode(int toNode) {
		this.toNode = toNode;
	}

	@Column(name = "distance")
	public float getDistance() {
		return distance;
	}

	public void setDistance(float distance) {
		this.distance = distance;
	}

	@Column(name = "guide_info")
	public String getGuideInfo() {
		return guideInfo;
	}

	public void setGuideInfo(String guideInfo) {
		this.guideInfo = guideInfo;
	}


}
