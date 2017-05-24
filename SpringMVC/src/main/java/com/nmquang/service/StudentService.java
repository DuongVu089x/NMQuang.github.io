package com.nmquang.service;

import java.util.List;

import com.nmquang.model.Student;

public interface StudentService {

	public List<Student> getAllStudent();

	public void addStudent(Student student);

	public void editStudent(Student student);

	public void deleteStudent(int student_id);

	public Student getStudentId(int student_id);

	public List<Student> searchStudentByName(String name);

	public int countStudent();

	public List<Student> getAllStudentByPage(int page, int record);

	public List<Student> getAllStudentByPageForSearch(int page, int record, String name);

	public int countStudentForSearch(String name);

	public boolean isNumeric(String str);

	public boolean checkDataInputField(String name);

	public List<Student> getAllStudentByMonthForSearch(int month, int year,int page, int record);

	public int countStudentByMonth(int month, int year);
}
