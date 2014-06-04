package com.winjune.wips.manager.system.security;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class CustomAccessDecisionManager implements AccessDecisionManager {

	@Override
	public void decide(Authentication authentication, Object object,
			Collection<ConfigAttribute> configAttributes)
			throws AccessDeniedException, InsufficientAuthenticationException {
		// TODO Auto-generated method stub
		if (configAttributes == null)
			return;
		
		System.out.println(object.toString());
		
		Iterator<ConfigAttribute> it = configAttributes.iterator();
		while (it.hasNext()) {
			ConfigAttribute ca = it.next();
			String neededRole = ((SecurityConfig) ca).getAttribute();
			
			for (GrantedAuthority ga : authentication.getAuthorities()) {
				if (neededRole.equals(ga.getAuthority())) {
					return;
				}
			}
		}
		
		throw new AccessDeniedException("No Rights");
		
	}

	@Override
	public boolean supports(ConfigAttribute arg0) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean supports(Class<?> arg0) {
		// TODO Auto-generated method stub
		return true;
	}

}
