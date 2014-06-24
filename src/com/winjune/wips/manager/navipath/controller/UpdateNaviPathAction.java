/*
 * $Id: SaveNaviPathAction.java 1400220 2012-10-19 18:49:39Z jogep $
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
package com.winjune.wips.manager.navipath.controller;


import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.winjune.wips.manager.navipath.model.entity.NaviPath;
import com.winjune.wips.manager.navipath.model.entitymanager.NaviPathRepositoryHibernate;

public class UpdateNaviPathAction extends ActionSupport implements ModelDriven<NaviPath>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8530009984849824687L;
	private NaviPath naviPath = new NaviPath();

	public String input() throws Exception {

		NaviPath currentNaviPath = NaviPathRepositoryHibernate.findNaviPath(naviPath.getFromNode(),naviPath.getToNode());
		if (currentNaviPath != null)
		{
			if (naviPath.getDirection() == 3)
			{
				currentNaviPath.setDirection(2);
				currentNaviPath.setFromNode(naviPath.getToNode());
				currentNaviPath.setToNode(naviPath.getFromNode());		
			}
			else
			{
				currentNaviPath.setDirection(naviPath.getDirection());
				currentNaviPath.setFromNode(naviPath.getFromNode());
				currentNaviPath.setToNode(naviPath.getToNode());				
			}
			
			currentNaviPath.setBackwardGuide(naviPath.getBackwardGuide());
			currentNaviPath.setForwardGuide(naviPath.getForwardGuide());;
			NaviPathRepositoryHibernate.saveNaviPath(currentNaviPath);
		}

		return SUCCESS;
	}

	public NaviPath getNaviPath() {
		return naviPath;
	}

	public void setNaviNode(NaviPath naviPath) {
		this.naviPath = naviPath;
	}

	@Override
	public NaviPath getModel() {
		// TODO Auto-generated method stub
		return naviPath;
	}
}
