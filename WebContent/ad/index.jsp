<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title><s:text name="ad.index_page_title" /></title>

<!-- dhtmlxGrid -->

<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxCalendar/codebase/dhtmlxcalendar.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxCalendar/codebase/skins/dhtmlxcalendar_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>
<script src="../dhtmlx/dhtmlxCalendar/codebase/dhtmlxcalendar.js"></script>
<script
	src="../dhtmlx/dhtmlxGrid/codebase/excells/dhtmlxgrid_excell_dhxcalendar.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_json.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_pgn.js"></script>

<!-- dhtmlxDataProcessor -->
<script
	src="../dhtmlx/dhtmlxDataProcessor/codebase/dhtmlxdataprocessor.js"></script>

<!-- dhtmlxLayout -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxLayout/codebase/dhtmlxlayout.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxLayout/codebase/skins/dhtmlxlayout_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxLayout/codebase/dhtmlxlayout.js"></script>
<script src="../dhtmlx/dhtmlxLayout/codebase/dhtmlxcontainer.js"></script>

<!--  
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxCalendar/codebase/dhtmlxcalendar.css">
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxCalendar/codebase/skins/dhtmlxcalendar_dhx_skyblue.css">
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_json.js"></script>
<script src="../dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_pgn.js"></script>
-->


<!-- dhtmlxToolbar  -->
<link rel="stylesheet" type="text/css"
	href="../dhtmlx/dhtmlxToolbar/codebase/skins/dhtmlxtoolbar_dhx_skyblue.css"></link>
