<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><s:text name="system.user.user_management" /></title>


<!-- dhtmlxTabbar -->
<link rel="STYLESHEET" type="text/css"
	href="../dhtmlx/dhtmlxTabbar/codebase/dhtmlxtabbar.css">
<script src="../dhtmlx/dhtmlxTabbar/codebase/dhtmlxcommon.js"></script>
<script src="../dhtmlx/dhtmlxTabbar/codebase/dhtmlxtabbar.js"></script>

<!-- dhtmlxGrid -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_json.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_pgn.js"></script>

<!-- dhtmlxToolbar -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxToolbar/codebase/skins/dhtmlxtoolbar_dhx_skyblue.css"></link>
<script src="../dhtmlx/dhtmlxTabbar/codebase/dhtmlxcontainer.js"></script>
<script type="text/javascript"
	src="../dhtmlx/dhtmlxToolbar/codebase/dhtmlxtoolbar.js"></script>

<!-- dhtmlxLayout -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxLayout/codebase/dhtmlxlayout.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxLayout/codebase/skins/dhtmlxlayout_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxLayout/codebase/dhtmlxlayout.js"></script>
<script src="../dhtmlx/dhtmlxLayout/codebase/dhtmlxcontainer.js"></script>

<!-- dhtmlxTree -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxTree/codebase/dhtmlxtree.css">
<script src="../dhtmlx/dhtmlxTree/codebase/dhtmlxtree.js"></script>


<style>
.toolbarTable {
	background-color: #EDEDED;
}

.dhx_header_cmenu {
	background-color: #ffffff;
	border: 2px outset silver;
	z-index: 2;
}

.dhx_header_cmenu_item {
	white-space: nowrap;
}
</style>

</head>
<body>

	<div class="container-fluid1">
		<div class="row-fluid">
			<div class="span12">

				<div class="hero-unit1">
					<div id="parentId" class="layout-container"></div>
				</div>
			</div>
		</div>

		<script>
			var mygrid = null;
			var globalXmlHttpRequest = null;
			var dhxLayout, dhxTree;

			// can not add to body onload="doOnLoad()", this is because SiteMesh already
			// add a onload event
			doOnLoad();

			function doOnLoad() {
				dhxLayout = new dhtmlXLayoutObject("parentId", "2U");
				
				dhxLayout.setEffect('resize', true);

				dhxTree = dhxLayout.cells("a").attachTree();
				dhxLayout.cells("a").setWidth(250);
				//dhxLayout.cells("b").setWidth(*);

				dhxTree
						.setImagePath("../dhtmlx/dhtmlxTree/codebase/imgs/csh_vista/");
				dhxTree
						.loadXML("../dhtmlx/dhtmlxLayout/samples/common/tree.xml?etc="
								+ new Date().getTime());

				dhxTree.enableTreeLines(true);
				dhxTree.enableTreeImages(false);
				dhxTree.enableTextSigns(false);
				dhxTree.enableDragAndDrop(true);

				dhxTree.setOnClickHandler(tonclick);
				//mygrid.clearAll();

			}

			function doLog(str) {
				// var log = document.getElementById("logarea");
				//log.innerHTML = log.innerHTML + str + "<br/>";
				// log.scrollTop = log.scrollHeight;
				// alert(str);
			}

			function tonclick(id) {
				doLog("Item " + id + " was selected");

				if (id == "lb_1") {

					// prepare status bar
					var dhxStatusBar = dhxLayout.cells("b").attachStatusBar();
					dhxStatusBar.setText("<div id='recinfoArea'></div>");

					mygrid = dhxLayout.cells("b").attachGrid();

					//mygrid = new dhtmlXGridObject('gridbox');
					mygrid.selMultiRows = true;
					mygrid.setImagePath("../dhtmlx/dhtmlxGrid/codebase/imgs/");
					mygrid.setHeader("User ID,First Name,Last Name,User Name");
					mygrid.setColumnIds("id,firstName,lastName,username");
					mygrid.setInitWidths("70,200,200,*");
					mygrid.setColAlign("center,center,center,center");
					mygrid.setColTypes("ro,ed,ed,ed");
					mygrid.setColSorting("int,str,str,str");

					//start grid
					mygrid.setSkin("dhx_skyblue");
					mygrid.enablePaging(true, 10, 3, "recinfoArea");
					mygrid.setPagingSkin("toolbar", "dhx_skyblue");

					mygrid.init();

					initXmlHttpRequest();

					var serverUrl = "/wips/user/list.action";
					loadXMLDocGate(serverUrl);
				}
			};

			function initXmlHttpRequest() {
				if (globalXmlHttpRequest == null) {
					if (window.XMLHttpRequest) {
						// code for IE7+, Firefox, Chrome, Opera, Safari
						globalXmlHttpRequest = new XMLHttpRequest();
					} else {
						// code for IE6, IE5
						globalXmlHttpRequest = new ActiveXObject(
								"Microsoft.XMLHTTP");
					}
				}
			}

			function loadXMLDoc(url, callbackFunction) {
				try {
					globalXmlHttpRequest.onreadystatechange = callbackFunction;
					globalXmlHttpRequest.open("GET", url, true);
					globalXmlHttpRequest.send();
				} catch (exception) {
					alert("XmlHttpRequest Fail");
				}
			}

			function handleXmlHttpResponse() {
				if (globalXmlHttpRequest.readyState == 4) {
					if (globalXmlHttpRequest.status == 200
							|| globalXmlHttpRequest.status == 0) {
						var result = globalXmlHttpRequest.responseText;

						//document.getElementById("gridbox").innerHTML = globalXmlHttpRequest.responseText;
						//var jsonData = eval("(" + result + ")");
						//document.getElementById("gridbox").innerHTML = jsonData;

						var data = JSON.parse(result);

						//document.getElementById("gridbox").innerHTML = data;
						try {
							mygrid.parse(data, "js");
						} catch (exception) {
							alert("parse json exception.");
						}
					}
				}
			}

			function loadXMLDocGate(url) {
				loadXMLDoc(url, handleXmlHttpResponse);
			}
		</script>
</body>
</html>