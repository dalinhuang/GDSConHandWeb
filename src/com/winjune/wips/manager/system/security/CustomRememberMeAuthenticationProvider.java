package com.winjune.wips.manager.system.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomRememberMeAuthenticationProvider extends
		RememberMeAuthenticationProvider {
	private AuthenticationManager authenticationManager;

	public AuthenticationManager getAuthenticationManager() {
		return authenticationManager;
	}

	public void setAuthenticationManager(
			AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@SuppressWarnings("deprecation")
	public CustomRememberMeAuthenticationProvider() {
		super(); // To change body of overridden methods use File | Settings |
					// File Templates.
	}

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {

		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(
						userDetails.getUsername(), userDetails.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		return authentication;
	}
}
