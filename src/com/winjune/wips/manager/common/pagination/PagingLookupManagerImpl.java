package com.winjune.wips.manager.common.pagination;

import com.winjune.wips.manager.common.entitymgr.ILookupRepository;
import com.winjune.wips.manager.common.exception.PagingLookupManagerException;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.util.SearchParams;

import java.util.List;

import org.displaytag.properties.SortOrderEnum;

public class PagingLookupManagerImpl implements PagingLookupManager {
    
    private ILookupRepository repository;

    public PagingLookupManagerImpl() {}
    public PagingLookupManagerImpl(ILookupRepository repository) {
        this.repository = repository;
    }

    public ExtendedPaginatedList getAllRecordsPage(ExtendedPaginatedList paginatedList) 
            throws PagingLookupManagerException {
        try {
            int min = paginatedList.getFirstRecordIndex();
            int max = min + paginatedList.getPageSize();

            String orderType = "asc";
            if (paginatedList.getSortDirection().equals(SortOrderEnum.ASCENDING)) {
                orderType = "asc";
            } else {
                orderType = "desc";
            }

            String orderBy = paginatedList.getSortCriterion();

            List results = repository.findAllWithPagination(min, max, orderBy, orderType);
            paginatedList.setList(results);
            paginatedList.setTotalNumberOfRows(repository.countAll());

            return paginatedList;
        } catch (RepositoryException ex) {
            throw new PagingLookupManagerException(ex);
        }
    }

    public ExtendedPaginatedList getSearchRecordsPage(SearchParams params,
            ExtendedPaginatedList paginatedList) throws PagingLookupManagerException {
        try {
            int offset = paginatedList.getFirstRecordIndex();
            int limit = offset + paginatedList.getPageSize();

            String orderType = "asc";
            if (paginatedList.getSortDirection().equals(SortOrderEnum.DESCENDING)) {
                orderType = "desc";
            }

            String orderBy = paginatedList.getSortCriterion();
            if (orderBy == null) {
                orderBy = params.getField();
            }

            int count = repository.countSearch(params.getField(), params.getValue());

            List results = repository.search(params.getField(), params.getValue(), orderBy, orderType, offset, limit);
            paginatedList.setList(results);
            paginatedList.setTotalNumberOfRows(count);

            return paginatedList;
        } catch (RepositoryException ex) {
            throw new PagingLookupManagerException(ex);
        }
    }

    public void setRepository(ILookupRepository repository) {
        this.repository = repository;
    }
}