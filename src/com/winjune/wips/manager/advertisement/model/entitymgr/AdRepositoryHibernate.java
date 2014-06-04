package com.winjune.wips.manager.advertisement.model.entitymgr;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.winjune.wips.manager.advertisement.model.entity.Ad;
import com.winjune.wips.manager.advertisement.model.entity.AdWithPosition;
import com.winjune.wips.manager.advertisement.model.entity.PositionAd;
import com.winjune.wips.manager.common.entitymgr.BaseRepositoryHibernate;
import com.winjune.wips.manager.common.entitymgr.LookupRepositoryHibernate;
import com.winjune.wips.manager.common.exception.RepositoryException;

public class AdRepositoryHibernate {
	public static List<AdWithPosition> findAllAdsWithPositions() {
		LookupRepositoryHibernate<Ad, Integer> adRepository = new LookupRepositoryHibernate<Ad, Integer>(
				Ad.class);

		LookupRepositoryHibernate<PositionAd, Integer> positionAdRepository = new LookupRepositoryHibernate<PositionAd, Integer>(
				PositionAd.class);
		try {
			List<AdWithPosition> adWithPositions = new ArrayList<AdWithPosition>();

			List<Ad> ads = adRepository.findAll("id", "asc");
			for (Ad ad : ads) {
				AdWithPosition adwp = new AdWithPosition();

				adwp.setAd(ad);

				List<Object> pads = positionAdRepository.findByFields(
						"positionId", Restrictions.eq("adId", ad.getId()));

				adwp.setPositions(pads);

				adWithPositions.add(adwp);

			}
			return adWithPositions;
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

	public static int insertAdWithPositions(AdWithPosition adWithPosition) {
		BaseRepositoryHibernate<Ad, Integer> adRepository = new BaseRepositoryHibernate<Ad, Integer>(
				Ad.class);

		BaseRepositoryHibernate<PositionAd, Integer> positionAdRepository = new BaseRepositoryHibernate<PositionAd, Integer>(
				PositionAd.class);

		try {
			adRepository.save(adWithPosition.getAd());

			for (Object object : adWithPosition.getPositions()) {
				positionAdRepository.save((PositionAd)object);
			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 1;
	}
}
