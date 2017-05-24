package com.nmquang.mapper;

import org.apache.ibatis.annotations.Param;

import com.nmquang.model.User;

public interface UserMapper {

	public User checkLogin(User user);

	public User getUser(User user);
}
