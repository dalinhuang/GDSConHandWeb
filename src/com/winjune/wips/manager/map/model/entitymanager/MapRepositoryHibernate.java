package com.winjune.wips.manager.map.model.entitymanager;

import java.util.List;

import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.Operator;
import com.winjune.wips.manager.common.util.SearchParams;
import com.winjune.wips.manager.map.model.entity.Map;

public class MapRepositoryHibernate {

	public static List<Map> findMap() {
		LookupRepositoryHibernate<Map, Integer> mapRepository = new LookupRepositoryHibernate<Map, Integer>(
				Map.class);

		try {
			List<Map> maps = mapRepository.findAll("id", "asc");
			return maps;
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static Map findMap(int mapId) {
		LookupRepositoryHibernate<Map, Integer> mapRepository = new LookupRepositoryHibernate<Map, Integer>(
				Map.class);

		try {
			SearchParams params = new SearchParams();;
			params.setOperator(Operator.EQUAL);
			params.setField("id");
			params.setValue(String.valueOf(mapId));
			
			List<Map> maps = mapRepository.findAllByFieldWithPagination(params, 0, 1, "id", "asc");

			if ((maps != null) && (!maps.isEmpty()))
				return maps.get(0);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static void saveMap(Map object) {
		LookupRepositoryHibernate<Map, Integer> mapRepository = new LookupRepositoryHibernate<Map, Integer>(
				Map.class);

		try {
			mapRepository.save(object);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}
}
