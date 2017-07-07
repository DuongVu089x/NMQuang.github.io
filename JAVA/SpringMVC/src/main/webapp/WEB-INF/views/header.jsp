<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>HOME STUDENT</title>
<link href="<c:url value="/resources/css/hello.css"/>" rel="stylesheet">
<link href="<c:url value="/resources/css/bootstrap.min.css"/>" rel="stylesheet">
<link href="<c:url value="/resources/css/style.css"/>"  rel="stylesheet">
<link href="<c:url value="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"/>"  rel = "stylesheet">
<script src="<c:url value="/resources/js/hello.js"/>"></script>
<script src="<c:url value="/resources/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="/resources/js/jquery-3.1.1.min.js"/>"></script>
<script src="<c:url value="/resources/js/jquery-ui-1.12.1/jquery-ui.js"/>"></script>
<script type="text/javascript">
      $(function() {
          $('#idDateField').datepicker();
      });
 </script>
</head>
