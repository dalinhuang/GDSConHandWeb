package com.winjune.wips.manager.advertisement.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.advertisement.model.AdRow;
import com.winjune.wips.manager.advertisement.model.AdRowActionRequest;
import com.winjune.wips.manager.advertisement.model.AdRowManager;
import com.winjune.wips.manager.advertisement.model.DhxGridActionRequest;
import com.winjune.wips.manager.advertisement.model.RowActionRequest;
import com.winjune.wips.manager.advertisement.model.RowActionResponse;

/*
 * 1384395779514_gr_id:1384395779514
 1384395779514_c0:http://localhost:8080/wips/ad/index.action
 1384395779514_c1:999
 1384395779514_c2:www.sina.com
 1384395779514_c3:9
 1384395779514_c4:2013-11-06
 1384395779514_c5:2013-11-07
 1384395779514_!nativeeditor_status:inserted
 1384395803705_gr_id:1384395803705
 1384395803705_c0:http://localhost:8080/wips/ad/index.action
 1384395803705_c1:888
 1384395803705_c2:www.163.com
 1384395803705_c3:10
 1384395803705_c4:2013-11-05
 1384395803705_c5:2013-11-06
 1384395803705_!nativeeditor_status:inserted
 ids:1384395779514,1384395803705
 */
public class UpdateAdAction extends ActionSupport {
	protected static final Logger logger = Logger
			.getLogger(UpdateAdAction.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = -3084212798901149084L;

	public String execute() {
		HttpServletRequest request = (HttpServletRequest) ActionContext
				.getContext().get(ServletActionContext.HTTP_REQUEST);

		List<RowActionRequest> adRowActionRequests = retrievePayloadFromRequest(request);

		List<RowActionResponse> adRowActionResponses = new ArrayList<RowActionResponse>(
				adRowActionRequests.size());
		if (AdRowManager.update(adRowActionRequests, adRowActionResponses)) {
			postProcess(adRowActionResponses);

			return SUCCESS;
		} else
			return ERROR;
	}

	private List<RowActionRequest> retrievePayloadFromRequest(
			HttpServletRequest request) {
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("Cannot set character encoding utf-8.", e);
			return null;
		}

		// Enumeration<String> parameterNames = request.getParameterNames();

		// List<String> parameterNameList = new ArrayList<String>();
		// Map<String, String[]> parameterMap = request.getParameterMap();

		// while (parameterNames.hasMoreElements()) {
		// String parameterName = parameterNames.nextElement();
		// parameterNameList.add(parameterName);
		// }

		int idsSize = DhxGridActionRequest.preprocess(request);

		List<RowActionRequest> adRowActionRequests = new ArrayList<RowActionRequest>(
				idsSize);
		for (int i = 0; i < idsSize; i++) {
			AdRowActionRequest adRowActionRequest = new AdRowActionRequest();
			AdRow adRow = new AdRow();
			adRowActionRequest.setRowData(adRow);
			adRowActionRequests.add(adRowActionRequest);
		}

		DhxGridActionRequest.convertRequestToRows(request, adRowActionRequests);

		return adRowActionRequests;
	}

	private void postProcess(List<RowActionResponse> adRowActionResponses) {
		String xml = convertResponseToXml(adRowActionResponses);

		HttpServletResponse response = (HttpServletResponse) ActionContext
				.getContext().get(ServletActionContext.HTTP_RESPONSE);

		response.setContentType("text/xml");
		response.setContentLength(xml.length());

		try {
			PrintWriter out = response.getWriter();
			out.write(xml);
		} catch (IOException e) {

		}
	}

	private String convertResponseToXml(
			List<RowActionResponse> adRowActionResponses) {
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<data>");

		for (RowActionResponse response : adRowActionResponses) {
			xml.append("<action type=\"" + response.getAction() + "\" sid=\""
					+ response.getRowId() + "\" tid=\""
					+ response.getNewRowId() + "\" />");
		}
		xml.append("</data>");

		return xml.toString();
	}
}
