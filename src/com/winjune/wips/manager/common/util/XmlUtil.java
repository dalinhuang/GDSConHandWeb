package com.winjune.wips.manager.common.util;

import java.lang.reflect.Field;
import java.util.List;

import com.winjune.wips.manager.common.entity.IEntity;

public class XmlUtil {

	public static String convertListToXml(Class clas, List<IEntity> list) {
		if (list == null)
			return null;
		
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<rows id=\"0\">");
		
		int i = 0;
		Field[] fields = clas.getDeclaredFields();
		for (Object object : list) {
			xml.append("<row id=\"" + i + "\">");
			i++;
			
			for (Field field : fields) {
				field.setAccessible(true);
				try {
					Object fieldValue = field.get(object);
					//System.out.println(field.getName() + ": "
					//		+ fieldValue.toString());
					xml.append("<cell>" + fieldValue + "</cell>");
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			xml.append("</row>");
		} // end of for Object
		
		xml.append("</rows>");
		
		return xml.toString();
	}
}
