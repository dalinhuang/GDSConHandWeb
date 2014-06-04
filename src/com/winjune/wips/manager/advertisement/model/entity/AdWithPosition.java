package com.winjune.wips.manager.advertisement.model.entity;

import java.io.Serializable;
import java.util.List;

import com.winjune.wips.manager.common.entity.IEntity;

public class AdWithPosition implements IEntity, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7417647098661392426L;

	private Ad ad;
	private List<Object> positions;

	public Ad getAd() {
		return ad;
	}

	public void setAd(Ad ad) {
		this.ad = ad;
	}

	public List<Object> getPositions() {
		return positions;
	}

	public void setPositions(List<Object> positions) {
		this.positions = positions;
	}

}