<script src="../dhtmlx/dhtmlxTabbar/codebase/dhtmlxcontainer.js"></script>
<script type="text/javascript"
	src="../dhtmlx/dhtmlxToolbar/codebase/dhtmlxtoolbar.js"></script>



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
	</div>
	<script>
		var dhxLayout = null;
		var dhxToolbar = null;
		var dhxGrid = null;
		var dhxDataProcessor = null;

		var globalXmlHttpRequest = null;

		var selectedRow = -1;

		// can not add to body onload="doOnLoad()", this is because SiteMesh already
		// add a onload event
		doOnLoad();

		function doOnLoad() {
			dhxLayout = new dhtmlXLayoutObject("parentId", "2E");
			dhxLayout.setEffect('resize', true);

			dhxLayout.cells("a").setText("AD List");
			dhxLayout.cells("b").setText("Create New AD");

			dhxLayout.cells("a").setHeight(500);
			dhxLayout.cells("b").setHeight(200);

			dhxGrid = dhxLayout.cells("a").attachGrid();
			dhxToolbar = dhxLayout.cells("a").attachToolbar();

			//dhxToolbar = new dhtmlXToolbarObject("toolbar");
			//dhxGrid = new dhtmlXGridObject('ad-list');

			loadToolbar();

			loadGridByXml();
		}

		function loadToolbar() {
			dhxToolbar.setIconsPath("../dhtmlx/dhtmlxToolbar/common/imgs/");

			dhxToolbar.addButton("add", 0, "Add", "new.gif", "new_dis.gif");
			dhxToolbar.addButton("delete", 1, "Delete", "delete.gif",
					"delete_dis.gif");
			dhxToolbar.addSeparator("separator1", 2);
			dhxToolbar.addButton("save", 3, "Save", "save.gif", "save_dis.gif");

			dhxToolbar.attachEvent("onClick", function(id) {
				if (id == "add") {
					if (confirm("Are you sure to add one row")) {
						dhxGrid.addRow((new Date()).valueOf(), '', dhxGrid
	                            .getRowIndex(dhxGrid.getSelectedId()));
					}
				} else if (id == "delete") {
					//dhxGrid.deleteRow(dhxGrid.getSelectedId());
					if (confirm("Are you sure to delete this row")) {
						dhxGrid.deleteSelectedItem();
					}
				} else if (id == "save") {
					dhxDataProcessor.sendData();
				} else {
					// n/a
				}
			});
		}

		function doBeforeRowDeleted(rowId) {
			if (confirm("Are you sure to delete row")) {
				//protocolIt("Row deletion confirmed");
				return true;
			} else {
				//protocolIt("Row deletion canceled");
				return false;
			}
		}

		function loadGridByXml() {
			dhxGrid.selMultiRows = true;
			dhxGrid.setImagePath("../dhtmlx/dhtmlxGrid/codebase/imgs/");
			dhxGrid.setHeader("AD,Position,URL,Duration,From Date,To Date");
			dhxGrid.setInitWidths("*,100,100,100,100,100");
			dhxGrid.setColAlign("center,center,center,center,center,center");
			dhxGrid.setColTypes("img,ed,ed,ed,dhxCalendar,dhxCalendar");
			dhxGrid.setColSorting("str,str,str,int,date,date");
			dhxGrid.enableAutoWidth(true);
			dhxGrid.setDateFormat("%Y-%m-%d");
			dhxGrid.setSkin("dhx_skyblue");
			dhxGrid.enableColumnAutoSize(true);
			dhxGrid.enableMultiline(true);

			// attach events
			//dhxGrid.attachEvent("onBeforeRowDeleted", doBeforeRowDeleted);

			dhxGrid.init();

			dhxGrid.loadXML("listXml.action");

			dhxGrid
					.attachFooter(
							"<div id='recinfoArea'></div>,#cspan,#cspan,#cspan,#cspan,#cspan",
							[ "text-align:left;" ]);
			dhxGrid.enablePaging(true, 10, 3, "recinfoArea"); //document.getElementById("recinfoArea")
			dhxGrid.setPagingSkin("toolbar", "dhx_skyblue");

			dhxDataProcessor = new dataProcessor("update.action");
			dhxDataProcessor.setTransactionMode("POST", true);
			//set mode as send-all-by-post;
			dhxDataProcessor.setUpdateMode("off");
			dhxDataProcessor.enableUTFencoding(true);

			// validation
			dhxDataProcessor.setVerificator(0, not_empty);
			dhxDataProcessor.setVerificator(1, not_empty);
			dhxDataProcessor.setVerificator(2, not_empty);
			dhxDataProcessor.setVerificator(3, greater_0);
			dhxDataProcessor.setVerificator(4, not_empty);
			dhxDataProcessor.setVerificator(5, not_empty);
			
			dhxDataProcessor.attachEvent("onValidatationError", function(id,
					messages) {
				alert(messages.join("\n"));
				return true;
				//confirm block 
			});

			dhxDataProcessor.init(dhxGrid);
		}

		function not_empty(value, id, ind) {
			if (value == "")
				;
			return "Value at (" + id + ", " + ind + ") can't be empty";
			return true;
		}

		function greater_0(value, id, ind) {
			if (parseFloat(value) <= 0)
				return "Value at (" + id + ", " + ind
						+ ") must be greater than 0";
			return true;
		}

		function loadGridByJson() {
			dhxGrid.selMultiRows = true;
			dhxGrid.setImagePath("../dhtmlx/dhtmlxGrid/codebase/imgs/");
			dhxGrid.setHeader("AD,Position,URL,Duration,From Date,To Date");
			dhxGrid
					.setColumnIds("ad.thumbnailImgUrl,positions,ad.url,ad.duration,ad.fromDate,ad.toDate");
			dhxGrid.setInitWidths("*,200,100,150,150,200");
			dhxGrid.setColAlign("center,center,center,center,center,center");
			dhxGrid.setColTypes("img,ed,ed,ed,dhxCalendar,dhxCalendar");
			dhxGrid.setColSorting("str,str,str,int,date,date");
			dhxGrid.enableAutoWidth(true);
			dhxGrid.setDateFormat("%Y-%m-%d %H:%i");
			dhxGrid.setSkin("dhx_skyblue");

			dhxGrid.attachEvent("onBeforeRowDeleted", doBeforeRowDeleted);

			dhxGrid.init();

			dhxGrid
					.attachFooter(
							"<div id='recinfoArea'></div>,#cspan,#cspan,#cspan,#cspan,#cspan",
							[ "text-align:left;" ]);
			dhxGrid.enablePaging(true, 10, 3, "recinfoArea"); //document.getElementById("recinfoArea")
			dhxGrid.setPagingSkin("toolbar", "dhx_skyblue");

			initXmlHttpRequest();

			//var serverUrl = "http://localhost:8080/wips/ad/list.action";
			var serverUrl = "/wips/ad/list.action";
			loadXMLDocGate(serverUrl);

		}

		//============================================================================================;
		function not_empty(value) {
			return value != "";
		}
		function greater_0(value) {
			return value > 0;
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

		function loadXMLDocGate(url) {
			loadXMLDoc(url, handleXmlHttpResponse);
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

					//document.getElementById("ad-list").innerHTML = globalXmlHttpRequest.responseText;

					var data;
					try {
						data = JSON.parse(result);
					} catch (exception) {
						alert(exception);
					}

					//alert(data.data[0].url);
					//alert(data.ads[0].url);

					try {
						dhxGrid.parse(data, "js");
					} catch (exception) {
						alert(exception);
					}

					//dhxGrid.forEachRow(function(id) {
					//any custom code here 
					//id - row's id
					//set row userdata
					// mygrid.setUserData(id,"operation","/wips/img/delete.png");
					//  dhxGrid.cells(id, 2).setValue(
					//          "/wips/img/delete.png");
					//});
				}
			}
		}
	</script>
</body>
</html>