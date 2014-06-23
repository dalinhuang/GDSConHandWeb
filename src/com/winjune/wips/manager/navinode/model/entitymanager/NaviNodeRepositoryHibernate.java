package com.winjune.wips.manager.navinode.model.entitymanager;

import java.util.List;

import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.Operator;
import com.winjune.wips.manager.common.util.SearchParams;
import com.winjune.wips.manager.navinode.model.entity.NaviNode;
import com.winjune.wips.manager.poi.model.entity.POI;

public class NaviNodeRepositoryHibernate {

	public static List<NaviNode> findNaviNode() {
		LookupRepositoryHibernate<NaviNode, Integer> mapRepository = new LookupRepositoryHibernate<NaviNode, Integer>(
				NaviNode.class);

		try {
			List<NaviNode> naviNodes = mapRepository.findAll("id", "asc");
			return naviNodes;
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static NaviNode findNaviNode(int nodeId) {
		LookupRepositoryHibernate<NaviNode, Integer> mapRepository = new LookupRepositoryHibernate<NaviNode, Integer>(
				NaviNode.class);

		try {
			SearchParams params = new SearchParams();;
			params.setOperator(Operator.EQUAL);
			params.setField("id");
			params.setValue(String.valueOf(nodeId));
			
			List<NaviNode> naviNodes = mapRepository.findAllByFieldWithPagination(params, 0, 1, "id", "asc");

			if ((naviNodes != null) && (!naviNodes.isEmpty()))
				return naviNodes.get(0);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static void saveNaviNode(NaviNode object) {
		LookupRepositoryHibernate<NaviNode, Integer> mapRepository = new LookupRepositoryHibernate<NaviNode, Integer>(
				NaviNode.class);

		try {
			mapRepository.save(object);
		} catch (RepositoryException e) {
			e.printStackTrace();
		}
	}
}
