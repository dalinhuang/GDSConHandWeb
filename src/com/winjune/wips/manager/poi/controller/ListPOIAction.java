package com.winjune.wips.manager.poi.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.poi.model.entity.POI;

public class ListPOIAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124062164557675609L;
	

	private List<POI> pois;
	
	public String input() throws Exception {
		return SUCCESS;
	}
	
	/**
	 * Load all maps
	 * 
	 * @return
	 * @throws Exception
	 */
	public String load() throws Exception {
		LookupRepositoryHibernate<POI, Integer> buildingRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);
		// Convert List of roles to Positions
		pois = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<POI> getData() {
		return this.pois;
	}
}
