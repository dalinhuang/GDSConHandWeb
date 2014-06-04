package com.winjune.wips.manager.map.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.map.model.entity.Position;

public class ListPositionAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124062164557675609L;
	

	private List<Position> positions;
	
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
		LookupRepositoryHibernate<Position, Integer> buildingRepository = new LookupRepositoryHibernate<Position, Integer>(
				Position.class);
		// Convert List of roles to Positions
		positions = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Position> getData() {
		return this.positions;
	}
}
