package com.winjune.wips.manager.common.db;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

public class HibernateUtil {

	private static SessionFactory sessionFactory;

	public static final ThreadLocal<Session> threadLocalSession = new ThreadLocal<Session>();

	static {
		buildSessionFactory();
	}

	private static void buildSessionFactory() {
		try {
			// Create the SessionFactory from hibernate.cfg.xml
			Configuration configuration = new Configuration();
			configuration.configure();

			ServiceRegistry serviceRegistry = new ServiceRegistryBuilder()
					.applySettings(configuration.getProperties())
					.buildServiceRegistry();
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);

			return;
		} catch (Throwable ex) {
			System.err.println("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		if (sessionFactory == null)
			buildSessionFactory();

		return sessionFactory;
	}

	public static Session getSession() throws HibernateException {
		Session session = threadLocalSession.get();
		if (session == null) {
			session = sessionFactory.openSession();
			threadLocalSession.set(session);
		}

		return session;
	}

	public static void closeSession() throws HibernateException {
		Session session = threadLocalSession.get();
		if (session != null) {
			session.close();
		}
		threadLocalSession.set(null);
	}
}
