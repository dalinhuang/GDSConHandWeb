package com.winjune.wips.manager.navigation.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.navigation.model.entity.Neighbor;

public class ListNeighborAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4199166191518364820L;
	
	private List<Neighbor> neighbors;
	
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
		LookupRepositoryHibernate<Neighbor, Integer> buildingRepository = new LookupRepositoryHibernate<Neighbor, Integer>(
				Neighbor.class);
		// Convert List of neighbors to Neighbors
		neighbors = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Neighbor> getData() {
		return this.neighbors;
	}
}
