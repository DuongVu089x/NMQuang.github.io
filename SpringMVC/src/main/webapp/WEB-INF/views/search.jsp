<%@page import="org.apache.taglibs.standard.tag.el.core.ForEachTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="com.nmquang.model.*"%>
<%@page import="java.util.List"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<jsp:include page="header.jsp" />
<body>

	<%
		List<Student> students = (List<Student>) request.getAttribute("lists");
	%>
	<div class="container">
		<h1>Students Data</h1>

		<div class="div_">

			<a href="<%= request.getContextPath() %>/student/logout">
				<button type="button" class="btn">Logout</button>
			</a>
			<div class="container">
				<div class="row">
					<form  method="post" action="<%= request.getContextPath() %>/student/search" >
						<div class="col-lg-6 float">
					    <div class="input-group">
					    <%
					    	if(request.getAttribute("search") == null) {
					    %>
					      	<input type="text" class="form-control" name="search" placeholder="Search for..." value='' >
					    <%
					    	} else {
					    %>
					    	<input type="text" class="form-control" name="search" placeholder="Search for..." value='<%= request.getAttribute("search")%>' >
					    <%
					    	}
					    %>
					      <span class="input-group-btn">
					        <button class="btn btn-secondary"  type="submit">Search</button>
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

			</tr>
			<%
				for (Student student : students) {
			%>
			<tr>
				<td><%= student.getStudent_id() %></td>
				<td><%= student.getStudent_name() %></td>
				<td><%= student.getStudent_code() %></td>
				<td><%= student.getAddress() %></td>
				<td><%= student.getAverage_score() %></td>
				<td><fmt:formatDate pattern="MM/dd/yyyy" value='<%= student.getDate_of_birth() %>'/></td>

			</tr>
			<%
				}
			%>
		</table>
		</br>
		<%
			int record = (Integer)request.getAttribute("record");
			int count = (Integer)request.getAttribute("count");
			long pageNumber;
			if(count % record != 0) {
				pageNumber = count / record + /* count % record */1;
			} else {
				pageNumber = count / record;
			}

		%>
		</br>

		<%
			int i = 1;
			while(pageNumber > 0) {
		%>

			<a href="<%= request.getContextPath() %>/student/search/<%=i%>/<%=request.getAttribute("search") %>"><%=i %></a>

			<%-- <a href="<%= request.getContextPath() %>/student/listsUser/<%=i%>"><%=i %></a> --%>
		<%
			i++;
			pageNumber--;
			}
		%>
	</div>
	<jsp:include page="footer.jsp" />
	<script type="text/javascript">
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
					consosle.log("NUMBER PAGE:", data.length);
					var html = "";
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
								'<td>' + '<a href="delete/'+ value.student_id +'"><button type="button" class="btn">DELETE</button></a>'+'</td>' +
								'<td>' + '<a href="edit/'+ value.student_id +'"><button type="button" class="btn">EDIT</button></a>'+'</td>' +
			                '</tr>';
					});
					var pageNumber;
					if(data.length % 2 != 0) {
						pageNumber = data.length/2 + 1;
					} else {
						pageNumber = data.length/2;
					}
					var i = 1;
					while(pageNumber > 0) {
						html +=/*  '<a href="http://localhost:8185/SpringMVC/student/search/'+i+'/'+search+"></a>'; */i;
						i++;
						pageNumber--;
					}


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