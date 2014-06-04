package com.winjune.wips.manager.advertisement.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.winjune.wips.manager.advertisement.model.entity.AdWithPosition;
import com.winjune.wips.manager.advertisement.model.entitymgr.AdRepositoryHibernate;

public class ListAdAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2404423271605620186L;

	private List<AdWithPosition> ads;

	public String load() {
		ads = AdRepositoryHibernate.findAllAdsWithPositions();
		if ((ads != null) & (ads.size() > 0))
			return SUCCESS;
		else
			return INPUT;
	}

	public List<AdWithPosition> getData() {
		return this.ads;
	}

	public String loadXml() {
		System.out.println("loadXml");
		ads = AdRepositoryHibernate.findAllAdsWithPositions();

		if ((ads != null) & (ads.size() > 0)) {
			String xml = convertAdsToXml();

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

		return SUCCESS;
	}

	private String convertAdsToXml() {
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<rows id=\"0\">");

		DateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");        
		
		int i = 0;
		for (AdWithPosition adWithPosition : ads) {
			xml.append("<row id=\"" + i + "\">");
			i++;

			xml.append("<cell>" + adWithPosition.getAd().getThumbnailImgUrl()
					+ "</cell>");
			xml.append("<cell>" + adWithPosition.getPositions().toString()
					+ "</cell>");
			xml.append("<cell>" + adWithPosition.getAd().getUrl() + "</cell>");
			xml.append("<cell>" + adWithPosition.getAd().getDuration()
					+ "</cell>");
			xml.append("<cell>" + dateFormat.format(adWithPosition.getAd().getFromDate())
					+ "</cell>");
			xml.append("<cell>" + dateFormat.format(adWithPosition.getAd().getToDate())
					+ "</cell>");

			xml.append("</row>");
		}

		xml.append("</rows>");

		return xml.toString();
	}
}
