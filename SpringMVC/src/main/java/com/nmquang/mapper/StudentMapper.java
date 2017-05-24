package com.nmquang.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.nmquang.model.Student;

public interface StudentMapper {

	public List<Student> getAllStudent();

	public void addStudent(Student student);

	public void addStudentInfo(Student student);

	public void editStudent(Student student);

	public void deleteStudent(int student_id);

	public void deleteStudentInfo(int student_id);

	public Student getStudentId(int student_id);

	public List<Student> searchStudentByName(String name);

	public int countStudent();

	public List<Student> getAllStudentByPage(@Param("page")int page, @Param("record")int record);

	public List<Student> getAllStudentByPageForSearch(@Param("page") int page, @Param("record") int record, @Param("search")String search);

	public int countStudentForSearch(String search);

	public List<Student> getAllStudentByMonthForSearch(@Param("month")int month, @Param("year")int year,@Param("page")int page, @Param("record")int record);

	public int countStudentByMonth(int month, int year);
}
