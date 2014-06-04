package com.winjune.wips.manager.common.util;

import java.util.Set;

import javax.validation.ConstraintViolation;

import com.winjune.wips.manager.common.db.HibernateValidatorUtil;
import com.winjune.wips.manager.common.exception.ValidatorException;

public class Validator<T> {
	private javax.validation.Validator validator;

	public void validate(T object) throws ValidatorException {
		Set<ConstraintViolation<T>> constraintViolations = getValidator()
				.validate(object);

		if (constraintViolations.size() > 0) {
			throw new ValidatorException(constraintViolations);
		}
	}

	/**
	 * @return the validator
	 */
	public javax.validation.Validator getValidator() {
		if (validator == null) {
			validator = HibernateValidatorUtil.getValidator();
		}
		return validator;
	}

	/**
	 * @param validator
	 *            the validator to set
	 */
	public void setValidator(javax.validation.Validator validator) {
		this.validator = validator;
	}
}