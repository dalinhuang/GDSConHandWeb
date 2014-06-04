package com.winjune.wips.manager.common.entitymgr;

import java.io.Serializable;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;

import com.winjune.wips.manager.common.exception.RepositoryException;

public class BaseRepositoryHibernate<T, PK extends Serializable> extends
		AbstractRepositoryHibernate<T> implements IBaseRepository<T, PK> {

	public BaseRepositoryHibernate(Class<T> persistentClass) {
		super(persistentClass);
	}

	// Implemented interface methods
	@Override
	public void save(T object) throws RepositoryException {
		Transaction t = null;
		try {
			t = getSession().beginTransaction();
			getSession().clear();
			getSession().saveOrUpdate(object);
			t.commit();
		} catch (HibernateException e) {
			recover(t);
			throw new RepositoryException(e);
		} catch (Exception e) {
			recover(t);
			throw new RepositoryException(e);
		}
	}

	@Override
	public void saveAll(List<T> objects) throws RepositoryException {
		Transaction t = null;
		try {
			t = getSession().beginTransaction();
			getSession().clear();

			for (T object : objects) {
				getSession().saveOrUpdate(object);
			}

			t.commit();
		} catch (HibernateException e) {
			recover(t);
			throw new RepositoryException(e);
		} catch (Exception e) {
			recover(t);
			throw new RepositoryException(e);
		}
	}

	@Override
	public void delete(T object) throws RepositoryException {
		Transaction t = null;
		try {
			t = getSession().beginTransaction();
			getSession().delete(object);
			t.commit();
		} catch (HibernateException ex) {
			recover(t);
			throw new RepositoryException(ex);
		} catch (Exception ex) {
			recover(t);
			throw new RepositoryException(ex);
		}
	}

	@Override
	public void deleteAll(List<T> objects) throws RepositoryException {
		Transaction t = null;
		try {
			t = getSession().beginTransaction();

			for (T object : objects) {
				getSession().delete(object);
			}

			t.commit();
		} catch (HibernateException ex) {
			recover(t);
			throw new RepositoryException(ex);
		} catch (Exception ex) {
			recover(t);
			throw new RepositoryException(ex);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public T get(PK id) throws RepositoryException {
		try {
			T entity = (T) getSession().get(getPersistentClass(), id);
			return entity;
		} catch (HibernateException ex) {
			throw new RepositoryException(ex);
		} catch (Exception ex) {
			throw new RepositoryException(ex);
		}
	}

	@Override
	public List<T> getAll() throws RepositoryException {
		try {
			return findByCriteria();
		} catch (RepositoryException ex) {
			throw new RepositoryException(ex);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean exists(PK id) throws RepositoryException {
		try {
			T entity = (T) getSession().get(getPersistentClass(), id);
			return (entity == null);
		} catch (HibernateException ex) {
			throw new RepositoryException(ex);
		} catch (Exception ex) {
			throw new RepositoryException(ex);
		}
	}

	// Functionality methods

	public void flush() {
		getSession().flush();
	}

	public void clear() {
		getSession().clear();
	}

	public List<T> findByFields(Criterion... criterion)
			throws RepositoryException {
		try {
			return findByCriteria(criterion);
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			throw new RepositoryException(e);
		}
	}
	
	public List<Object> findByFields(String selectedColumn, Criterion... criterion)
			throws RepositoryException {
		try {
			return findByCriteria(selectedColumn, criterion);
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			throw new RepositoryException(e);
		}
	}
}
