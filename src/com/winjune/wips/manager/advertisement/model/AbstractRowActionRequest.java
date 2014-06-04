package com.winjune.wips.manager.advertisement.model;

public abstract class AbstractRowActionRequest<T> {
	private String rowId;
	private String action;
	private T rowData;

	public String getRowId() {
		return rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public T getRowData() {
		return rowData;
	}

	public void setRowData(T rowData) {
		this.rowData = rowData;
	}

}
