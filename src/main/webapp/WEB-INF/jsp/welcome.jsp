<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">

<body>
    <c:url value="/test" var="urlTest"/>
    <c:url value="/logout" var="urlLogOut"/>
    Message: ${message}
    <br/>
    Date and time: ${time}
    <br/>
    <a href="${urlTest}">Test Application</a>
    <br/>
    <form action="${urlLogOut}" method="post">
        <input type="submit" value="Sign Out"/>
    </form>

</body>

</html>