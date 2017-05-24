package com.nmquang.model;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

public class User {
	@NotEmpty
	@Size(min=2,max=20)
	private String user_name;
	@NotEmpty
	@Size(min=2,max=50)
	private String password;

	private String user_role;


	public User(String user_name, String password, String user_role) {
		super();
		this.user_name = user_name;
		this.password = password;
		this.user_role = user_role;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUser_role() {
		return user_role;
	}

	public void setUser_role(String user_role) {
		this.user_role = user_role;
	}
}
