package com.nmquang.service;

import com.nmquang.model.User;

public interface UserService {
	public boolean checkLogin(User user);

	public User getUser(User user);
}
