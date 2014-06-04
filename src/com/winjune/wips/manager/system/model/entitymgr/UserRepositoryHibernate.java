package com.winjune.wips.manager.system.model.entitymgr;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.criterion.Restrictions;

import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.User;

public class UserRepositoryHibernate extends
		LookupRepositoryHibernate<User, Integer> implements IUserRepository {
	public UserRepositoryHibernate() {
		super(User.class);
	}

	public User findByName(String name) throws RepositoryException {
		try {
			Criteria select = getSession().createCriteria(User.class);
			select.add(Restrictions.eq("username", name));
			return (User) select.uniqueResult();
		} catch (HibernateException e) {
			throw new RepositoryException(e);
		} catch (Exception e) {
			throw new RepositoryException(e);
		}
	}
}
