package com.winjune.wips.manager.system.model.entitymgr;

import java.util.List;

import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.exception.ValidatorException;
import com.winjune.wips.manager.system.model.entity.User;

public interface IUserService {
	public void save(User user) throws RepositoryException, ValidatorException;

	public void delete(Integer id) throws RepositoryException;

	public List<User> findAll() throws RepositoryException;

	public List<User> findAll(String orderBy, String orderType)
			throws RepositoryException;

	public User findById(Integer id) throws RepositoryException;

	public List<User> findAllByExample(User user) throws RepositoryException;

	public List<User> findAllWithPagination(int min, int max, String orderBy,
			String orderType) throws RepositoryException;

	public Integer count() throws RepositoryException;
}
