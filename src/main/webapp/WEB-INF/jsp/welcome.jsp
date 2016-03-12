<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

<body>
	<c:url value="/public/test.html" var="url"/>
	Message: ${message}
	<br/>
	Date and time:  ${time}
	<br/>
	<a href="${url}">Test Application</a>
</body>

</html>