package com.winjune.wips.manager.common.exception;

import java.util.Set;

import javax.validation.ConstraintViolation;

public class ValidatorException extends ApplicationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4740014790985226497L;
	
	private static final String message = "Foram encontrados erros nos dados validados.";
	@SuppressWarnings("rawtypes")
	private Set<ConstraintViolation> constraintViolations;
	private String detailedMessage;

	/**
	 * Constructor of the exception
	 * 
	 * @param constraintViolations
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ValidatorException(Object constraintViolations) {
		super(message);
		this.constraintViolations = (Set<ConstraintViolation>) constraintViolations;

		makeDetailedMessage();
	}

	/**
	 * 
	 * @param message
	 */
	public ValidatorException(String message) {
		super(message);
	}

	/**
     *
     */
	public ValidatorException() {
		super(message);
	}

	/**
	 * Cria mensagem detalhada com base nas violações recebidas
	 */
	@SuppressWarnings("rawtypes")
	private void makeDetailedMessage() {
		detailedMessage = "";

		for (ConstraintViolation constraint : (Set<ConstraintViolation>) constraintViolations) {
			detailedMessage += constraint.getMessage() + "\n";
		}
	}

	/**
	 * @return the constraintViolations
	 */
	@SuppressWarnings("rawtypes")
	public Set<ConstraintViolation> getConstraintViolations() {
		return constraintViolations;
	}

	/**
	 * @return the detailedMessage
	 */
	@Override
	public String getDetailedMessage() {
		return detailedMessage;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public String toString() {
		String errors = "";

		for (ConstraintViolation constraint : constraintViolations) {
			errors += "Erro em: " + constraint.getPropertyPath().toString()
					+ "\nMensagem:" + constraint.getMessage();
		}

		return errors;
	}

}