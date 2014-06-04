package com.winjune.wips.manager.navigation.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.navigation.model.entity.Node;

public class ListNodeAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8065088437609088786L;
	
	private List<Node> nodes;
	
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
		LookupRepositoryHibernate<Node, Integer> buildingRepository = new LookupRepositoryHibernate<Node, Integer>(
				Node.class);
		// Convert List of nodes to Nodes
		nodes = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Node> getData() {
		return this.nodes;
	}
}
