package com.winjune.wips.manager.emergency.controller;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.emergency.model.entity.Trace;

public class ListTraceRecordAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4199166191518364820L;
	
	private List<Trace> traces;
	
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
		LookupRepositoryHibernate<Trace, Integer> buildingRepository = new LookupRepositoryHibernate<Trace, Integer>(
				Trace.class);

		traces = buildingRepository.findAll("id", "asc");

		return SUCCESS;
	}

	public List<Trace> getData() {
		return this.traces;
	}
}
