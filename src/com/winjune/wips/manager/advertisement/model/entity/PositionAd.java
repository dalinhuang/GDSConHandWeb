package com.winjune.wips.manager.advertisement.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "position_ad")
public class PositionAd implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -649148908972032548L;

	private int id;
	private int positionId;
	private int adId;
	private Timestamp lastUpdate;

	@Id
	@GeneratedValue
	@Column(name = "position_ad_id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "position_id")
	public int getPositionId() {
		return positionId;
	}

	public void setPositionId(int positionId) {
		this.positionId = positionId;
	}

	@Column(name = "ad_id")
	public int getAdId() {
		return adId;
	}

	public void setAdId(int adId) {
		this.adId = adId;
	}

	@Column(name = "last_update")
	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

}
