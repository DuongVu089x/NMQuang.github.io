<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring"
	uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="header.jsp" />
<body>
	<div class="container">
		<h3>Login</h3>
		<div>
			<%
				String mess = (String)request.getAttribute("mess");
				if(mess == null) {
					mess = "";
				}
			%>
			<h1 style="text-align: center"><%= mess %></h1>
		</div>

	    <spring:form method="post" modelAttribute="user" action="http://localhost:8080/SpringMVC/student/login">
		    <div class="form-group row">
		      <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
		      <div class="col-sm-10">
		        <spring:input type="text" class="form-control" id="inputEmail3" placeholder="Username" path="user_name" />
		        <spring:errors path="user_name" cssClass="error"/>
		      </div>
		    </div>
		    <div class="form-group row">
		      <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
		      <div class="col-sm-10">
		        <spring:input type="password" class="form-control" id="inputPassword3" placeholder="Password" path="password" />
		        <spring:errors path="password" cssClass="error"/>
		      </div>
		    </div>
		    <div class="form-group row">
		      <div class="offset-sm-2 col-sm-10">
		        <button type="submit" class="btn btn-primary">Login</button>
		      </div>
		    </div>
	     </spring:form>
	 </div>
</body>
</html>