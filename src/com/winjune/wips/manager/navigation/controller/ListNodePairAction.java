package com.winjune.wips.manager.navigation.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.navigation.model.entity.NodePair;

public class ListNodePairAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2581380385758775949L;
	
	private List<NodePair> pairs;
	
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
		LookupRepositoryHibernate<NodePair, Integer> buildingRepository = new LookupRepositoryHibernate<NodePair, Integer>(
				NodePair.class);
		// Convert List of pairs to Pairs
		pairs = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<NodePair> getData() {
		return this.pairs;
	}
}
