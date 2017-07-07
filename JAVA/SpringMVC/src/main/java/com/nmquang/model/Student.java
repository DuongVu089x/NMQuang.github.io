package com.nmquang.model;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

import org.hibernate.validator.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int student_id;
	@NotEmpty
	@Pattern(regexp = "^[a-zA-Z\\p{L}]+( [a-zA-Z\\p{L}]+)*$")
	@Size(min=2, max = 255)
	private String student_name;
	@NotEmpty
	@Size(min=2, max = 11)
	@Pattern(regexp = "^[0-9]+$")
	private String student_code;
	@NotEmpty
	@Size(min=2, max= 255)
	private String address;
	@NotNull
	@DecimalMin("0.0")
	@DecimalMax("10.0")
	private Double average_score;
	@DateTimeFormat(pattern="MM/dd/yyyy")
	@NotNull
	@Past
	/*@Pattern(regexp="[/^[0-9]{2}/[0-9]{2}/[0-9]{4}$/]")*/
	private Date date_of_birth;

	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Student(int student_id, String student_name, String student_code, String address, Double average_score,
			Date date_of_birth) {
		super();
		this.student_id = student_id;
		this.student_name = student_name;
		this.student_code = student_code;
		this.address = address;
		this.average_score = average_score;
		this.date_of_birth = date_of_birth;
	}

	public int getStudent_id() {
		return student_id;
	}

	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}

	public String getStudent_name() {
		return student_name;
	}

	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}

	public String getStudent_code() {
		return student_code;
	}

	public void setStudent_code(String student_code) {
		this.student_code = student_code;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getAverage_score() {
		return average_score;
	}

	public void setAverage_score(Double average_score) {
		this.average_score = average_score;
	}

	public Date getDate_of_birth() {
		return date_of_birth;
	}

	public void setDate_of_birth(Date date_of_birth) {
		this.date_of_birth = date_of_birth;
	}


}
