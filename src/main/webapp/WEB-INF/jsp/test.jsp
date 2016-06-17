<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url value="/public/css/styles.css" var="css"/>
<c:url value="/public/vendors.js" var="vendors"/>
<c:url value="/public/${appJs}" var="app"/>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Testing JSP</title>
    <link rel="stylesheet" href="${css}" type="text/css" />  
  </head>
  
  <body class="uportal-background-content">
    <h2>Testing React App</h2>
    
    <!-- App mounting point -->
    <div id="app"></div>

    <script src="${vendors}"></script> 
    <script src="${app}"></script> 
    
    <div>Timestamp: ${time}</div>
  
  </body>

</html>