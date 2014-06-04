package com.winjune.wips.manager.advertisement.model;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;


public class DhxGridActionRequest {
	protected static final Logger logger = Logger
			.getLogger(DhxGridActionRequest.class);

	/*
	 * 1384395779514_gr_id:1384395779514
	 * 1384395779514_c0:http://localhost:8080/wips/ad/index.action
	 * 1384395779514_c1:999 1384395779514_c2:www.sina.com 1384395779514_c3:9
	 * 1384395779514_c4:2013-11-06 1384395779514_c5:2013-11-07
	 * 1384395779514_!nativeeditor_status:inserted
	 * 1384395803705_gr_id:1384395803705
	 * 1384395803705_c0:http://localhost:8080/wips/ad/index.action
	 * 1384395803705_c1:888 1384395803705_c2:www.163.com 1384395803705_c3:10
	 * 1384395803705_c4:2013-11-05 1384395803705_c5:2013-11-06
	 * 1384395803705_!nativeeditor_status:inserted
	 * ids:1384395779514,1384395803705
	 */
	
	/**
	 * return number of values in parameter "ids"
	 * @param request
	 * @return
	 */
	public static int preprocess(HttpServletRequest request) {
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("Cannot set character encoding utf-8.", e);
			return 0;
		}

		//Enumeration<String> parameterNames = request.getParameterNames();

		//List<String> parameterNameList = new ArrayList<String>();
		//Map<String, String[]> parameterNameValueMap = request.getParameterMap();

		//while (parameterNames.hasMoreElements()) {
		//	String parameterName = parameterNames.nextElement();
		//	parameterNameList.add(parameterName);
		//}

		// get ids
		String[] ids = request.getParameterValues("ids");
		// the parameter "ids" does not exist.
		if (ids == null) {
			logger.error("no parameter \"ids\" is found. Cannot continue.");
			return 0;
		}
		
		return ids.length;
	}
	
	public static boolean convertRequestToRows(HttpServletRequest request, List<RowActionRequest> rowActionRequests) {
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("Cannot set character encoding utf-8.", e);
			return false;
		}

		//Enumeration<String> parameterNames = request.getParameterNames();

		//List<String> parameterNameList = new ArrayList<String>();
		//Map<String, String[]> parameterNameValueMap = request.getParameterMap();

		//while (parameterNames.hasMoreElements()) {
		//	String parameterName = parameterNames.nextElement();
		//	parameterNameList.add(parameterName);
		//}

		if (rowActionRequests == null) {
			logger.error("rowActionRequests cannot be null. Cannot continue");
			return false;
		}

		// get ids
		String[] ids = request.getParameterValues("ids");
		// the parameter "ids" does not exist.
		if ((ids == null) || (ids.length == 0)) {
			logger.error("no parameter \"ids\" is found. Cannot continue.");
			return false;
		}

		int index = 0;
		for (String id : ids) {
			RowActionRequest rowActionRequest = rowActionRequests.get(index);
			index++;
			
			// get parameter <id>_gr_id, such as 1384395803705_gr_id
			String parameterGrId = id + "_gr_id";
			String parameterGrIdValue = request.getParameter(parameterGrId);
			if (parameterGrIdValue == null) {
				logger.error("no parameter \"" + parameterGrId
						+ "\" is found. Cannot continue.");
				return false;
			}
			
			rowActionRequest.setRowId(parameterGrIdValue);

			// get parameter <id>_!nativeeditor_status, such as
			// 1384395779514_!nativeeditor_status
			String parameterNES = id + "_!nativeeditor_status";
			String parameterNESValue = request.getParameter(parameterNES);
			if (parameterNESValue == null) {
				logger.error("no parameter \"" + parameterNES
						+ "\" is found. Cannot continue.");
				return false;
			}
			
			rowActionRequest.setAction(parameterNESValue);
			
			IRow row = rowActionRequest.getRowData();
			
			Field[] fields = row.getClass().getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];

				String columnSymbol = id + "_c" + i;

				String[] columnValues = request
						.getParameterValues(columnSymbol);
				if (columnValues == null) {
					logger.info("no value is found for \"" + columnSymbol
							+ "\". Ignore it.");
				} else {
					String columnValueFinal = "";
					if (columnValues.length > 1) {
						for (int col=0; col <columnValues.length-1; col++) {
							columnValueFinal += columnValues[i] + ","; 
						}
						columnValueFinal += columnValues[columnValues.length-1];
					} else {
						columnValueFinal = columnValues[0];
					}
					
					field.setAccessible(true);
					try {
						if (field.getType().equals(String.class))
							field.set(row, columnValueFinal);
						else if (field.getType().equals(Integer.class))
							field.set(row,
									Integer.parseInt(columnValueFinal));
						else if (field.getType().toString().equals("int"))
							field.set(row,
									Integer.parseInt(columnValueFinal));
						else if (field.getType().equals(Long.class))
							field.set(row,
									Long.parseLong(columnValueFinal));
						else if (field.getType().equals(Boolean.class))
							field.set(row, Boolean.parseBoolean(columnValueFinal));
						else if (field.getType().equals(Float.class))
							field.set(row,
									Float.parseFloat(columnValueFinal));
						else if (field.getType().equals(Date.class)) {
							DateFormat format = new SimpleDateFormat(
									"yyyy-MM-dd");
							Date date = format.parse(columnValueFinal);

							field.set(row, date);
						} else
							logger.warn("unrecgonized type is "
									+ field.getType().toString());
					} catch (IllegalArgumentException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} // end of if (columnValues == null)
			} // end of for (int i = 0; i < fields.length; i++)
		} // end of for (String id : ids)
		
		return true;
	}
}
