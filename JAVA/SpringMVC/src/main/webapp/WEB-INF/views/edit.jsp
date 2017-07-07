<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<%@page import="com.nmquang.model.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<jsp:include page="header.jsp" />

<body>

	<% Student student = (Student)request.getAttribute("student"); %>
	<div id="container">
		<h3>EDIT STUDENT</h3>
		<spring:form method = "POST" commandName="student" action="http://localhost:8080/SpringMVC/student/update">
			<table id="form-table">
				<tbody>
				<tr>
					<td class="title">ID</td>
					<td class="input">
						<spring:input path="student_id" value='<%= student.getStudent_id() %>' class="txt" readonly="true"/></br>
						<spring:errors path="student_id" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<td class="title">Name</td>
					<td class="input">
						<spring:input path="student_name" value='<%= student.getStudent_name() %>' class="txt" /></br>
						<spring:errors path="student_name" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<td class="title">Code</td>
					<td class="input">
						<spring:input path="student_code" value ='<%= student.getStudent_code() %>' class="txt"/></br>
						<spring:errors path="student_code" cssClass="error"/>
					</td>

				</tr>
				<tr>
					<td class="title">Address</td>
					<td class="input">
						<spring:input path="address" value ='<%= student.getAddress() %>' class="txt"/></br>
						<spring:errors path="address" cssClass="error"/>
					</td>

				<tr>
					<td class="title">Average_score</td>
					<td >

						<spring:input path="average_score" value='<%=student.getAverage_score()%>' class="txt"/></br>
						<spring:errors path="average_score" cssClass="error"/>
					</td>
				</tr>

				<tr>
					<td class="title">Date of birth</td>
					<td >
						<fmt:formatDate pattern="MM/dd/yyyy" value='<%= student.getDate_of_birth()%>' var="date_format"/>
						<spring:input path="date_of_birth" value="" id="idDateField" class="txt"/></br>
						<spring:errors path="date_of_birth" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="submit" id="button-submit" value="Edit">
						<a href="<%= request.getContextPath() %>/student/lists">
							<input type="button" id="button-reset" value="Back">
						</a>
					</td>
				</tr>
				</tbody>
			</table>
		</spring:form>
	</div>
	<jsp:include page="footer.jsp" />
</body>
</html>