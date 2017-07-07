<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<jsp:include page="header.jsp" />
<body>
	<div id="container">
		<h3>Sign in</h3>
		<%-- <spring:form  method="post" modelAttribute="user" action="http://localhost:8184/SpringMVC/student/logout" >
			<table id="form-table">
				<tbody>
				<tr>
					<td class="title">Name</td>
					<td class="input">
						<spring:input path="student_name" placeholder="Name" class="txt" /></br>
						<spring:errors path="student_name" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<td class="title">Code</td>
					<td class="input">
						<spring:input path="student_code" placeholder="Code" class="txt"/></br>
						<spring:errors path="student_code" cssClass="error"/>
					</td>

				</tr>
				<tr>
					<td class="title">Address</td>
					<td class="input">
						<spring:input path="address" placeholder="Address" class="txt"/></br>
						<spring:errors path="address" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="submit" id="button-submit" value="Add">
						<a href="<%= request.getContextPath() %>/student/list">
							<input type="button" id="button-reset" value="Back">
						</a>
					</td>
				</tr>
				</tbody>
			</table>
		</spring:form> --%>
	</div>
<jsp:include page="footer.jsp" />
</body>
</html>
