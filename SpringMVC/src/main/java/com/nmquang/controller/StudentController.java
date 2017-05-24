package com.nmquang.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nmquang.model.Student;
import com.nmquang.model.User;
import com.nmquang.service.StudentService;
import com.nmquang.service.StudentServiceImpl;
import com.nmquang.service.UserService;
import com.nmquang.service.UserServiceImpl;
import com.nmquang.service.UserServiceImpl;

@Controller
@ComponentScan("com.nmquang.service")
@SessionAttributes("user")
@RequestMapping(value="/student")
public class StudentController {


	private StudentServiceImpl studentService = new StudentServiceImpl();

	@Autowired
	private UserService userService;

/*	@Autowired
	private StudentService studentService;*/

	int record = 5;
	/*
	 * function showList
	 * method : get
	 * @param{ModelMap} modelMap
	 * A controller to get list student and render to home.jsp
	 * */

	@RequestMapping(value="/lists",method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String showLists(ModelMap modelMap, HttpSession session){
		if(session.getAttribute("user") == null) {
			modelMap.put("user", new User());
			return "login";

		} else if(userService.checkLogin((User) session.getAttribute("user"))) {
			List<Student> list = studentService.getAllStudentByPage(0, record);
			int count = studentService.countStudent();
			modelMap.put("count", count);
			modelMap.put("record", record);
			modelMap.put("lists", list);
			/*return "search";*/
			if(userService.getUser((User)session.getAttribute("user")).getUser_role().equals("Admin")) {
				return "home";
			} else if(userService.getUser((User)session.getAttribute("user")).getUser_role().equals("User")) {
				return "homeUser";
			}

		} else {
			modelMap.put("user", new User());
			return "login";
		}
		return null;
	}

	/*
	 * function showList
	 * @Param{modelMap, session} ModelMap, Session
	 * give a request from home,jsp by ajax and this controller give a list data and send to home.jsp
	 * */
	@RequestMapping(value="/list",method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String showList(ModelMap modelMap, HttpSession session){

		List<Student> list = studentService.getAllStudent();
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;

	}
	/*@RequestMapping(value="/search", method= RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String searchStudents(@RequestParam("search")String search) {
		List<Student> list = studentService.searchStudentByName(search);
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}*/
	/*@RequestMapping(value="/list",method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String showList(ModelMap modelMap, HttpSession session){
		if(session.getAttribute("user") == null) {
			modelMap.put("user", new User());
			return "login";

		} else if(userService.checkLogin((User)session.getAttribute("user"))) {
			List<Student> list = studentService.getAllStudent();
			ObjectMapper mapper = new ObjectMapper();
			String ajaxRes = "";
			try {
				ajaxRes = mapper.writeValueAsString(list);
			} catch(JsonProcessingException e) {
				e.printStackTrace();
			}
			return ajaxRes;
		} else {
			modelMap.put("user", new User());
			return "login";
		}

	}*/

	/*
	 * function getAllStudentByPage
	 * @Param{modelMap, page} ModelMap, int
	 * Get all student, which be found by page
	 * */
	@RequestMapping(value="/lists/{page}", method = RequestMethod.GET)
	public String getAllStudentByPage(ModelMap modelMap, @PathVariable("page") int page) {
		/*int record = 2;*/
		if(page == 1) {

		} else {
			page = (page-1) * record + 1;
		}
		List<Student> list = studentService.getAllStudentByPage(page - 1, record);
		int count = studentService.countStudent();
		modelMap.put("record", record);
		modelMap.put("count", count);
		modelMap.put("lists",list);
		return "home";
		/*return "search";*/
	}

	/*
	 * function comonList
	 * @Param{}
	 * get count student by ajax
	 * */
	@RequestMapping(value="/commonList", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String commonList() {
		List<Student> list = studentService.getAllStudent();
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}

	/*
	 * function searchStudent
	 * @Param{}
	 * get and show all student by ajax use user account
	 * */
	@RequestMapping(value="/searchList", method= RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String searchStudent() {
		List<Student> list = studentService.getAllStudentByPage(0, record);
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}

	/*
	 * function searchStudentByPage
	 * @Param{page} int
	 * search student by pagination, use admin account
	 * */
	@RequestMapping(value="/searchLists", method= RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String searchStudentByPage(@RequestParam("page") int page) {
		if(page == 1) {

		} else {
			page = (page-1) * record + 1;
		}
		List<Student> list = studentService.getAllStudentByPage(page - 1, record);
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}

	/*
	 * function searchStudentBySearch
	 * @Param{search} String
	 * search student with name(search) and render list, use admin account
	 * */
	@RequestMapping(value="/search", method= RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String searchStudentBySearch(@RequestParam("search") String search) {
		List<Student> list = studentService.searchStudentByName(search);
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}

	/*
	 * function searchStudentByPageByAjax
	 * @Param{search, page} String, int
	 * search Student with pagination use ajax and admin acoount
	 * */
	@RequestMapping(value="/searchs", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String searchStudentByPageByAjax(@RequestParam("search") String search, @RequestParam("page") int page) {
		if(page == 1) {

		} else {
			page = (page-1) * record + 1;
		}
		List<Student> list = studentService.getAllStudentByPageForSearch(page - 1, record, search);
		ObjectMapper mapper = new ObjectMapper();
		String ajaxRes = "";
		try {
			ajaxRes = mapper.writeValueAsString(list);
		} catch(JsonProcessingException e) {
			e.printStackTrace();
		}
		return ajaxRes;
	}

	/*
	 *function searchStudent
	 *@Param{modelMap, search} ModelMap, String
	 *search Student when user is seeing list, use user account
	 * */
	@RequestMapping(value="/search", method= RequestMethod.POST, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String searchStudent(ModelMap modelMap, @RequestParam("search") String search) {

		List<Student> list = studentService.getAllStudentByPageForSearch(0, record, search);
		int count = studentService.countStudentForSearch(search);
		modelMap.put("count", count);
		modelMap.put("record", record);
		modelMap.put("lists", list);
		modelMap.addAttribute("search", search);
		return "search";
	}

	/*
	 * function search StudentByPage
	 * @Param{modelMap, page,search} ModelMap, int, String
	 * search student by name(search) in page(page) and render to modelMap, with user account
	 * */
	@RequestMapping(value="/search/{page}/{search}", method = RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String searchStudentByPage(ModelMap modelMap, @PathVariable("page") int page, @PathVariable("search") String search) {
		if(page == 1) {

		} else {
			page = (page -1) * record + 1;
		}
		List<Student> list = studentService.getAllStudentByPageForSearch(page-1, record, search);
		int count = studentService.countStudentForSearch(search);
		modelMap.put("record", record);
		modelMap.put("count", count);
		modelMap.put("lists",list);
		return "search";

	}

	/*
	 * function addStudent
	 * @param{ModelMap} modelMap
	 * A controller to get student object for add.jsp
	 * */
	@RequestMapping(value="/add", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String addStudent(ModelMap modelMap) {
		Student student = new Student();
		modelMap.put("student",student);
		return "add";
	}

	/*
	 * function addStudent
	 * @param{ModelMap, Student} modelMap, student
	 * when post form add, this controller will get data(student) and give to Service process and give to db to add student
	 * */
	@RequestMapping(value="/add", method=RequestMethod.POST, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String addStudent(ModelMap modelMap, @ModelAttribute(value = "student") @Valid Student student, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			modelMap.addAttribute("student", student);
			return "add";
		}
		if(studentService.isNumeric(student.getStudent_code())/* && studentService.checkDataInputField(student.getStudent_name()) && studentService.checkDataInputField(student.getAddress())*/) {
			studentService.addStudent(student);
			List<Student> list = studentService.getAllStudent();
			modelMap.addAttribute("lists", list);
			return "redirect:lists";
		} else {
			String errorMess = "Data in each field is String, no special characters. Please check again.";
			System.out.println(errorMess);
			modelMap.addAttribute("student", student);
			modelMap.addAttribute("errorMess",errorMess );
			return "add";
		}
	}


	/*
	 * function login
	 * @param{ModelMap} modelMap
	 * a controller go to login.jsp
	 * */
	@RequestMapping(value="/login", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String login(ModelMap modelMap, HttpSession session) {
		if(session.getAttribute("user") == null) {
			modelMap.put("user", new User());
			return "login";
		} else {
			if(userService.checkLogin((User) session.getAttribute("user"))) {
				List<Student> list = studentService.getAllStudent();
				modelMap.addAttribute("lists", list);
				return "redirect:lists";
			} else {
				modelMap.put("user", new User());
				return "login";
			}
		}
	}

	/*
	 * function login
	 * @param{User, ModelMap} user, modelMap
	 * when login success, it render to list.jsp
	 * */
	@RequestMapping(value="/login", method=RequestMethod.POST, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String login(ModelMap modelMap, @ModelAttribute(value = "user") @Valid User user, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
	        modelMap.addAttribute("user", user);
	        return "login";
		}
		if(userService.checkLogin(user)) {
			List<Student> list = studentService.getAllStudent();
			modelMap.addAttribute("lists", list);
			/*return "redirect:lists";*/
			if(userService.getUser(user).getUser_role().equals("Admin")) {
				return "redirect:lists";
			} else if(userService.getUser(user).getUser_role().equals("User")) {
				return "redirect:listsUser";
			}

		} else {
			modelMap.addAttribute("mess", "fail to login");
			return "login";
		}
		return null;
	}


	/*
	 * function showListByUser
	 * @Param{modelMap, session} ModelMap, HttpSession
	 * show all student by user account
	 * */
	@RequestMapping(value="/listsUser", method=RequestMethod.GET,produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String showListByUser(ModelMap modelMap, HttpSession session ) {
		if(session.getAttribute("user") == null) {
			modelMap.put("user", new User());
			return "login";

		} else if(userService.checkLogin((User)session.getAttribute("user"))) {
			List<Student> list = studentService.getAllStudentByPage(0, record);

			int count = studentService.countStudent();
			modelMap.put("count", count);
			modelMap.put("record", record);
			modelMap.put("lists", list);
			/*return "search";*/
			if(userService.getUser((User)session.getAttribute("user")).getUser_role().equals("Admin")) {
				return "home";
			} else if(userService.getUser((User)session.getAttribute("user")).getUser_role().equals("User")) {
				return "homeUser";
			}

		} else {
			modelMap.put("user", new User());
			return "login";
		}
		return null;
	}

	/*
	 * function getAllStudentsByPageByUser
	 * @Param{modelMap, page} ModelMap, int
	 * Pagiation when login by user account
	 * */
	@RequestMapping(value="/listsUser/{page}", method = RequestMethod.GET)
	public String getAllStudentByPageByUser(ModelMap modelMap, @PathVariable("page") int page) {
		/*int record = 2;*/
		if(page == 1) {

		} else {
			page = (page-1) * record + 1;
		}
		List<Student> list = studentService.getAllStudentByPage(page - 1, record);
		int count = studentService.countStudent();
		modelMap.put("record", record);
		modelMap.put("count", count);
		modelMap.put("lists",list);
		return "homeUser";
		/*return "search";*/
	}

	/*
	 * function logout
	 * */
	@RequestMapping(value="/logout", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String logout(Model modelMap, HttpSession session) {
		session.invalidate();
		if(modelMap.containsAttribute("user")) {
			modelMap.asMap().remove("user");
		}
		modelMap.addAttribute("user", new User());
		return "redirect:login";
	}

	/*
	 * function editStudent
	 * @param{student_id, modelMap} int, ModelMap
	 * a controller get student who has student_id = student_id, render to edit.jsp
	 * */
	@RequestMapping(value="/edit/{student_id}", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String editStudent(@PathVariable("student_id") int student_id, ModelMap modelMap) {
		Student student = studentService.getStudentId(student_id);

		modelMap.put("student", student);
		return "edit";
	}

	/*
	 * function editStudent
	 * @param{modelMap, student} ModelMap, Student
	 * when use updates student, controller will be called to edit data and return list.jsp
	 * */
	@RequestMapping(value="/update", method=RequestMethod.POST, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String editStudent(ModelMap modelMap, @ModelAttribute(value = "student")@Valid Student student, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {

			modelMap.addAttribute("student", student);
			return "edit";
		}
		if(studentService.isNumeric(student.getStudent_code()) /*&& studentService.checkDataInputField(student.getAddress()) && studentService.checkDataInputField(student.getStudent_name())*/) {
			studentService.editStudent(student);
			List<Student> list = studentService.getAllStudent();
			modelMap.addAttribute("lists", list);
			return "redirect:lists";
		} else {
			String errorMess = "Data in each field is String, no special characters. Please check again.";
			System.out.println(errorMess);
			modelMap.put("errorMess", errorMess);
			modelMap.addAttribute("student", student);
			return "edit";
		}
	}

	/*
	 * function deleteStudent
	 * @param{student_id, modelMap} int, ModelMap
	 * when use deletes student, it will be called and return list.jsp
	 * */
	@RequestMapping(value="/delete/{student_id}", method = RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String deleteStudent(@PathVariable("student_id") int student_id, ModelMap modelMap) {
		studentService.deleteStudent(student_id);
		List<Student> list = studentService.getAllStudent();
		modelMap.addAttribute("lists", list);
		return "redirect:../lists";
	}

	/*
	 * function initBinder
	 * @param{binder} WebDataBinder
	 * this function to format date
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
	    SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
	    sdf.setLenient(true);
	    binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
	}

	@RequestMapping(value="/404", method=RequestMethod.GET, produces="application/x-www-form-urlencoded;charset=UTF-8")
	public String error404() {
		return "error404";
	}
}
