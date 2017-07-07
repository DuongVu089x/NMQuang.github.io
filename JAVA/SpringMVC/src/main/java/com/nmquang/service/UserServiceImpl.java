package com.nmquang.service;



import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nmquang.mapper.UserMapper;
import com.nmquang.model.User;
import com.nmquang.util.FactoryUtil;

@Component("userService")
/*@Service
@Transactional*/
public class UserServiceImpl implements UserService{

	public boolean checkLogin(User user) {
		SqlSession session = FactoryUtil.openSession();
		try {
			UserMapper userMapper = session.getMapper(UserMapper.class);

			if(userMapper.checkLogin(user) == null) {
				return false;
			} else {
				return true;
			}
		} finally {
			session.close();
		}
	}

	public User getUser(User user) {
		SqlSession session = FactoryUtil.openSession();
		try {
			UserMapper userMapper = session.getMapper(UserMapper.class);
			return userMapper.getUser(user);
		} finally {
			session.close();
		}
	}
}
