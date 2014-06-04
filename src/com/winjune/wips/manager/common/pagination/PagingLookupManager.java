package com.winjune.wips.manager.common.pagination;

import java.io.Serializable;

import com.winjune.wips.manager.common.exception.PagingLookupManagerException;
import com.winjune.wips.manager.common.util.SearchParams;

public interface PagingLookupManager<T, ID extends Serializable> {
	public ExtendedPaginatedList getAllRecordsPage(
			ExtendedPaginatedList paginatedList)
			throws PagingLookupManagerException;

	public ExtendedPaginatedList getSearchRecordsPage(SearchParams params,
			ExtendedPaginatedList paginatedList)
			throws PagingLookupManagerException;
}
