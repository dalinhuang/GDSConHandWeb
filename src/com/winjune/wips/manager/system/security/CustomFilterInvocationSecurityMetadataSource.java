package com.winjune.wips.manager.system.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.winjune.wips.manager.common.data.UserData;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.Resource;
import com.winjune.wips.manager.system.model.entity.Role;
import com.winjune.wips.manager.system.model.entity.RoleResource;

public class CustomFilterInvocationSecurityMetadataSource implements
		FilterInvocationSecurityMetadataSource {

	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

	public CustomFilterInvocationSecurityMetadataSource() {
		loadResourceDefine();
	}

	private void loadResourceDefine() {
		resourceMap = new HashMap<String, Collection<ConfigAttribute>>();

		try {
			LookupRepositoryHibernate<RoleResource, Integer> roleResourceRepository = new LookupRepositoryHibernate<RoleResource, Integer>(
					RoleResource.class);

			List<RoleResource> roleResources = roleResourceRepository.findAll(
					"id", "asc");

			for (RoleResource item : roleResources) {
				Collection<ConfigAttribute> cas;
				ConfigAttribute ca = new SecurityConfig(UserData.getRoleMap()
						.get(item.getRoleId()).getRoleName());

				int resourceId = item.getResourceId();

				if (resourceMap.containsKey(UserData.getResourceMap()
						.get(resourceId).getResourceString())) {
					cas = resourceMap.get(UserData.getResourceMap()
							.get(resourceId).getResourceString());
					cas.add(ca);
				} else {
					cas = new ArrayList<ConfigAttribute>();
					cas.add(ca);
					resourceMap.put(UserData.getResourceMap().get(resourceId)
							.getResourceString(), cas);
				}

			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * According to a URL, find out permission configuration for this URL.
	 */
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object)
			throws IllegalArgumentException {
		// TODO Auto-generated method stub
		// Guess object is a URL (resource)
		String url = ((FilterInvocation) object).getRequestUrl();

		/*
		Iterator<String> it = resourceMap.keySet().iterator();
		while (it.hasNext()) {
			String urlOfResource = it.next();
			if (urlOfResource.contains(url)) {
				return resourceMap.get(urlOfResource);
			}
		}
		*/
		
		// Should do more handling here, using regular expression.
		
		Collection<ConfigAttribute> cas = resourceMap.get(url);
		
		if (cas == null) {
			if (url.equals("/login.jsp"))
				return null;
			
			if ((url.contains("/styles/")) ||
				(url.contains("/js/")) ||
				(url.contains("/images/")) ||
				(url.contains("/img/")) ||
				(url.contains("/dhtmlx/"))) {
					return null;
				}
	
			
			if (resourceMap.get("/**") != null) {
				return resourceMap.get("/**");
			}
		}
		
		return resourceMap.get(url);
	}

	@Override
	public boolean supports(Class<?> arg0) {
		// TODO Auto-generated method stub
		return true;
	}

}
