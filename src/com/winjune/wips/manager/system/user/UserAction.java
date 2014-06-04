package com.winjune.wips.manager.system.user;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.User;
import com.winjune.wips.manager.system.model.entitymgr.UserRepositoryHibernate;

/**
 * If use "jqGrid", actually, it sends
 * 'http://localhost:8080/wips/user/listUsers.action?_search=false&nd=1380089041942&rows=10&page=1&sidx=id&sord=desc&filters='
 * 
 * 
 * @author ezhipin
 * 
 */
public class UserAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -57231913757523264L;

	private List<User> users;

	// Input parameters
	// no getter method, will not include in the JSON
	private boolean _search;
	private String nd;
	private int rows;
	// page start from 1
	private int page;
	private String sidx;
	private String sord;
	private String filters;

	public String input() throws Exception {
		return SUCCESS;
	}

	public String execute() {
		UserRepositoryHibernate userRespository = new UserRepositoryHibernate();
		try {
			int countOfUsers = userRespository.countAll();

			if (rows <= 0)
				return ERROR;
			
			int countOfPages = countOfUsers / rows + 1;

			if ((page < 1) || (page > countOfPages))
				return ERROR;

			int min = (page - 1) * rows;
			int max = page * rows - 1;
			String orderBy = sidx;
			String orderType = sord;

			users = userRespository.findAllWithPagination(min, max, orderBy,
					orderType);
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return SUCCESS;
	}
	
	public String load() {
		UserRepositoryHibernate userRespository = new UserRepositoryHibernate();
		try {
			users = userRespository.findAll("id", "asc");
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return SUCCESS;
	}

	public void setData(List<User> users) {
		this.users = users;
	}

	public List<User> getData() {
		return this.users;
	}

	public void set_search(boolean _search) {
		this._search = _search;
	}

	public void setNd(String nd) {
		this.nd = nd;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

	public void setFilters(String filters) {
		this.filters = filters;
	}
}
