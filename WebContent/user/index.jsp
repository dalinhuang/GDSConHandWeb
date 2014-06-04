<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>User Management</title>
<link rel="stylesheet" type="text/css" media="screen"
	href="../jqGrid/themes/redmond/jquery-ui-custom.css" />
<link rel="stylesheet" type="text/css" media="screen"
	href="../jqGrid/themes/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen"
	href="../jqGrid/themes/ui.multiselect.css" />

<script src="../jqGrid/js/jquery.js" type="text/javascript"></script>
<script src="../jqGrid/js/jquery-ui-custom.min.js"
	type="text/javascript"></script>
<script src="../jqGrid/js/jquery.layout.js" type="text/javascript"></script>
<script src="../jqGrid/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script type="text/javascript">
	$.jgrid.no_legacy_api = true;
	$.jgrid.useJSON = true;
</script>
<script src="../jqGrid/js/ui.multiselect.js" type="text/javascript"></script>
<script src="../jqGrid/js/jquery.jqGrid.js" type="text/javascript"></script>
<script src="../jqGrid/js/jquery.tablednd.js" type="text/javascript"></script>
<script src="../jqGrid/js/jquery.contextmenu.js" type="text/javascript"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">

				<div class="hero-unit">
					<table id="list2">
					</table>
					<div id="pager2"></div>
				</div>

			</div>
		</div>
	</div>
	<script type="text/javascript">
		/*
		Actually, it sends 'http://localhost:8080/wips/user/listUsers.action?_search=false&nd=1380089041942&rows=10&page=1&sidx=id&sord=desc':
		 */
		jQuery("#list2").jqGrid({
			url : '/wips/user/listUsers.action',
			datatype : "json",
			colNames : [ 'id', 'firstName', 'lastName', 'username' ],
			colModel : [ {
				name : 'id',
				index : 'id',
				width : 55
			}, {
				name : 'firstName',
				index : 'firstName',
				width : 90
			}, {
				name : 'lastName',
				index : 'lastName',
				width : 100
			}, {
				name : 'username',
				index : 'username',
				width : 80,
				align : "right"
			} ],
			rowNum : 20,
			rowList : [ 10, 20, 30 ],
			pager : '#pager2',
			sortname : 'id',
			viewrecords : true,
			jsonReader : {
				repeatitems : false
			},
			sortorder : "asc",
			caption : "JSON Example for Users"
		});
		jQuery("#list2").jqGrid('navGrid', '#pager2', {
			edit : true,
			add : true,
			del : true
		});
	</script>

</body>
</html>