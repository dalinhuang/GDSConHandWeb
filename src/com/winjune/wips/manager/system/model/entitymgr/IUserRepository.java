package com.winjune.wips.manager.system.model.entitymgr;

import com.winjune.wips.manager.common.entitymgr.ILookupRepository;
import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.system.model.entity.User;

public interface IUserRepository extends ILookupRepository<User, Integer> {
	public User findByName(String name) throws RepositoryException;
}
