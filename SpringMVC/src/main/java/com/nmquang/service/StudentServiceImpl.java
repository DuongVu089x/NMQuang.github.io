package com.nmquang.service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.nmquang.mapper.StudentMapper;
import com.nmquang.model.Student;
import com.nmquang.util.FactoryUtil;

@Component("StudentService")
//@Service
public class StudentServiceImpl implements StudentService {

	/*@Autowired
	StudentMapper studentMapper;*/
	/*
	 * funtion getAllStudent
	 * @param{}
	 * get all student in db
	 * */
	public List<Student> getAllStudent() {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.getAllStudent();
		} finally {
			session.close();
		}
	}


	/*
	 * function addStudent
	 * @param{student} Student
	 * add student
	 * */
	public void addStudent(Student student) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			studentMapper.addStudent(student);
			studentMapper.addStudentInfo(student);
			session.commit();
		} finally {
			session.close();
		}
	}


	/*
	 * function editStudent
	 * @param{student} Student
	 * edit student
	 * */
	public void editStudent(Student student) {

		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			studentMapper.editStudent(student);
			session.commit();
		} finally {
			session.close();
		}
	}


	/*
	 * function deleteStudent
	 * @param{student_id} int
	 * delete student with student_id = student_id
	 * */
	public void deleteStudent(int student_id) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			studentMapper.deleteStudent(student_id);
			studentMapper.deleteStudentInfo(student_id);
			session.commit();
		} finally {
			session.close();
		}
	}


	/*
	 * function getStudent
	 * @param{student_id} int
	 * find a student with student_id and return all info about student
	 * */
	public Student getStudentId(int student_id) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.getStudentId(student_id);
		} finally {
			session.close();
		}
	}

	/*
	 * function searchStudent
	 * @param{name} String
	 * find student follow student_name = name
	 * */
	public List<Student> searchStudentByName(String name) {
		String search = "%" + name + "%";
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.searchStudentByName(search);
		} finally {
			session.close();
		}
	}

	public int countStudent() {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.countStudent();
		} finally {
			session.close();
		}
	}

	public List<Student> getAllStudentByPage(int page, int record) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.getAllStudentByPage(page, record);
		} finally {
			session.close();
		}
	}

	public List<Student> getAllStudentByPageForSearch(int page, int record, String name) {
		String search = "%" + name + "%";
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.getAllStudentByPageForSearch(page, record, search);
		} finally {
			session.close();
		}
	}

	public int countStudentForSearch(String name) {
		String search = "%" + name + "%";
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.countStudentForSearch(search);
		} finally {
			session.close();
		}
	}

	public boolean isNumeric(String str)
	  {
	    try
	    {
	      int d = Integer.parseInt(str);
	    }
	    catch(NumberFormatException nfe)
	    {
	      return false;
	    }
	    return true;
	  }

	public boolean checkDataInputField(String name) {
		Pattern pattern = Pattern.compile("[a-zA-Z0-9]*");
		Matcher matcher = pattern.matcher(name);
		if(!matcher.matches()) {
			return false;
		} else {
			return true;
		}
	}
//[a-zA-Z0-9]*
	public List<Student> getAllStudentByMonthForSearch(int month, int year, int page, int record) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.getAllStudentByMonthForSearch(month, year, page, record);
		} finally {
			session.close();
		}
	}

	public int countStudentByMonth(int month, int year) {
		SqlSession session = FactoryUtil.openSession();
		try {
			StudentMapper studentMapper = session.getMapper(StudentMapper.class);
			return studentMapper.countStudentByMonth(month, year);
		} finally {
			session.close();
		}
	}


}
