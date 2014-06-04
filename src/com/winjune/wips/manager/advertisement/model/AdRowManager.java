package com.winjune.wips.manager.advertisement.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.winjune.wips.manager.advertisement.model.entity.Ad;
import com.winjune.wips.manager.advertisement.model.entity.AdWithPosition;
import com.winjune.wips.manager.advertisement.model.entity.PositionAd;
import com.winjune.wips.manager.advertisement.model.entitymgr.AdRepositoryHibernate;

public class AdRowManager {
	protected static final Logger logger = Logger.getLogger(AdRowManager.class);

	public static boolean update(List<RowActionRequest> adRowActionRequests, List<RowActionResponse> rowActionResponses) {
		if (adRowActionRequests == null) {
			logger.error("adRowActionRequests is null. Cannot continue.");
			return false;
		}

		for (RowActionRequest request : adRowActionRequests) {
			RowActionResponse rowActionResponse = new RowActionResponse();
			
			String action = request.getAction();
			String rowId = request.getRowId();
			AdRow adRow = (AdRow) request.getRowData();
			
			// fill response
			
			rowActionResponse.setRowId(rowId);

			if (action.equals(DhxDataProcessor.INSERTED)) {
				rowActionResponse.setAction(DhxDataProcessor.INSERT);
				insertAd(rowId, adRow);
			} else if (action.equals(DhxDataProcessor.UPDATED)) {
				rowActionResponse.setAction(DhxDataProcessor.UPDATE);
				updateAd(rowId, adRow);
			} else if (action.equals(DhxDataProcessor.DELETED)) {
				rowActionResponse.setAction(DhxDataProcessor.DELETE);
				deleteAd(rowId, adRow);
			} else {

			}
			
			// below is just for debug
			rowActionResponse.setNewRowId("111");
			
			rowActionResponses.add(rowActionResponse);
		}

		return true;
	}

	private static boolean insertAd(String rowId, AdRow row) {
		Ad ad = new Ad();
		ad.setDuration(row.getDuration());
		ad.setFromDate(row.getFromDate());
		ad.setThumbnailImgUrl(row.getThumbnailImgUrl());
		ad.setToDate(row.getToDate());
		ad.setUrl(row.getUrl());
		
		AdWithPosition adWithPosition = new AdWithPosition();
		adWithPosition.setAd(ad);
		
		String positions = row.getPositions();
		String[] positionArray = positions.split(",");
		// list of PositionAd
		List<Object> positionAds = new ArrayList<Object>(positionArray.length);
		for (String position : positionArray) {
			PositionAd positionAd = new PositionAd();
			positionAd.setPositionId(Integer.parseInt(position));
			positionAds.add(positionAd);
		}
		
		adWithPosition.setPositions(positionAds);
		
		AdRepositoryHibernate.insertAdWithPositions(adWithPosition);

		return true;
	}

	private static boolean updateAd(String rowId, AdRow row) {

		return true;
	}

	private static boolean deleteAd(String rowId, AdRow row) {

		return true;
	}
}
