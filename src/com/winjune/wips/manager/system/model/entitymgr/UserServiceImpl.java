package com.winjune.wips.manager.system.model.entitymgr;

import java.util.List;

import com.winjune.wips.manager.common.exception.RepositoryException;
import com.winjune.wips.manager.common.exception.ValidatorException;
import com.winjune.wips.manager.common.util.Validator;
import com.winjune.wips.manager.system.model.entity.User;

public class UserServiceImpl implements IUserService {
	private IUserRepository userRepository;
	@SuppressWarnings("rawtypes")
	private Validator userValidator;

	public UserServiceImpl() {
	}

	public UserServiceImpl(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}

	// Implemented interface methods

	@SuppressWarnings("unchecked")
	public void save(User user) throws RepositoryException, ValidatorException {
		getUserValidator().validate(user);
		getUserRepository().save(user);
	}

	public void delete(Integer id) throws RepositoryException {
		User user = getUserRepository().get(id);
		getUserRepository().delete(user);
	}

	public List<User> findAll() throws RepositoryException {
		return getUserRepository().getAll();
	}

	public List<User> findAll(String orderBy, String orderType)
			throws RepositoryException {
		return getUserRepository().findAll(orderBy, orderType);
	}

	public User findById(Integer id) throws RepositoryException {
		return getUserRepository().get(id);
	}

	public List<User> findAllByExample(User user) throws RepositoryException {
		return getUserRepository().findAllByExample(user);
	}

	public List<User> findAllWithPagination(int min, int max, String orderBy,
			String orderType) throws RepositoryException {
		return getUserRepository().findAllWithPagination(min, max, orderBy,
				orderType);
	}

	public Integer count() throws RepositoryException {
		return getUserRepository().countAll();
	}

	// Getters and Setters

	public IUserRepository getUserRepository() {
		if (userRepository == null) {
			setUserRepository(new UserRepositoryHibernate());
		}

		return userRepository;
	}

	public void setUserRepository(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@SuppressWarnings("rawtypes")
	public Validator getUserValidator() {
		if (userValidator == null) {
			setUserValidator(new Validator<User>());
		}
		return userValidator;
	}

	@SuppressWarnings("rawtypes")
	public void setUserValidator(Validator userValidator) {
		this.userValidator = userValidator;
	}
}
