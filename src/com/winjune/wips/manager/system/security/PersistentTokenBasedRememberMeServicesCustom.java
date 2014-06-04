package com.winjune.wips.manager.system.security;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;

public class PersistentTokenBasedRememberMeServicesCustom extends
		PersistentTokenBasedRememberMeServices {

	/** only needed because super throws exception. */
	@SuppressWarnings("deprecation")
	public PersistentTokenBasedRememberMeServicesCustom() throws Exception {
		super();
	}

	/** Copy of code of inherited class + setting cookieExpiration, */
	@Override
	protected void setCookie(String[] tokens, int maxAge,
			HttpServletRequest request, HttpServletResponse response) {
		String cookieValue = encodeCookie(tokens);
		Cookie cookie = new Cookie(getCookieName(), cookieValue);
		cookie.setMaxAge(maxAge);
		cookie.setPath("/");
		cookie.setSecure(false); // no getter available in super, so always
									// false

		response.addCookie(cookie);
	}
}
