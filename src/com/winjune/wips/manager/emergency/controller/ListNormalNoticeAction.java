package com.winjune.wips.manager.emergency.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.emergency.model.entity.NormalNotice;

public class ListNormalNoticeAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4199166191518364820L;
	
	private List<NormalNotice> notices;
	
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
		LookupRepositoryHibernate<NormalNotice, Integer> buildingRepository = new LookupRepositoryHibernate<NormalNotice, Integer>(
				NormalNotice.class);

		notices = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<NormalNotice> getData() {
		return this.notices;
	}
}
