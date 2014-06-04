<%@taglib uri="/struts-tags" prefix="s"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; UTF-8">
<link
	href="<s:url value='/styles/main.css' encode='false' includeParams='none'/>"
	rel="stylesheet" type="text/css" media="all" />
<title>Login</title>
</head>

<body>
	<div class="login_center">
		<div class="error ${param.error == true ? '' : 'hide'}">
			${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message}</div>
		<form
			action="${pageContext.request.contextPath}/j_spring_security_check"
			method="post" class="login_form">
			<fieldset>
				<legend>
					<s:text name="label.welcome_login" />
				</legend>
				<p>
					<s:textfield key="label.username" name="j_username" />
					<s:fielderror fieldName="j_username" />
				</p>
				<p>
					<s:password key="label.password" name="j_password" />
					<s:fielderror fieldName="j_password" />
				</p>
				<p>
					<s:checkbox key="label.remember_me"
						name="_spring_security_remember_me" />

					<s:fielderror fieldName="_spring_security_remember_me" />
				</p>
				<p>
					<s:submit key="label.submit" name="submit" />
					<s:reset key="label.reset" name="reset" />
				</p>
			</fieldset>
		</form>
	</div>
</body>
</html>

