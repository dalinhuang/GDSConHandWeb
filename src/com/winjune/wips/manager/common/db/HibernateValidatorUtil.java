package com.winjune.wips.manager.common.db;

import javax.validation.Configuration;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class HibernateValidatorUtil {
	private static ValidatorFactory factory;

	static {
		try {
			// Getting the configuration so we can change attributes
			Configuration<?> config = Validation.byDefaultProvider()
					.configure();

			// Using a TraversableResolver
			config.traversableResolver(new CustomTraversableResolver());

			// Building the customized factory (along with the changed
			// configuration)
			factory = config.buildValidatorFactory();
		} catch (Exception e) {
			System.err.println("Initial ValidatorFactory creation failed." + e);
			throw new ExceptionInInitializerError(e);
		}
	}

	/**
	 * Recupera o validador
	 * 
	 * @return
	 */
	public static Validator getValidator() {
		Validator validator = factory.getValidator();
		return validator;
	}
}
