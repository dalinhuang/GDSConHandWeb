<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title><s:text name="nav.neighbor_title" /></title>

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

<!-- dhtmlxForm -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxForm/codebase/skins/dhtmlxform_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxForm/codebase/dhtmlxcommon.js"></script>
<script src="../dhtmlx/dhtmlxForm/codebase/dhtmlxform.js"></script>

</head>

<body>

	<div class="container-fluid1">
		<div class="row-fluid">
			<div class="span12">

				<div class="hero-unit1">
					<div id="parentId" class="layout-container">
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script>
			var dhxLayout = null;
			var dhxGrid = null;
			var dhxForm = null;
			var dhxFormData = null;

			var globalXmlHttpRequest = null;

			// can not add to body onload="doOnLoad()", this is because SiteMesh already
			// add a onload event
			doOnLoad();

			function doOnLoad() {
				dhxLayout = new dhtmlXLayoutObject("parentId", "2E");
				
				dhxLayout.cells("a").setText("Neighbor List");
				dhxLayout.cells("b").setText("Creat New Neighbor");
				
				dhxLayout.setEffect('resize', true);

				// prepare status bar
				var dhxStatusBar = dhxLayout.cells("a").attachStatusBar();
				dhxStatusBar.setText("<div id='recinfoArea'></div>");

				dhxGrid = dhxLayout.cells("a").attachGrid();
				dhxLayout.cells("a").setHeight(500);
	            dhxLayout.cells("b").setHeight(200);

				loadGrid();

				initFormData();

				dhxForm = dhxLayout.cells("b").attachForm(dhxFormData);
				dhxForm.attachEvent("onButtonClick", function(name) {
			        logEvent("onButtonClick event called, item name '" + name + "'<br>");
			    });
			}
			
			function logEvent(t, name, command) {
			    alert(t);
			}

			function initFormData() {
				dhxFormData = [ {
					type : "settings",
					position : "label-left",
					labelWidth : 100,
					inputWidth : 120
				}, {
					type : "input",
					name : "fromMap",
					tooltip : "Enter From Map ID Here",
					label : "From Map ID",
					value : ""
				}, {
					type : "input",
					name : "toMap",
					label : "To Map ID",
					tooltip : "Enter To Map ID Here",
					value : ""
				}, {
					type : "button",
					value : "Add",
					name: "button_add"
				} ];

			}

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

						//document.getElementById("parentId").innerHTML = globalXmlHttpRequest.responseText;

						var data = JSON.parse(result);

						try {
							dhxGrid.parse(data, "js");
						} catch (exception) {
							alert("parse json exception.");
						}
						
						dhxGrid.forEachRow(function(id){
						      //any custom code here 
						      //id - row's id
							   //set row userdata
							  // mygrid.setUserData(id,"operation","/wips/img/delete.png");
							   //dhxGrid.cells(id, 2).setValue("/wips/img/delete.png");
						   });
					}
				}
			}

			function loadXMLDocGate(url) {
				loadXMLDoc(url, handleXmlHttpResponse);
			}

			function loadGrid() {
				dhxGrid.selMultiRows = true;
				dhxGrid.setImagePath("../dhtmlx/dhtmlxGrid/codebase/imgs/");
				dhxGrid.setHeader("ID,From Map ID,To Map ID");
				dhxGrid.setColumnIds("id,fromMap,toMap");
				dhxGrid.setInitWidths("*,200,200");
				dhxGrid.setColAlign("center,center,center");
				dhxGrid.setColTypes("ro,ed,ed");
				dhxGrid.setColSorting("int,int,int");
				dhxGrid.enableAutoWidth(true);

				//start grid
				dhxGrid.setSkin("dhx_skyblue");
				dhxGrid.enablePaging(true, 10, 3, "recinfoArea");
				dhxGrid.setPagingSkin("toolbar", "dhx_skyblue");
	
				dhxGrid.init();

				initXmlHttpRequest();

				var serverUrl = "/wips/nav/list_neighbor.action";
				loadXMLDocGate(serverUrl);
			}
			
			function doOnCellEdit(stage, rowId, cellInd) {
			    if (stage == 0) {
			        alert("User starting cell editing: row id is" + rowId + ", cell index is " + cellInd);
			    } else if (stage == 1) {
			        alert("Cell editor opened");
			    } else if (stage == 2) {
			        alert("Cell editor closed");
			    }
			    return true;
			}

		</script>
</body>
</html>