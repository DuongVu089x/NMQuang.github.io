<%@page import="org.apache.taglibs.standard.tag.el.core.ForEachTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page import="com.nmquang.model.*"%>
<%@page import="java.util.List"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<jsp:include page="header.jsp" />
<body>
<%-- 	<sec:authentication property="name"/></br>
	<sec:authentication property="authorities"/> --%>
	<%
		List<Student> students = (List<Student>) request.getAttribute("lists");
	%>
	<div class="container">
		<h1>Students Data</h1>

		<div class="div_">
			<%-- <sec:authorize access="hasRole('Admin')"> --%>
			<a href="<%= request.getContextPath() %>/student/add">
				<button type="button" class="btn">ADD</button>
			</a>
			<%-- </sec:authorize> --%>

			<a href="<%= request.getContextPath() %>/student/logout">
				<button type="button" class="btn">Logout</button>
			</a>
			<div class="container">
				<div class="row">
					<form <%-- method="post" action="<%= request.getContextPath() %>/student/search" --%>>
						<div class="col-lg-6 float">
					    <div class="input-group">
					    <%
					    	if(request.getAttribute("search") == null) {
					    %>
					      	<input type="text" class="form-control" name="search" id="search" placeholder="Search for..." value=''>
					    <%
					    	} else {
					    %>
					    	<input type="text" class="form-control" name="search" id="search" placeholder="Search for..." value='<%= request.getAttribute("search")%>'>
					    <%
					    	}
					    %>
					      <span class="input-group-btn">
					        <button class="btn btn-secondary" type="button" >Search</button>
					      </span>
					    </div>
					  </div>
					</form>
				</div>
			</div>
		</div>

		<table border="1" class="table table-striped">
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Code</th>
				<th>Address</th>
				<th>Average_score</th>
				<th>Date off birth</th>
				<th>Delete</th>
				<th>Edit</th>
			</tr>

			<tbody id="table_ajax">

			</tbody>
			<div id="p_error"></div>
		</table>
		<div class="a_page"></div>
	</div>
	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$(document).ready(function() {

			commonList();
			listStudent();
			$("#search").keyup(function() {

				searchStudentByName();
			});

		});
		var countStudent;
		var countStudentSearch;
		var record = 5;
			function commonList() {
				$.ajax({
					type: "GET",
					contentType: "application/json",
					url: "${student}commonList/",

					data: {

					},
					dataType: 'json',
					timeout:100000,
					success: function(data) {
						console.log("SUCCESS: ",data);
						countStudent = data.length;
						console.log(countStudent);
					},
					error: function(e) {
						console.log("ERROR: ", e);
					}

				});
			}
			function listStudent() {
				$.ajax({
					type: "GET",
					contentType: "application/json",
					url: "${student}searchList/",

					data: {

					},
					dataType: 'json',
					timeout:100000,
					success: function(data) {
						console.log("SUCCESS: ",data);
						console.log(countStudent);
						var html = "";
						var error = "";
						var page = "";
						if(data.length < 1) {
							error = "Dữ liệu không tồn tại";
						}
						$("#p_page").html(error);
						$.each(data, function(key,value){
							var date = new Date(value.date_of_birth);
							html +=
								'<tr>'+
									'<td>' + value.student_id + '</td>' +
									'<td>' + value.student_name + '</td>' +
									'<td>' + value.student_code + '</td>' +
									'<td>' + value.address + '</td>' +
									'<td>' + value.average_score + '</td>' +
									'<td>' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + '</td>' +
									'<td>' + '<a href="delete/'+ value.student_id +'" onclick="return confirm(\'Are you sure you want to delete item?\');"><button type="button" class="btn but-dele">DELETE</button></a>'+'</td>' +
									'<td>' + '<a href="edit/'+ value.student_id +'"><button type="button" class="btn">EDIT</button></a>'+'</td>' +
				                '</tr>';
						});
						var pageNumber;
						if(countStudent % record == 0) {
							pageNumber = countStudent/record;
						} else {
							pageNumber = countStudent/record + 1;
						}

						for(var i = 1; i <= pageNumber; i++) {
							page += '<button onclick="pageData('+i+')">'+i+'</button>';
						}

						$("#table_ajax").html(html);
						$(".a_page").html(page);

					},
					error: function(e) {
						console.log("ERROR: ", e);
					}

				});
			}

			function pageData(page) {
				var search = $("#search").val();
				$.ajax({
					type: "GET",
					contentType: "application/json",
					url: "${student}searchLists/",
					data: {
						page: page
					},
					dataType: 'json',
					timeout:100000,
					success: function(data) {
						console.log("SUCCESS: ", data);
						console.log("GOOD JOB: ");
						console.log(countStudent);
						var html = "";
						var error = "";
						var page = "";
						if(data.length < 1) {
							error = "Dữ liệu không tồn tại";
						}
						$("#p_page").html(error);
						$.each(data, function(key,value){
							var date = new Date(value.date_of_birth);
							html +=
								'<tr>'+
									'<td>' + value.student_id + '</td>' +
									'<td>' + value.student_name + '</td>' +
									'<td>' + value.student_code + '</td>' +
									'<td>' + value.address + '</td>' +
									'<td>' + value.average_score + '</td>' +
									'<td>' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + '</td>' +
									'<td>' + '<a href="delete/'+ value.student_id +'" onclick="return confirm(\'Are you sure you want to delete item?\');"><button type="button" class="btn but-dele">DELETE</button></a>'+'</td>' +
									'<td>' + '<a href="edit/'+ value.student_id +'"><button type="button" class="btn">EDIT</button></a>'+'</td>' +
				                '</tr>';
						});

						$("#table_ajax").html(html);

					},
					error: function(e) {
						console.log("ERROR: ", e);
					}
				});
			}

			function searchStudentByName() {
				var search = $("#search").val();


				$.ajax({
					type: "GET",
					contentType: "application/json",
					url: "${student}search/",
					data: {
						search: search
					},
					dataType: 'json',
					timeout:100000,
					success: function(data) {
						console.log("SUCCESS: ",data);
						console.log("NUMBER RECORD:", data.length);
						countStudentSearch = data.length;
						var html = "";
						var page = "";
						var error = "";
						if(data.length < 1) {
							error = "Dữ liệu không tồn tại";
						}

						$.each(data, function(key,value){
							var date = new Date(value.date_of_birth);
							html +=
								'<tr>'+
									'<td>' + value.student_id + '</td>' +
									'<td>' + value.student_name + '</td>' +
									'<td>' + value.student_code + '</td>' +
									'<td>' + value.address + '</td>' +
									'<td>' + value.average_score + '</td>' +
									'<td>' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + '</td>' +
									'<td>' + '<a href="delete/'+ value.student_id +'" onclick="return confirm(\'Are you sure you want to delete item?\');"><button type="button" class="btn but-dele">DELETE</button></a>'+'</td>' +
									'<td>' + '<a href="edit/'+ value.student_id +'"><button type="button" class="btn">EDIT</button></a>'+'</td>' +
				                '</tr>';
						});

						var pageNumber;
						if(data.length % record == 0) {
							pageNumber = data.length/record;
						} else {
							pageNumber = data.length/record + 1;
						}
						for(var i = 1; i <= pageNumber; i++) {
							page += '<button onclick="pageDataBySearch('+i+')">'+i+'</button>';
						}

						$("#table_ajax").html(html);
						$(".a_page").html(page);

					},
					error: function(e) {
						console.log("ERROR: ", e);
					}

				});
			}
			function pageDataBySearch(page) {
				var search = $("#search").val();
				$.ajax({
					type: "GET",
					contentType: "application/json",
					url: "${student}searchs/",
					data: {
						search: search,
						page: page
					},
					dataType: 'json',
					timeout:100000,
					success: function(data) {
						console.log("SUCCESS: ", data);
						console.log("GOOD JOB: ");
						var html = "";
						var error = "";
						var page = "";
						if(data.length < 1) {
							error = "Dữ liệu không tồn tại";
						}
						$("#p_page").html(error);
						$.each(data, function(key,value){
							var date = new Date(value.date_of_birth);
							html +=
								'<tr>'+
									'<td>' + value.student_id + '</td>' +
									'<td>' + value.student_name + '</td>' +
									'<td>' + value.student_code + '</td>' +
									'<td>' + value.address + '</td>' +
									'<td>' + value.average_score + '</td>' +
									'<td>' + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + '</td>' +
									'<td>' + '<a href="delete/'+ value.student_id +'" onclick="return confirm(\'Are you sure you want to delete item?\');"><button type="button" class="btn but-dele">DELETE</button></a>'+'</td>' +
									'<td>' + '<a href="edit/'+ value.student_id +'"><button type="button" class="btn">EDIT</button></a>'+'</td>' +
				                '</tr>';
						});

						$("#table_ajax").html(html);
					},
					error: function(e) {
						console.log("ERROR: ", e);
					}
				});
			}


	</script>
</body>
</html>