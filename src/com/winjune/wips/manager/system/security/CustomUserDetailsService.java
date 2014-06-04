package com.winjune.wips.manager.system.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.winjune.wips.manager.common.data.UserData;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.User;
import com.winjune.wips.manager.system.model.entity.UserRole;
import com.winjune.wips.manager.system.model.entitymgr.IUserRepository;
import com.winjune.wips.manager.system.model.entitymgr.UserRepositoryHibernate;

/**
 * A custom service for retrieving users from a custom datasource, such as a
 * database.
 * <p>
 * This custom service must implement Spring's {@link UserDetailsService}
 */
@Service("UserDetailService")
public class CustomUserDetailsService implements UserDetailsService {
	protected static final Logger logger = Logger
			.getLogger(CustomUserDetailsService.class);

	private IUserRepository userRepository = new UserRepositoryHibernate();

	/**
	 * Retrieves a user record containing the user's credentials and access.
	 */
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {

		// Declare a null Spring User
		UserDetails springUser = null;

		try {
			// Search database for a user that matches the specified username
			// You can provide a custom DAO to access your persistence layer
			// Or use JDBC to access your database
			// DbUser is our custom domain user. This is not the same as
			// Spring's User
			User dbUser = userRepository.findByName(username);

			if (dbUser == null) {
				throw new UsernameNotFoundException("Error in retrieving user");
			}

			// Populate the Spring User object with details from the dbUser
			// Here we just pass the username, password, and access level
			// getAuthorities() will translate the access level to the correct
			// role type
			springUser = new org.springframework.security.core.userdetails.User(
					dbUser.getUsername(), dbUser.getPassword(),
					dbUser.isEnabled(), !dbUser.isAccountExpired(),
					!dbUser.isCredentialsExpired(), !dbUser.isLocked(),
					getAuthorities(dbUser.getId()));
		} catch (Exception e) {
			logger.error("Error in retrieving user");
			throw new UsernameNotFoundException("Error in retrieving user");
		}

		// Return user to Spring for processing.
		// Take note we're not the one evaluating whether this user is
		// authenticated or valid
		// We just merely retrieve a user that matches the specified username
		return springUser;
	}

	/**
	 * Retrieves the correct ROLE type depending on the access level, where
	 * access level is an Integer. Basically, this interprets the access value
	 * whether it's for a regular user or admin.
	 * 
	 * @param access
	 *            an integer value representing the access of the user
	 * @return collection of granted authorities
	 */
	public Collection<GrantedAuthority> getAuthorities(int userId) {
		// Create a list of grants for this user
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();

		LookupRepositoryHibernate<UserRole, Integer> userRoleRepository = new LookupRepositoryHibernate<UserRole, Integer>(
				UserRole.class);
		
		List<UserRole> userRoles;
		try {
			userRoles = userRoleRepository.findByFields(Restrictions.eq("userId", userId));

			for (UserRole item : userRoles) {
				String roleName = UserData.getRoleMap().get(item.getRoleId())
						.getRoleName();
				authList.add(new SimpleGrantedAuthority(roleName));
			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Return list of granted authorities
		return authList;
	}
}