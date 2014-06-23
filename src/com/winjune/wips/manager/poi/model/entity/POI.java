package com.winjune.wips.manager.poi.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.winjune.wips.manager.common.entity.IEntity;

@Entity
@Table(name = "poi")
public class POI implements IEntity, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4048324127874735371L;
	
	private int id;
	
	private int type;
	
	private int hallId;
	
	private int ttsNo;
	
	private int mapId;
	
	private int placeX;
	private int placeY;
	private int neareastNaviNode;

	private String 	iconUrl;
	private String 	audioUrl;
	private String 	webUrl;	
	private String  picUrl;
	
	
	private String label;
	private String generalDesc;
	private String detailedDesc;
	
		
	
	private boolean shareble;
	private boolean reachable;
	private boolean readable;
	
	private float scale;
	private float alpha;
	private float rotation;
	private float minZoomFactor;
	private float maxZoomFactor;

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "type")
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Column(name = "hallId")
	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	@Column(name = "ttsNo")
	public int getTtsNo() {
		return ttsNo;
	}

	public void setTtsNo(int ttsNo) {
		this.ttsNo = ttsNo;
	}

	@Column(name = "mapId")
	public int getMapId() {
		return mapId;
	}

	public void setMapId(int mapId) {
		this.mapId = mapId;
	}

	@Column(name = "placeX")
	public int getPlaceX() {
		return placeX;
	}

	public void setPlaceX(int placeX) {
		this.placeX = placeX;
	}

	@Column(name = "placeY")
	public int getPlaceY() {
		return placeY;
	}

	public void setPlaceY(int placeY) {
		this.placeY = placeY;
	}

	@Column(name = "neareastNaviNode")
	public int getNeareastNaviNode() {
		return neareastNaviNode;
	}

	public void setNeareastNaviNode(int neareastNaviNode) {
		this.neareastNaviNode = neareastNaviNode;
	}

	@Column(name = "iconUrl")
	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	@Column(name = "audioUrl")
	public String getAudioUrl() {
		return audioUrl;
	}

	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}

	@Column(name = "webUrl")
	public String getWebUrl() {
		return webUrl;
	}

	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}

	@Column(name = "picUrl")
	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	@Column(name = "label")
	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	@Column(name = "generalDesc")
	public String getGeneralDesc() {
		return generalDesc;
	}

	public void setGeneralDesc(String generalDesc) {
		this.generalDesc = generalDesc;
	}

	@Column(name = "detailedDesc")
	public String getDetailedDesc() {
		return detailedDesc;
	}

	public void setDetailedDesc(String detailedDesc) {
		this.detailedDesc = detailedDesc;
	}

	@Column(name = "shareble")
	public boolean getShareble() {
		return shareble;
	}

	public void setShareble(boolean shareble) {
		this.shareble = shareble;
	}

	@Column(name = "reachable")
	public boolean getReachable() {
		return reachable;
	}

	public void setReachable(boolean reachable) {
		this.reachable = reachable;
	}

	@Column(name = "readable")
	public boolean getReadable() {
		return readable;
	}

	public void setReadable(boolean readable) {
		this.readable = readable;
	}

	@Column(name = "scale")
	public float getScale() {
		return scale;
	}

	public void setScale(float scale) {
		this.scale = scale;
	}

	@Column(name = "alpha")
	public float getAlpha() {
		return alpha;
	}

	public void setAlpha(float alpha) {
		this.alpha = alpha;
	}

	@Column(name = "rotation")
	public float getRotation() {
		return rotation;
	}

	public void setRotation(float rotation) {
		this.rotation = rotation;
	}

	@Column(name = "minZoomFactor")
	public float getMinZoomFactor() {
		return minZoomFactor;
	}

	public void setMinZoomFactor(float minZoomFactor) {
		this.minZoomFactor = minZoomFactor;
	}

	@Column(name = "maxZoomFactor")
	public float getMaxZoomFactor() {
		return maxZoomFactor;
	}

	public void setMaxZoomFactor(float maxZoomFactor) {
		this.maxZoomFactor = maxZoomFactor;
	}


}
