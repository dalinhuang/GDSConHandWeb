<%@ page 
	language="java" 
	contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
	<title>IPS - Map Management - Map Upload Success</title>
</head>

<body>
<div class="page-header">
	<h1>Map Upload Success</h1>
</div>

<div class="container-fluid">
	<div class="row-fluid">
		<div class="span12">
			<ul>
		        <li>ContentType: <s:property value="uploadContentType" /></li>
		        <li>FileName: <s:property value="uploadFileName" /></li>
		        <li>File: <s:property value="upload" /></li>
		        <li>Caption:<s:property value="caption" /></li>
	        </ul>
		</div>
	</div>
</div>

</body>
</html>

