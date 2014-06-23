package com.winjune.wips.manager.navipath.model.entitymanager;

import java.util.List;

import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.Operator;
import com.winjune.wips.manager.common.util.SearchParams;
import com.winjune.wips.manager.navipath.model.entity.NaviPath;

public class NaviPathRepositoryHibernate {

	public static List<NaviPath> findNaviPath() {
		LookupRepositoryHibernate<NaviPath, Integer> mapRepository = new LookupRepositoryHibernate<NaviPath, Integer>(
				NaviPath.class);

		try {
			List<NaviPath> naviPaths = mapRepository.findAll("id", "asc");
			return naviPaths;
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static NaviPath findNaviPath(int pathId) {
		LookupRepositoryHibernate<NaviPath, Integer> mapRepository = new LookupRepositoryHibernate<NaviPath, Integer>(
				NaviPath.class);

		try {
			SearchParams params = new SearchParams();;
			params.setOperator(Operator.EQUAL);
			params.setField("id");
			params.setValue(String.valueOf(pathId));
			
			List<NaviPath> naviPaths = mapRepository.findAllByFieldWithPagination(params, 0, 1, "id", "asc");

			if ((naviPaths != null) && (!naviPaths.isEmpty()))
				return naviPaths.get(0);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static void saveNaviPath(NaviPath object) {
		LookupRepositoryHibernate<NaviPath, Integer> mapRepository = new LookupRepositoryHibernate<NaviPath, Integer>(
				NaviPath.class);

		try {
			mapRepository.save(object);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}
}
