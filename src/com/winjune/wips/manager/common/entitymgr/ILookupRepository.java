package com.winjune.wips.manager.common.entitymgr;

import java.io.Serializable;
import java.util.List;

import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.SearchParams;

public interface ILookupRepository<T, PK extends Serializable> extends
		IBaseRepository<T, PK> {
	public Integer countAll() throws RepositoryException;

	public T findByExample(T object) throws RepositoryException;

	public List<T> findAll(String orderBy, String orderType)
			throws RepositoryException;

	public List<T> findAllWithPagination(int min, int max)
			throws RepositoryException;

	public List<T> findAllWithPagination(int min, int max, String orderBy,
			String orderType) throws RepositoryException;

	public List<T> findAllByExample(T object) throws RepositoryException;

	public List<T> findAllByExample(T object, String orderBy, String orderType)
			throws RepositoryException;

	public List<T> findAllByExampleWithPagination(T object, int min, int max)
			throws RepositoryException;

	public List<T> findAllByFieldWithPagination(SearchParams params, int min,
			int max, String orderBy, String orderType)
			throws RepositoryException;

	public List<T> search(String searchField, Object searchString,
			String sortField, String sortOrder, Integer offset, Integer limit)
			throws RepositoryException;

	public int countSearch(String searchField, Object searchString)
			throws RepositoryException;
}
