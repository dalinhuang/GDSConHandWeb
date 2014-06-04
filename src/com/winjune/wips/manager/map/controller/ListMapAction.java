package com.winjune.wips.manager.map.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.map.model.entity.Map;

public class ListMapAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3521344041371747591L;

	private List<Map> maps;
	

	/**
	 * Load all maps
	 * 
	 * @return
	 * @throws Exception
	 */
	public String load() throws Exception {
		LookupRepositoryHibernate<Map, Integer> mapRepository = new LookupRepositoryHibernate<Map, Integer>(
				Map.class);
		// Convert List of roles to Map
		maps = mapRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Map> getData() {
		return this.maps;
	}
}
