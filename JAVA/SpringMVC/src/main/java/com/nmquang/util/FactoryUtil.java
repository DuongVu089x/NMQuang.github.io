package com.nmquang.util;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.Logger;

public class FactoryUtil {
	private static SqlSessionFactory sessionFactory = getSessionFactory();
	private static Logger log = Logger.getLogger(FactoryUtil.class);

	public static SqlSessionFactory getSessionFactory() {
		if (sessionFactory == null) {
			InputStream stream;
			try {
				stream = Resources.getResourceAsStream("mybatis-config.xml");

				sessionFactory = new SqlSessionFactoryBuilder().build(stream);

			} catch (IOException e) {
				log.error("not find mybatis-config.xml");
				throw new RuntimeException(e.getCause());
			}
		}
		return sessionFactory;
	}

	public static SqlSession openSession() {

		return sessionFactory.openSession();
	}
}
