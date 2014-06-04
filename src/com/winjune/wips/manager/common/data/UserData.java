package com.winjune.wips.manager.common.data;

import java.util.List;
import java.util.Map;

import com.google.common.base.Function;
import com.google.common.collect.Maps;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.Resource;
import com.winjune.wips.manager.system.model.entity.Role;

public class UserData {
	private static Map<Integer, Role> mappedRoles;
	private static Map<Integer, Resource> mappedResources;

	static {
		LookupRepositoryHibernate<Role, Integer> roleRepository = new LookupRepositoryHibernate<Role, Integer>(
				Role.class);
		try {
			// Convert List of roles to Map
			List<Role> roles = roleRepository.findAll("id", "asc");

			mappedRoles = Maps.uniqueIndex(roles,
					new Function<Role, Integer>() {
						public Integer apply(Role role) {
							return role.getId();
						}
					});

			LookupRepositoryHibernate<Resource, Integer> resourceRepository = new LookupRepositoryHibernate<Resource, Integer>(
					Resource.class);
			
			// Convert List of resources to Map
			List<Resource> resources = resourceRepository.findAll("id", "asc");

			mappedResources = Maps.uniqueIndex(resources,
					new Function<Resource, Integer>() {
						public Integer apply(Resource resource) {
							return resource.getId();
						}
					});

		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static Map<Integer, Role> getRoleMap() {
		return mappedRoles;
	}
	
	public static Map<Integer, Resource> getResourceMap() {
		return mappedResources;
	}
}
