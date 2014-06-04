package com.winjune.wips.manager.map.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.map.model.entity.Building;

public class ListBuildingAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124062164557675609L;
	

	private List<Building> buildings;
	
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
		LookupRepositoryHibernate<Building, Integer> buildingRepository = new LookupRepositoryHibernate<Building, Integer>(
				Building.class);
		// Convert List of roles to Building
		buildings = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Building> getData() {
		return this.buildings;
	}
}
