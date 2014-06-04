package com.winjune.wips.manager.common.entitymgr;

import java.io.Serializable;
import java.util.List;

import com.winjune.wips.manager.common.exception.RepositoryException;

public interface IBaseRepository<T, PK extends Serializable> {
	public void save(T object) throws RepositoryException;

	public void saveAll(List<T> objects) throws RepositoryException;

	public void delete(T object) throws RepositoryException;

	public void deleteAll(List<T> objects) throws RepositoryException;

	public T get(PK id) throws RepositoryException;

	public List<T> getAll() throws RepositoryException;

	public boolean exists(PK id) throws RepositoryException;
}
