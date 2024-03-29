package com.winjune.wips.manager.poi.model.entitymanager;

import java.util.List;

import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.Operator;
import com.winjune.wips.manager.common.util.SearchParams;
import com.winjune.wips.manager.poi.model.entity.POI;

public class POIRepositoryHibernate {

	public static List<POI> findPOI() {
		LookupRepositoryHibernate<POI, Integer> mapRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);

		try {
			List<POI> pois = mapRepository.findAll("id", "asc");
			return pois;
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static POI findPoi(int poiId) {
		LookupRepositoryHibernate<POI, Integer> mapRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);

		try {
			SearchParams params = new SearchParams();;
			params.setOperator(Operator.EQUAL);
			params.setField("id");
			params.setValue(Integer.valueOf(poiId));
			
			List<POI> pois = mapRepository.findAllByFieldWithPagination(params, 0, 1, "id", "asc");

			if ((pois != null) && (!pois.isEmpty()))
				return pois.get(0);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static POI findPoi(int mapId, int placeX, int placeY) {
		LookupRepositoryHibernate<POI, Integer> mapRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);

		Object[] params = new Object[] { mapId, placeX, placeY };
		List<POI> pois = mapRepository.find(
				"from POI where mapId=? and placeX=? and placeY=?", params);	
		if (pois != null)
		{
			return pois.get(0);
		}
		
		return null;
	}
	
	public static void savePOI(POI object) {
		LookupRepositoryHibernate<POI, Integer> mapRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);

		try {
			mapRepository.save(object);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}
	
	public static void deletePoi(POI object) {
		LookupRepositoryHibernate<POI, Integer> mapRepository = new LookupRepositoryHibernate<POI, Integer>(
				POI.class);

		try {
			mapRepository.delete(object);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}

}
