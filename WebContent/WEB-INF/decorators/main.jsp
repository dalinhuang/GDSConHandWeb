<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<%@taglib prefix="decorator"
	uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%@taglib prefix="page" uri="http://www.opensymphony.com/sitemesh/page"%>
<%@taglib prefix="s" uri="/struts-tags"%>

<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Indoor Positing System">
<meta name="author" content="Ericsson">

<title><decorator:title default="IPS" /></title>

<link
	href="<s:url value='/styles/bootstrap.css' encode='false' includeParams='none'/>"
	rel="stylesheet" type="text/css" media="all">
<link
	href="<s:url value='/styles/bootstrap-responsive.css' encode='false' includeParams='none'/>"
	rel="stylesheet" type="text/css" media="all">
<link
	href="<s:url value='/styles/main.css' encode='false' includeParams='none'/>"
	rel="stylesheet" type="text/css" media="all" />

<script
	src="<s:url value='/js/jquery-1.8.2.min.js' encode='false' includeParams='none'/>"></script>
<script
	src="<s:url value='/js/bootstrap.min.js' encode='false' includeParams='none'/>"></script>
<script
	src="<s:url value='/js/main.js' encode='false' includeParams='none'/>"></script>
<script type="text/javascript">
	$(function() {
		$('.dropdown-toggle').dropdown();
		var alerts = $('ul.alert').wrap('<div />');
		alerts
				.prepend('<a class="close" data-dismiss="alert" href="#">&times;</a>');
		alerts.alert();
	});
</script>

<!-- Prettify -->
<link
	href="<s:url value='/styles/prettify.css' encode='false' includeParams='none'/>"
	rel="stylesheet">
<script
	src="<s:url value='/js/prettify.js' encode='false' includeParams='none'/>"></script>

<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<decorator:head />
</head>

<body id="page-home" onload="prettyPrint();">

	<div class="navbar navbar-fixed-top">
		<!-- Banner -->
		<!-- <div class="navbar-inner1">
			<img src="<%=request.getContextPath() %>/images/ericsson.png" />
			
		</div>  -->
		<!-- Menu bar -->
		<div class="navbar-inner">
			<div class="container-fluid">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a>

				<s:a value="/default.jsp" cssClass="brand">
					<img alt="Ericcson" src="<%=request.getContextPath() %>/images/ericsson.png">
					<s:text name="system.name" />
				</s:a>
				<div class="nav-collapse">
					<ul class="nav">
						<li><s:a value="/default.jsp">
								<i class="icon-home"></i>
								<s:text name="menu.index" />
							</s:a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.map" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="map" namespace="/map" /> <s:a
										href="%{#url}">
										<s:text name="menu.map.map" />
									</s:a></li>
								<li><s:url var="url" action="building" namespace="/map" />
									<s:a href="%{#url}">
										<s:text name="menu.map.building" />
									</s:a></li>
								<li><s:url var="url" action="position" namespace="/map" />
									<s:a href="%{#url}">
										<s:text name="menu.map.position" />
									</s:a></li>
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.nav" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="neighbor" namespace="/nav" />
									<s:a href="%{#url}">
										<s:text name="menu.nav.neighbor" />
									</s:a></li>
								<li><s:url var="url" action="node" namespace="/nav" /> <s:a
										href="%{#url}">
										<s:text name="menu.nav.node" />
									</s:a></li>
								<li><s:url var="url" action="pair" namespace="/nav" /> <s:a
										href="%{#url}">
										<s:text name="menu.nav.pair" />
									</s:a></li>
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.emergency" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="trace" namespace="/emergency" />
									<s:a href="%{#url}">
										<s:text name="menu.emergency.trace" />
									</s:a></li>
								<li><s:url var="url" action="urgentNotice"
										namespace="/emergency" /> <s:a href="%{#url}">
										<s:text name="menu.emergency.pre_notice" />
									</s:a></li>
								<li><s:url var="url" action="normal_notice"
										namespace="/emergency" /> <s:a href="%{#url}">
										<s:text name="menu.emergency.normal_notice" />
									</s:a></li>
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.public" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="bus" namespace="/public" /> <s:a
										href="%{#url}">
										<s:text name="menu.public.bus" />
									</s:a></li>
								<li><s:url var="url" action="metro" namespace="/public" />
									<s:a href="%{#url}">
										<s:text name="menu.public.metro" />
									</s:a></li>
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.ad" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="index" namespace="/ad" /> <s:a
										href="%{url}">
										<s:text name="menu.ad.item" />
									</s:a></li>
								<!-- <li><s:url var="url" action="index" namespace="/ad" /> <s:a
										href="%{url}">
										<s:text name="menu.ad.customer" />
									</s:a></li> -->
							</ul></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="menu.system" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="index" namespace="/user" />
										<s:a href="%{url}">
											<s:text name="menu.system.user" />
										</s:a></li>
								<!--  <li><s:a value="/user/index.jsp">User Management</s:a></li> -->
								<!-- <li><s:a value="/user/user.jsp">
										<s:text name="menu.system.settings" />
									</s:a></li> -->
							</ul></li>
						<!--  <li><s:a value="/interactive/index.jsp">Interactive Demo</s:a></li>  -->
						
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><s:text name="地图选择" /><b
								class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><s:url var="url" action="index" namespace="/user" />
										<s:a href="../nodeedit.jsp">
											<s:text name="信息港A栋" />
										</s:a></li>
								<!--  <li><s:a value="/user/index.jsp">User Management</s:a></li> -->
								<!-- <li><s:a value="/user/user.jsp">
										<s:text name="menu.system.settings" />
									</s:a></li> -->
							</ul></li>
						<!--  <li><s:a value="/interactive/index.jsp">Interactive Demo</s:a></li>  -->
						
					</ul>

					<ul class="nav pull-right">
						<li class="dropdown last"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown"><i class="icon-flag"></i> <s:text
									name="menu.help" /><b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="http://struts.apache.org/mail.html"><i
										class="icon-share"></i> <s:text name="menu.help.documentation" /></a></li>
								<li><a href="http://struts.apache.org/2.x/"><i
										class="icon-share"></i> <s:text name="menu.help.faq" /></a></li>
							</ul></li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>
	</div>

	<decorator:body />

	<footer id="footer" class="footer">
		<div class="navbar-footer">
			<div class="pull-right">
				<!-- end branding -->

				<p>
					<s:text name="system.name" />
				</p>
				<!-- end search -->
			</div>

			<div class="pull-left">
				<p>Copyright &copy; 2013 Ericsson</p>
			</div>

		</div>
	</footer>
</body>
</html>
