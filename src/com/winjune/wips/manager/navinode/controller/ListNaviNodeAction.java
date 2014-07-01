/*
 * $Id: SaveNaviNodeAction.java 1400220 2012-10-19 18:49:39Z jogep $
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.winjune.wips.manager.navinode.controller;


import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.navinode.model.entity.NaviNode;

public class ListNaviNodeAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124062164557675609L;
	

	private List<NaviNode> naviNodes;
	
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
		LookupRepositoryHibernate<NaviNode, Integer> buildingRepository = new LookupRepositoryHibernate<NaviNode, Integer>(
				NaviNode.class);
		// Convert List of roles to Positions
		naviNodes = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<NaviNode> getData() {
		return this.naviNodes;
	}
	
}
