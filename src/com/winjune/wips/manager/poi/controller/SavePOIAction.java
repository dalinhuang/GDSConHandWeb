/*
 * $Id: SavePOIAction.java 1400220 2012-10-19 18:49:39Z jogep $
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
package com.winjune.wips.manager.poi.controller;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.winjune.wips.manager.poi.model.entity.POI;
import com.winjune.wips.manager.poi.model.entitymanager.POIRepositoryHibernate;

public class SavePOIAction extends ActionSupport implements ModelDriven<POI>{

	private static final long serialVersionUID = 5156288255337069381L;

	private POI poi = new POI();

	public String input() throws Exception {

		
		POIRepositoryHibernate.savePOI(poi);

		return SUCCESS;
	}

	public String upload() throws Exception {
		// Need save map file

		return SUCCESS;
	}

	public POI getPoi() {
		return poi;
	}

	public void setPoi(POI poi) {
		this.poi = poi;
	}

	@Override
	public POI getModel() {
		// TODO Auto-generated method stub
		return poi;
	}
}
