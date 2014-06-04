package com.winjune.wips.manager.common.exception;


public class RepositoryException extends ApplicationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8155838943513064437L;

	public RepositoryException() {
		super();
	}

	public RepositoryException(String message) {
		super(message);
	}

	public RepositoryException(Exception ex, String message) {
		super(ex, message);
	}

	public RepositoryException(Exception ex) {
		super(ex);
	}
}
