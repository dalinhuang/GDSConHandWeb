var canvas, context, canvas_upper, ctx_up, canvas_nav, ctx_nav;
var img; //图片对象
var which_floor = 15,
scaleLevel = 3,
imgIsLoaded, //图片是否加载完成;
imgX = 0,
imgY = 0,
imgScale = 1;
var is_transit = false;
var curropIdx;

var move_finish = true;
var is_source_nav = true;

var CANVAS_OFFSET_X = 0;
var CANVAS_OFFSET_Y = 0;

var NO_NAV_INTEREST = 0;
var ONLY_NAV = 1;
var ONLY_INTEREST = 2;
var BOTH_NAV_INTEREST = 3;

var point_type = ONLY_NAV;

var curr_node;

var optStr = null;
var floorStr = null;

var WIDTH = 1200;
var HEIGHT = 800;

var offset_x = -8;
var offset_y = -26;

var currNavId = 1;
var first = true;

var curr_from_node = 0;
var curr_to_node = 0;

//创建div元素，作为自定义覆盖物的容器
var div = document.createElement("div");
var isIe = (document.all) ? true : false;
var ismove = false;
var currdiv = null;

/*
document.forms['form1']['poilabel'].value = "";
document.forms['form1']['floor'].value = "";
document.forms['form1']['xpos'].value = "";
document.forms['form1']['ypos'].value = "";
document.forms['form1']['selectInterest'].value = "0";
document.forms['form1']['detaileddesc'].value = "";
document.forms['form1']['hallid'].value = "";
document.forms['form1']['ttsid'].value = "";
document.forms['form1']['nearnavid'].value = "";
document.forms['form1']['scale'].value = "";
document.forms['form1']['alpha'].value = "";
document.forms['form1']['rotation'].value = "";
document.forms['form1']['minzoomfactor'].value = "";
document.forms['form1']['maxzoomfactor'].value = "";
document.forms['form1']['weburl'].value = "";
document.forms['form1']['picurl'].value = "";
document.forms['form1']['iconurl'].value = "";
document.forms['form1']['audiourl'].value = "";
document.forms['form1']['shareble'].value = "1";
document.forms['form1']['reachable'].value = "1";
document.forms['form1']['readable'].value = "1";
 */

var interest_x = new Array();
var interest_y = new Array();
var interest_label = new Array();
var interest_div = new Array();
var interest_floor = new Array();

var interest_type = new Array();
var interest_detaileddesc = new Array();
var interest_hallid = new Array();
var interest_ttsid = new Array();
var interest_nearnavid = new Array();
var interest_scale = new Array();
var interest_alpha = new Array();
var interest_rotation = new Array();
var interest_minzoomfactor = new Array();
var interest_maxzoomfactor = new Array();
var interest_weburl = new Array();
var interest_picurl = new Array();
var interest_iconurl = new Array();
var interest_audiourl = new Array();
var interest_reachable = new Array();
var interest_readable = new Array();
var interest_generaldesc = new Array();
var interest_shareble = new Array();

var nav_x = new Array();
var nav_y = new Array();
var nav_label = new Array();
var nav_div = new Array();
var nav_flag = new Array();
var nav_floor = new Array();
var nav_transit = new Array();

var fromNode = new Array();
var toNode = new Array();
var direction = new Array();
var forwardGuide = new Array();
var backwardGuide = new Array();

var navtransdiv = new Array();
var trans_x = new Array();
var trans_y = new Array();

function load() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas_upper = document.getElementById('line');
	ctx_up = canvas_upper.getContext('2d');

	canvas_nav = document.getElementById('nav');
	ctx_nav = canvas_nav.getContext('2d');

	var floor_ul = document.getElementById('floor_ul');
	var point_ul = document.getElementById('point_ul');
	var zoom_ul = document.getElementById('zoom_ul');

	floor_ul.style.display = "none";
	point_ul.style.display = "none";
	zoom_ul.style.display = "none";
	/*
	var     s   =   "";
	s   +=   " 网页可见区域宽："+   document.body.clientWidth;
	s   +=   " 网页可见区域高："+   document.body.clientHeight;
	s   +=   " 网页可见区域宽："+   document.body.offsetWidth     +"   (包括边线和滚动条的宽)";
	s   +=   " 网页可见区域高："+   document.body.offsetHeight   +"   (包括边线的宽)";
	s   +=   " 网页正文全文宽："+   document.body.scrollWidth;
	s   +=   " 网页正文全文高："+   document.body.scrollHeight;
	s   +=   " 网页被卷去的高："+   document.body.scrollTop;
	s   +=   " 网页被卷去的左："+   document.body.scrollLeft;
	s   +=   " 网页正文部分上："+   window.screenTop;
	s   +=   " 网页正文部分左："+   window.screenLeft;
	s   +=   " 屏幕分辨率的高："+   window.screen.height;
	s   +=   " 屏幕分辨率的宽："+   window.screen.width;
	s   +=   " 屏幕可用工作区高度："+   window.screen.availHeight;
	s   +=   " 屏幕可用工作区宽度："+   window.screen.availWidth;
	s   +=   " 你的屏幕设置是   "+   window.screen.colorDepth   +"   位彩色";
	s   +=   " 你的屏幕设置   "+   window.screen.deviceXDPI   +"   像素/英寸";
	alert(s);

	alert (window.screen.height * window.screen.width);

	//

	 */

	$("#zoom").hover(function () {
		point_ul.style.display = "none";
		floor_ul.style.display = "none";
		zoom_ul.style.display = "block";
	}, function () {
		//floor_ul.style.display = "none";
	});

	//var floor_menu = document.getElementById("floor");
	$("#floor").hover(function () {
		point_ul.style.display = "none";
		zoom_ul.style.display = "none";
		floor_ul.style.display = "block";
	}, function () {
		//floor_ul.style.display = "none";
	});

	//var floor_menu = document.getElementById("floor");
	$("#point").hover(function () {
		point_ul.style.display = "block";
		zoom_ul.style.display = "none";
		floor_ul.style.display = "none";
	}, function () {});

	$("#zoom_ul").hover(function () {}, function () {
		zoom_ul.style.display = "none";
	});

	$("#floor_ul").hover(function () {}, function () {
		floor_ul.style.display = "none";
	});

	$("#point_ul").hover(function () {}, function () {

		point_ul.style.display = "none";
	});

	var zoom_ul_1 = document.getElementById('zoom_ul_1');
	var zoom_ul_2 = document.getElementById('zoom_ul_2');

	$("#zoom_ul_1").hover(function () {
		zoom_ul_1.style.backgroundColor = "#fc0";
	}, function () {
		zoom_ul_1.style.backgroundColor = "#F2F2F2";
	});

	$("#zoom_ul_2").hover(function () {
		zoom_ul_2.style.backgroundColor = "#fc0";
	}, function () {
		zoom_ul_2.style.backgroundColor = "#F2F2F2";
	});

	var floor_ul_1 = document.getElementById('floor_ul_1');
	var floor_ul_2 = document.getElementById('floor_ul_2');

	floor_ul_1.style.background = "url(images/circle.gif) no-repeat 5px 8px";
	floor_ul_2.style.background = "";
	floor_ul_1.style.backgroundSize = "6px 6px";

	var point_ul_1 = document.getElementById('point_ul_1');
	var point_ul_2 = document.getElementById('point_ul_2');

	point_ul_1.style.background = "url(images/circle.gif) no-repeat 5px 8px";
	point_ul_2.style.background = "";
	point_ul_1.style.backgroundSize = "6px 6px";

	$("#point_ul_1").hover(function () {
		point_ul_1.style.backgroundColor = "#fc0";
	}, function () {
		point_ul_1.style.backgroundColor = "#F2F2F2";
	});

	$("#point_ul_2").hover(function () {
		point_ul_2.style.backgroundColor = "#fc0";
	}, function () {
		point_ul_2.style.backgroundColor = "#F2F2F2";
	});

	$("#floor_ul_1").hover(function () {
		floor_ul_1.style.backgroundColor = "#fc0";
	}, function () {
		floor_ul_1.style.backgroundColor = "#F2F2F2";
	});

	$("#floor_ul_2").hover(function () {
		floor_ul_2.style.backgroundColor = "#fc0";
	}, function () {
		floor_ul_2.style.backgroundColor = "#F2F2F2";
	});

	/*
	var user =   {
	"username":"andy",
	"age":20,
	"info": {"tel":"123456","cellphone":"98765"},
	"address":
	[   {"city":"beijing","postcode":"222333"},   {"city":"newyork","postcode":"555666"}
	]
	}   ;

	alert(user);

	alert(user.username);
	alert(user.age);
	alert(user.info.cellphone);
	alert(user.address[0].city);
	alert(user.address[0].postcode);
	 */

	loadImg();

	//document.getElementsByTagName('body').style.overflow = 'auto';


	$.ajax({
		type : 'post',
		url : "listpoi.action",
		dataType : 'json',
		success : function (data) {

			/*
			var interest_x = new Array();
			var interest_y = new Array();
			var interest_label = new Array();
			var interest_div = new Array();
			var interest_floor = new Array();
			var interest_type = new Array();
			var intrest_detaileddesc = new Array();
			var interest_hallid = new Array();
			var interest_ttsid = new Array();
			var interest_nearnavid = new Array();
			var interest_scale = new Array();
			var interest_alpha = new Array();
			var interest_rotation = new Array();
			var interest_minzoomfactor = new Array();
			var interest_maxzommfactor = new Array();
			var intrest_weburl = new Array();
			var interest_picurl = new Array();
			var interest_iconurl = new Array();
			var interest_audiourl = new Array();
			var interest_reachable = new Array();
			var interest_readable = new Array();
			var interest_generaldesc = new Array();
			var interest_shareble = new Array();

			$.post("updatepoi.action", {
			type : mtype,
			hallId : parseInt(document.forms['form1']['hallid'].value),
			ttsNo : parseInt(document.forms['form1']['ttsid'].value),
			mapId : which_floor,
			placeX : document.forms['form1']['xpos'].value,
			placeY : document.forms['form1']['ypos'].value,
			neareastNaviNode : parseInt(document.forms['form1']['nearnavid'].value),
			iconUrl : document.forms['form1']['iconurl'].value,
			audioUrl : document.forms['form1']['audiourl'].value,
			webUrl : document.forms['form1']['weburl'].value,
			picUrl : document.forms['form1']['picurl'].value,
			label : document.forms['form1']['poilabel'].value,
			generalDesc : document.forms['form1']['generaldesc'].value,
			detailedDesc : document.forms['form1']['detaileddesc'].value,
			shareble : mshareble,
			reachable : mreachable,
			readable : mreadable,
			scale : document.forms['form1']['scale'].value,
			alpha : document.forms['form1']['alpha'].value,
			rotation : document.forms['form1']['rotation'].value,
			maxZoomFactor : document.forms['form1']['maxzoomfactor'].value,
			minZoomFactor : document.forms['form1']['minzoomfactor'].value
			});
			 */
			for (var i = 0; i < data.data.length; i++) {
				interest_type.push(data.data[i].type);
				interest_hallid.push(data.data[i].hallId);
				interest_ttsid.push(data.data[i].ttsNo);
				interest_floor.push(data.data[i].mapId);
				interest_x.push(data.data[i].placeX);
				interest_y.push(data.data[i].placeY);
				interest_nearnavid.push(data.data[i].neareastNaviNode);
				interest_iconurl.push(data.data[i].iconUrl);
				interest_audiourl.push(data.data[i].audioUrl);
				interest_weburl.push(data.data[i].webUrl);
				interest_picurl.push(data.data[i].picUrl);
				interest_label.push(data.data[i].label);
				interest_generaldesc.push(data.data[i].generalDesc);
				interest_detaileddesc.push(data.data[i].detailedDesc);
				//interest_shareble.push(data.data[i].shareble);
				//interest_reachable.push(data.data[i].reachable);
				//interest_readable.push(data.data[i].readable);
				interest_scale.push(data.data[i].scale);
				interest_alpha.push(data.data[i].alpha);
				interest_rotation.push(data.data[i].rotation);
				interest_maxzoomfactor.push(data.data[i].maxZoomFactor);
				interest_minzoomfactor.push(data.data[i].minZoomFactor);

				if (data.data[i].shareble) {
					interest_shareble.push("1");
				} else {
					interest_shareble.push("2");
				}

				if (data.data[i].reachable) {
					interest_reachable.push("1");
				} else {
					interest_reachable.push("2");
				}

				if (data.data[i].readable) {
					interest_readable.push("1");
				} else {
					interest_readable.push("2");
				}

				var divstr = "div" + i + 1;

				initplace(interest_x[i], interest_y[i], interest_label[i], divstr);

				interest_div.push(divstr);

			}

			clearInterestDraw();

		},
		error : function (text) {}
	});

	$.ajax({
		type : 'post',
		url : "listnavinode.action",
		dataType : 'json',
		success : function (data) {
			if (data.data.length > 0) {
				var count = data.data[data.data.length - 1].id;

				currNavId = count + 1;

				for (var i = 0; i < count; i++) {
					nav_flag.push(false);
					nav_x.push(0);
					nav_y.push(0);
					nav_label.push("0");
					nav_floor.push(0);
					nav_transit.push(false);
					nav_div.push("0");
				}
			}

			for (var i = 0; i < data.data.length; i++) {
				/*
				var nav_x = new Array();
				var nav_y = new Array();
				var nav_label = new Array();
				var nav_div = new Array();
				var nav_flag = new Array();
				var nav_floor = new Array();
				var nav_transit = new Array();*/

				var id = data.data[i].id - 1;
				nav_flag[id] = true;
				nav_x[id] = data.data[i].placeX;
				nav_y[id] = data.data[i].placeY;
				nav_label[id] = data.data[i].label;
				nav_floor[id] = data.data[i].mapId;

				var divstr = "divnav" + id + 1;
				initplaceNav(nav_x[id], nav_y[id], id + 1, divstr);

				nav_div[id] = divstr;

			}

			$.ajax({
				type : 'post',
				url : "listnavipath.action",
				dataType : 'json',
				success : function (data) {

					/*
					var fromNode = new Array();
					var toNode = new Array();
					var direction = new Array();
					var forwardGuide = new Array();
					var backwardGuide = new Array();*/

					for (var i = 0; i < data.data.length; i++) {
						fromNode.push(data.data[i].fromNode);
						toNode.push(data.data[i].toNode);
						direction.push(data.data[i].direction);

						forwardGuide.push(data.data[i].forwardGuide);
						backwardGuide.push(data.data[i].backwardGuide);

						var pt1 = data.data[i].fromNode;
						var pt2 = data.data[i].toNode;

						if (nav_floor[pt1 - 1] != nav_floor[pt2 - 1]) {
							continue;
						}

						var divid = pt1 + "_" + pt2;

						var x1 = nav_x[pt1 - 1];
						var y1 = nav_y[pt1 - 1];

						var x2 = nav_x[pt2 - 1];
						var y2 = nav_y[pt2 - 1];

						var midx = (x1 + x2) / 2;
						var midy = (y1 + y2) / 2;

						initplaceLine(midx, midy, divid);
						navtransdiv.push(divid);
						trans_x.push(midx);
						trans_y.push(midy);

					}

					for (var i = 0; i < nav_transit.length; i++) {
						if (judgeTransitPt(i + 1)) {
							nav_transit[i] = true;

							var x2 = nav_x[i];
							var y2 = nav_y[i];

							initplaceNav(x2, y2 + 60, "换", i + 1 + "_transit");
							navtransdiv.push(i + 1 + "_transit");
							trans_x.push(x2);
							trans_y.push(y2 + 60);

							var trandivId = i + 1 + "_transit";
							var trandiv = document.getElementById(trandivId);
							trandiv.style.display = "none";

							initplaceLine(x2, y2 + 30, i + 1 + "_" + "0");
							navtransdiv.push(i + 1 + "_" + "0");
							trans_x.push(x2);
							trans_y.push(y2 + 30);

							var trandivlineId = i + 1 + "_" + "0";
							var trandivline = document.getElementById(trandivlineId);
							trandivline.style.display = "none";

						}
					}

					redrawAll();

				},
				error : function (text) {}
			});

			/*
			var fromNode = new Array();
			var toNode = new Array();
			var direction = new Array();
			var forwardGuide = new Array();
			var backwardGuide = new Array();
			/*
			alert(data);
			alert(data.data[0].placeX);

			alert(data.data[10]);
			alert(data.data.length);
			 */

		},
		error : function (text) {}
	});

	canvas_nav.onmousemove = function (event) {
		var pos = windowToCanvas(canvas, event.clientX, event.clientY);

		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		var str = "X=" + realX + "&nbsp;&nbsp;&nbsp;&nbsp;Y=" + realY;

		document.getElementById('coordtext').innerHTML = str;
	}

	canvas_nav.onmousedown = function (event) {

		var pos = windowToCanvas(canvas, event.clientX, event.clientY);
		ismove = false;

		if (event.ctrlKey) {
			ismove = true;
		}

		//alert(event.ctrlKey);

		//var h1 =document.getElementById('h1');
		//alert(h1);
		//h1.value = "X="+event.clientX + "Y=" + event.clientY;
		//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;


		//pop_up(pos.x, pos.y);
		// alert("X="+event.clientX + "Y=" + event.clientY);
		canvas_nav.onmousemove = function (event) {
			var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);

			realX = Math.floor((pos1.x - imgX) / imgScale);
			realY = Math.floor((pos1.y - imgY) / imgScale);

			var str = "X=" + realX + "&nbsp;&nbsp;&nbsp;&nbsp;Y=" + realY;

			document.getElementById('coordtext').innerHTML = str;

			if (!ismove) {
				return;
			}

			if (!move_finish) {
				return;
			}

			if (!event.ctrlKey) {

				return;
			}

			move_finish = false;

			canvas.style.cursor = "move";

			var x = pos1.x - pos.x;

			//ctx_up.strokeStyle='red';
			//ctx_up.lineWidth=3;

			//alert("bb");
			//ctx_up.moveTo(0, pos1.y);
			//ctx_up.lineTo(1200, pos1.y);

			//ctx_up.moveTo(pos1.x, 0);
			//ctx_up.lineTo(pos1.x, 1600);

			//alert(pos1.x);
			//alert(pos1.y);
			var y = pos1.y - pos.y;
			pos = pos1;
			imgX += x;
			imgY += y;

			onmove(x, y);

			if (point_type == ONLY_NAV || point_type == BOTH_NAV_INTEREST) {
				redrawAll();
			}

			drawImage();

			move_finish = true;
		}
		canvas_nav.onmouseup = function () {
			//canvas_nav.onmousemove = null;
			canvas_nav.onmouseup = null;
			canvas_nav.style.cursor = "default";

			var pos = windowToCanvas(canvas, event.clientX, event.clientY);

			//alert(event.clientX);
			//alert(event.clientY);
			//var h1 =document.getElementById('h1');
			//alert(h1);
			//h1.value = "X="+event.clientX + "Y=" + event.clientY;
			//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


			realX = Math.floor((pos.x - imgX) / imgScale);
			realY = Math.floor((pos.y - imgY) / imgScale);

			//alert (pos.y);

			currdiv = null;

			//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;
			if (!ismove) {
				//alert("bb");
				del_pop("id_out", "id_in");

				pop_up(pos.x, pos.y, realX, realY, true, null);
			} else {
				//canvas.style.zIndex = 1;
				//canvas_upper.style.zIndex = 2;

			}

			ismove = false;
		}
	}

}

function loadImg() {
	img = new Image();
	img.onload = function () {
		imgIsLoaded = true;
		drawImage();
	}
	img.src = "images/map.png";
	whcih_floor = 15;

	/* initplace(300, 400, "餐厅", "div1");
	initplace(100, 300, "美国", "div2");
	initplace(500, 400, "加拿大", "div3");
	initplace(300, 550, "爱立信", "div4");
	initplace(200, 60, "华为", "div5");
	initplace(700, 100, "西门子", "div6");

	initplace(30, 200, "澳大利亚", "div7");
	initplace(60, 90, "俄罗斯", "div8");
	initplace(200, 100, "摩托罗拉", "div9");
	initplace(100, 350, "广东", "div10");
	initplace(120, 150, "微软", "div11");
	initplace(700, 200, "苹果", "div12");*/

	/*div.style.position = "absolute";

	div.style.background = "url(images/blue.gif) repeat-x 0 -33px";
	div.style.color = "white";
	div.style.height = "21px";
	div.style.width = "21px";
	div.style.padding = "2px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "12px"
	document.body.appendChild(div);*/

}

function initplace(x, y, content, divid) {
	//保存map对象实例

	//创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.id = divid;
	div.style.position = "absolute";

	div.style.background = "url(images/blue.gif) repeat-x 0 -33px";
	div.style.color = "white";
	div.style.height = "21px";
	div.style.padding = "2px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "12px";
	div.style.zIndex = 3;

	x = x * imgScale + imgX + offset_x + CANVAS_OFFSET_X;
	y = y * imgScale + imgY + offset_y + CANVAS_OFFSET_Y;

	div.style.left = x + "px";
	div.style.top = y + "px";

	div.innerHTML = content;

	var span = document.createElement("span");
	div.appendChild(span);
	span.appendChild(document.createTextNode(""));

	var arrow = document.createElement("div");
	arrow.style.background = "url(images/blue.gif) no-repeat -8px -100px";
	arrow.style.position = "absolute";
	arrow.style.width = "30px";
	arrow.style.height = "12px";
	arrow.style.top = "19px";
	arrow.style.left = "0px";
	//arrow.style.overflow = "hidden";
	div.appendChild(arrow);

	var leftBar = this._leftBar = document.createElement("div");
	leftBar.style.background = "url(images/blue.gif) no-repeat -12px -2px";
	leftBar.style.position = "absolute";
	leftBar.style.width = "11px";
	leftBar.style.height = "24px";
	leftBar.style.top = "0px";
	leftBar.style.left = "-10px";
	//leftBar.style.overflow = "hidden";
	div.appendChild(leftBar);

	var rightBar = document.createElement("div");
	rightBar.style.background = "url(images/blue.gif) no-repeat -22px -2px";
	rightBar.style.position = "absolute";
	rightBar.style.width = "11px";
	rightBar.style.height = "24px";
	rightBar.style.top = "0px";
	rightBar.style.right = "-10px";
	//rightBar.style.overflow = "hidden";
	div.appendChild(rightBar);

	var bodydiv = document.getElementById("canvasdiv");

	div.style.visibility = "visible";

	bodydiv.appendChild(div);
	bodydiv.style.overflow = "hidden";
	//bodydiv.style.zIndex = 0;


	div.onmouseup = function () {
		canvas.onmousemove = null;
		canvas.onmouseup = null;
		canvas.style.cursor = "default";

		var pos = windowToCanvas(canvas, event.clientX, event.clientY);
		//var h1 =document.getElementById('h1');
		//alert(h1);
		//h1.value = "X="+event.clientX + "Y=" + event.clientY;
		//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;

		currdiv = div.id;

		is_source_nav = false;

		pop_up(pos.x + CANVAS_OFFSET_X, pos.y + CANVAS_OFFSET_Y, realX, realY, false, content);

		canvas.style.zIndex = 2;
		canvas_upper.style.zIndex = 1;

		ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	}
	div.onmouseover = function () {
		this.style.zIndex = 9999;
		this.style.background = "url(images/blue2.gif) repeat-x 0 -33px";
		this.getElementsByTagName("span")[0].innerHTML = "";
		arrow.style.background = "url(images/blue2.gif) no-repeat -8px -100px";
		leftBar.style.background = "url(images/blue2.gif) no-repeat -12px -2px";
		rightBar.style.background = "url(images/blue2.gif) no-repeat -22px -2px";
	}

	div.onmouseout = function () {
		this.style.zIndex = 3;
		this.style.cursor = 'hand'; //放上去小手状
		this.style.background = "url(images/blue.gif) repeat-x 0 -33px";
		this.getElementsByTagName("span")[0].innerHTML = "";
		arrow.style.background = "url(images/blue.gif) no-repeat -8px -100px";
		leftBar.style.background = "url(images/blue.gif) no-repeat -12px -2px";
		rightBar.style.background = "url(images/blue.gif) no-repeat -22px -2px";
	}
}

function initplaceNav(x, y, content, divid) {
	//保存map对象实例

	//创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.id = divid;
	div.className = "divclass";
	div.style.position = "absolute";

	div.style.color = "yellow";
	if (content != "换") {
		div.style.background = "red";

	} else {
		div.style.background = "green";

	}
	//div.style.opacity = 1;
	//alert(div.style.opacity);
	div.style.borderRadius = "15px";
	div.style.height = "24px";
	div.style.width = "24px";

	div.style.visibility = "visible";

	//div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "16px";
	div.style.textAlign = "center";
	//div.style.paddingTop = "3px";
	div.style.marginLeft = "auto";
	div.style.marginRight = "auto";
	div.style.lineHeight = "24px";

	div.style.zIndex = 6;

	div.style.fontWeight = "bolder";
	//div.style.fontColor = "#FFFF00";


	x = x * imgScale + imgX - 12 + CANVAS_OFFSET_X;
	y = y * imgScale + imgY - 12 + CANVAS_OFFSET_Y;

	div.style.left = x + "px";
	div.style.top = y + "px";

	div.innerHTML = content;

	var bodydiv = document.getElementById("canvasdiv");

	//alert(bodydiv);


	div.style.zIndex = 3;
	bodydiv.appendChild(div);
	bodydiv.style.overflow = "hidden";
	//bodydiv.style.zIndex = 0;


	div.onmouseup = function () {
		canvas.onmousemove = null;
		canvas.onmouseup = null;
		canvas.style.cursor = "default";

		var pos = windowToCanvas(canvas, event.clientX, event.clientY);
		//var h1 =document.getElementById('h1');
		//alert(h1);
		//h1.value = "X="+event.clientX + "Y=" + event.clientY;
		//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;

		currdiv = div.id;

		is_source_nav = true;

		pop_up(pos.x + CANVAS_OFFSET_X, pos.y + CANVAS_OFFSET_Y, realX, realY, false, content);

		canvas.style.zIndex = 2;
		canvas_upper.style.zIndex = 1;

		ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	}
	div.onmouseover = function () {
		//this.style.zIndex = 9999;
		//this.style.background = "url(blue2.gif) repeat-x 0 -33px";
		//this.getElementsByTagName("span")[0].innerHTML = "";
		//arrow.style.background = "url(blue2.gif) no-repeat -8px -100px";
		//leftBar.style.background = "url(blue2.gif) no-repeat -12px -2px";
		//rightBar.style.background = "url(blue2.gif) no-repeat -22px -2px";
	}

	div.onmouseout = function () {
		//this.style.zIndex = 3;
		//this.style.cursor = 'hand'; //放上去小手状
		//this.style.background = "url(blue.gif) repeat-x 0 -33px";
		//this.getElementsByTagName("span")[0].innerHTML = "";
		//arrow.style.background = "url(blue.gif) no-repeat -8px -100px";
		//leftBar.style.background = "url(blue.gif) no-repeat -12px -2px";
		//rightBar.style.background = "url(blue.gif) no-repeat -22px -2px";
	}
}

function initplaceLine(x, y, divid) {
	//保存map对象实例

	//创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.id = divid;
	div.style.position = "absolute";

	div.style.color = "yellow";

	div.style.background = "blue";

	div.style.height = "10px";
	div.style.width = "10px";

	div.style.lineHeight = "12px";
	//div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "16px";
	div.style.textAlign = "center";
	div.style.lineHeight = "20px";
	div.style.zIndex = 5;
	div.style.verticalAlign = "bottom";
	div.style.fontWeight = "bolder";
	//div.style.fontColor = "#FFFF00";


	x = x * imgScale + imgX - 5 + CANVAS_OFFSET_X;
	y = y * imgScale + imgY - 5 + CANVAS_OFFSET_Y;

	div.style.left = x + "px";
	div.style.top = y + "px";

	div.style.visibility = "visible";

	var bodydiv = document.getElementById("canvasdiv");

	bodydiv.appendChild(div);
	bodydiv.style.overflow = "hidden";
	//bodydiv.style.zIndex = 0;

	div.onmouseup = function () {
		canvas.onmousemove = null;
		canvas.onmouseup = null;
		canvas.style.cursor = "default";

		var pos = windowToCanvas(canvas, event.clientX, event.clientY);
		//var h1 =document.getElementById('h1');
		//alert(h1);
		//h1.value = "X="+event.clientX + "Y=" + event.clientY;
		//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;

		currdiv = div.id;

		var m = currdiv.split("_");
		pt1 = m[0];
		pt2 = m[1];

		pop_up_line_info(pos.x + CANVAS_OFFSET_X, pos.y + CANVAS_OFFSET_Y, pt1, pt2);

		canvas.style.zIndex = 2;
		canvas_upper.style.zIndex = 1;

		ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	}

}
function pop_up(posx, posy, realX, realY, isInput, content) {

	var login;

	if (isInput) {
		if (point_type == ONLY_NAV || point_type == BOTH_NAV_INTEREST) {
			login = new createLoginNav(realX, realY, posx, posy, content);
			if (content == null) {
				setNewPointNav(realX, realY);
			}
		} else if (point_type == ONLY_INTEREST) {
			login = new createLogin(realX, realY, posx, posy, content);
			if (content == null) {

				setNewPoint(realX, realY);
			}
		} else {
			return;
		}
	} else {
		if (is_source_nav) {
			login = new createInfoNav(posx, posy, realX, realY, content);
		} else {
			login = new createInfo(posx, posy, realX, realY, content);
		}
	}

	var div_in = document.createElement("div");
	div_in.id = "id_in";
	div_in.style.width = "300px";
	div_in.style.position = "absolute";
	div_in.style.left = posx + 8 + "px";
	div_in.style.top = posy + 8 + "px";
	div_in.style.padding = 3 + "px";
	div_in.style.backgroundColor = "#CCCCCC";
	div_in.style.zIndex = 10000;

	login.style.position = "absolute";
	div_in.appendChild(login);

	var x = document.createElement('div');
	x.innerHTML = "<img src='images/close.jpg' title='关闭窗口'>";
	x.style.position = "absolute";
	x.style.right = "10px";
	x.style.top = "5px";
	x.style.cursor = "pointer";
	x.onclick = function () {
		del_pop("id_out", "id_in");
		canvas.style.zIndex = 1;
		canvas_upper.style.zIndex = 2;
		first = true;
	}

	div_in.style.position = "absolute";

	login.appendChild(x);

	div_in.style.visibility = "visible";

	var bodydiv = document.getElementById("canvasdiv");

	bodydiv.appendChild(div_in);
	//bodydiv.style.overflow = "scroll";

	bodydiv.style.overflow = "hidden";

}

function pop_up_line_info(posx, posy, pt1, pt2) {

	var login;

	if (posy > 1500) {
		posy = posy - 260;
		posx = posx + 30;
	}

	login = new createLineInfo(pt1, pt2);

	var div_in = document.createElement("div");
	div_in.id = "id_in";
	div_in.style.width = "300px";
	div_in.style.position = "absolute";
	div_in.style.left = posx + 8 + "px";
	div_in.style.top = posy + 8 + "px";
	div_in.style.padding = 3 + "px";
	div_in.style.backgroundColor = "#CCCCCC";
	div_in.style.zIndex = 10000;

	login.style.position = "absolute";
	div_in.appendChild(login);

	var x = document.createElement('div');
	x.innerHTML = "<img src='images/close.jpg' title='关闭窗口'>";
	x.style.position = "absolute";
	x.style.right = "10px";
	x.style.top = "5px";
	x.style.cursor = "pointer";
	x.onclick = function () {
		del_pop("id_out", "id_in");
		canvas.style.zIndex = 1;
		canvas_upper.style.zIndex = 2;
	}

	login.appendChild(x);

	div_in.style.visibility = "visible";

	var bodydiv = document.getElementById("canvasdiv");

	bodydiv.appendChild(div_in);
	//bodydiv.style.overflow = "scroll";

	bodydiv.style.overflow = "hidden";

}

function del_pop(id_out, id_in) {
	var bodydiv = document.getElementById('canvasdiv');
	//bodydiv.style.overflow = "scroll";

	var childs = bodydiv.childNodes;
	for (var i = 0; i < childs.length; i++) {

		//alert(i);
		if (childs[i].id == id_out || childs[i].id == id_in) {
			bodydiv.removeChild(childs[i]);
			i--;

			del_div("temp");
		}
	}

}

function onmove(x, y) {
	//alert("xx");
	// alert(interest_div.length);

	for (var i = 0; i < interest_div.length; i++) {
		var div = document.getElementById(interest_div[i]);

		//alert(div);


		var xx = imgX + (interest_x[i]) * imgScale + offset_x + CANVAS_OFFSET_X;
		var yy = imgY + (interest_y[i]) * imgScale + offset_y + CANVAS_OFFSET_Y;

		div.style.left = xx + "px";
		div.style.top = yy + "px";

		if (xx >= (WIDTH + offset_x)) {
			div.style.left = "-100px";
		}

		if (yy >= (HEIGHT + offset_y)) {
			div.style.top = "-100px";
		}

		//interest_x[i] = interest_x[i] + x;
		//interest_y[i] = interest_y[i] + y;

	}

}

function onmovenav(x, y) {}

function del_div(temp) {
	var bodydiv = document.getElementById('canvasdiv');
	//bodydiv.style.overflow = "scroll";

	var childs = bodydiv.childNodes;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].id == temp) {
			bodydiv.removeChild(childs[i]);
			i--;
			return;
		} else ;
	}
}

function onscale() {
	for (var i = 0; i < interest_div.length; i++) {
		var div = document.getElementById(interest_div[i]);

		//alert(div);


		var xx = imgX + (interest_x[i]) * imgScale + offset_x + CANVAS_OFFSET_X;
		var yy = imgY + (interest_y[i]) * imgScale + offset_y + CANVAS_OFFSET_Y;

		div.style.left = xx + "px";
		div.style.top = yy + "px";

		//interest_x[i] = interest_x[i] + x;
		//interest_y[i] = interest_y[i] + y;

	}

}

//realX, realY, posx, posy
function createLogin(realX, realY, posx, posy, content) {
	var login = document.createElement('DIV');

	var interest_name = "";

	login.style.backgroundColor = "#FFFFFF";

	if (currdiv != null) {
		for (var i = 0; i < interest_div.length; i++) {
			if (interest_div[i] == currdiv) {
				interest_name = interest_label[i];
				realX = interest_x[i];
				realY = interest_y[i];
			}
		}
	}

	//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
	login.innerHTML = "<form name = 'loginform'>" +
		"<div style='poaition:absoltue;width:300px;height:40px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标  " + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp;" + which_floor + "F" + "</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;white-space:nowrap;float:left;'><b>坐标 X&nbsp;&emsp;</b></label> <input id='xpos' name='xpos'    type=text  style='width:50px;height:15px' value=" + realX + "></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>坐标 Y&nbsp;&emsp;</b></label> <input id='ypos' name='ypos'  type=text  style='width:50px;height:15px' value=" + realY + "></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='兴趣点' style='width:100px;height:15px' value=" + interest_name + "></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green;float:left'><b>节点类型&nbsp</b></label>  <select name='selectInterest' style='width:100px;height:25px;' id='selectInterest'><option value='0' >展馆</option><option value='3'>公交站</option><option value='4' >影院</option><option value='5'>剧场</option><option value='6'>餐饮</option></select></div>" +

		"<div style='width:300px;height:120px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><label for=name style='font:color:green'><b>简要描述&nbsp</b></label> &nbsp;&nbsp;<textarea name='content' cols='30' rows='3' placeholder='请输入简要信息' with='180px'></textarea></div>" +

		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'blue',  onClick= 'setPoint(" + realX + "," + realY + ")'" + ">提交</button></div>" +
		"</form>";

	return login;
}

function createLoginNav(realX, realY, posx, posy, content) {

	var login = document.createElement('DIV');

	var nav_name = "";

	login.style.backgroundColor = "#FFFFFF";

	if (currdiv != null) {
		for (var i = 0; i < nav_div.length; i++) {
			if (nav_div[i] == currdiv) {
				nav_name = nav_label[i];
				realX = nav_x[i];
				realY = nav_y[i];
				first = false;
			}
		}
	}

	if (first) {
		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标  " + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  style='width:100px;height:15px' type=text placeholder='检票口' value=" + nav_name + "></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'blue',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
			"</form>";

	} else {
		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标" + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text style='width:100px;height:15px' placeholder='检票口' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green;float:left'><b>楼层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>  <select name='selectFloor' style='width:50px;height:25px' id='selectFloor'><option value='1'>F15</option><option value='2'>F5</option></select> </div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>连通点&nbsp;&nbsp;&nbsp;&nbsp</b></label><select name='selectNav' style='width:50px;height:25px' id='selectNav'><option value='1'>1</option><option value='2'>2</option></option><option value='3'>3</option></option><option value='4'>4</option></option><option value='5'>5</option></select></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green;float:left'><b>连通类型&nbsp</b></label>  <select name='selectNavType' style='width:50px;height:25px' id='selectNavType'><option value='1'>双向 </option><option value='2'>单向 </option></select> </div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'blue',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
			"</form>";

		first = true;
	}

	return login;
}

function swap(items, firstIndex, secondIndex) {
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

function bubbleSort(items, tag) {

	var len = items.length,
	i,
	j,
	stop;

	for (i = 0; i < len; i++) {
		for (j = 0, stop = len - i; j < stop; j++) {
			if (items[j] > items[j + 1]) {
				swap(items, j, j + 1);
				swap(tag, j, j + 1);
			}
		}
	}

	return tag;
}

function createLoginNav(realX, realY, posx, posy, content) {

	var login = document.createElement('DIV');

	var nav_name = "";
	var currIdx = -1;
	var dist = new Array();
	var tag = new Array();

	login.style.backgroundColor = "#FFFFFF";

	if (currdiv != null) {
		for (var i = 0; i < nav_div.length; i++) {
			if (nav_div[i] == currdiv) {
				nav_name = nav_label[i];
				realX = nav_x[i];
				realY = nav_y[i];

				first = false;
				currIdx = i;
				break;
			}
		}
	}

	if (first) {
		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:40px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标  " + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp;" + which_floor + "F" + "</div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  style='width:100px;height:15px' type=text placeholder='检票口' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>坐标 X&nbsp;&emsp;</b></label> <input id='xpos' name='xpos'  style='width:50px;height:15px' type=text  value=" + realX + "></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>坐标 Y&nbsp;&emsp;</b></label> <input id='ypos' name='ypos'  style='width:50px;height:15px' type=text  value=" + realY + "></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'blue',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
			"</form>";
	} else {
		var x1 = nav_x[currIdx];
		var y1 = nav_y[currIdx];

		dist.length = 0;
		tag.length = 0;

		for (var i = 0; i < nav_div.length; i++) {
			if (i != currIdx && nav_flag[i]) {
				if (nav_floor[i] == which_floor) {
					var x2 = nav_x[i];
					var y2 = nav_y[i];
					var d = mdist(x1, y1, x2, y2);
					dist.push(d);
					tag.push(i + 1);
				}

			}

		}

		tag = bubbleSort(dist, tag);

		//<option value='1'>1</option><option value='2'>2</option></option><option value='3'>3</option></option><option value='4'>4</option></option><option value='5'>5</option>


		//<option value='1'>F15</option><option value='2'>F16</option></select>
		if (which_floor == 15) {
			floorStr = "<option value='1'>F15</option><option value='2'>F5</option></select>";

		} else {
			floorStr = "<option value='1'>F5</option><option value='2'>F15</option></select>";

		}

		optStr = "";

		for (var i = 0; i < tag.length; i++) {

			optStr += "<option value=" + tag[i] + ">";
			optStr += tag[i];
			optStr += "</option>";
		}

		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:40px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标" + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;'><label for=name style='font:color:green;float:left'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  style='width:100px;height:15px' type=text placeholder='导航点' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green;float:left'><b>楼层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>  <select name='selectFloor' style='width:80px;height:25px' id='selectFloor' onchange='changeFloor(this.options[this.options.selectedIndex].value)'>" + floorStr + "</select></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;'><label for=name style='font:color:green;float:left'><b>连通点&nbsp;&nbsp;&nbsp;</b></label><select name='selectNav' style='width:80px;height:25px' id='selectNav'>" + optStr + "</select></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px;'><label for=name style='font:color:green;float:left'><b>连通类型&nbsp</b></label>  <select name='selectNavType' style='width:80px;height:25px' id='selectNavType'><option value='1'>双向 </option><option value='2'>单向 </option></select> </div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;'><label for=name style='font:color:green;float:left'><b>正向信息&nbsp</b></label> <input id='forward' name='forward'  style='width:100px;height:15px' type=text placeholder='办公室到门口'></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;'><label for=name style='font:color:green;float:left'><b>反向信息&nbsp</b></label> <input id='backward' name='backward'  style='width:100px;height:15px' type=text placeholder='门口到办公室'></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;float:left'><center><button type='button' class = 'blue',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class = 'red',  onClick= 'deleteNavPoint()'" + ">删除</button></div>" +
			"</form>";

		first = true;
	}

	return login;
}

function mdist(x1, y1, x2, y2) {

	var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

	return d;
}

function createLineInfo(pt1, pt2) {
	var login = document.createElement('DIV');
	var conn = "";
	var to_node;
	var flag = false;

	var mbackwardGuide = "";
	var mforwardGuide = "";

	curr_node = pt1;

	//<option value='1'>双向 </option><option value='2'>

	if (pt2 == 0) {

		for (var i = 0; i < fromNode.length; i++) {

			if (fromNode[i] == pt1) {
				if (nav_floor[toNode[i] - 1] != which_floor) {
					if (!flag) {
						flag = true;
						to_node = toNode[i];

					}

					conn += "<option value=" + toNode[i] + ">";
					conn += "F" + nav_floor[toNode[i] - 1] + " 节点" + toNode[i];
					conn += "</option>";

				}

			}
		}

		for (var i = 0; i < toNode.length; i++) {

			if (toNode[i] == pt1) {
				if (nav_floor[fromNode[i] - 1] != which_floor) {
					if (!flag) {
						flag = true;
						to_node = fromNode[i];
					}

					conn += "<option value=" + fromNode[i] + ">";
					conn += "F" + nav_floor[fromNode[i] - 1] + " 节点" + fromNode[i];
					conn += "</option>";

				}

			}
		}

		var pathInfo = " 该导航线连接导航节点" + pt1 + "与" + to_node;
		var op1 = pt1 + " 到 " + to_node;
		var op2 = to_node + " 到 " + pt1;
		var op3 = "";

		for (var i = 0; i < fromNode.length; i++) {

			if (fromNode[i] == pt1 && toNode[i] == to_node) {
				if (direction[i] == 1) {
					op3 = "(双向)";
				} else {
					op3 = "(" + pt1 + "->" + to_node + ")";
				}

				curr_from_node = pt1;
				curr_to_node = to_node;
				break;
			}

			if (toNode[i] == pt1 && fromNode[i] == to_node) {
				if (direction[i] == 1) {
					op3 = "(双向)";
				} else {
					op3 = "(" + to_node + "->" + pt1 + ")";
				}

				var op2 = curr_node + " 到 " + to_node;
				var op1 = to_node + " 到 " + pt1;

				curr_from_node = to_node;
				curr_to_node = pt1;

				break;
			}
		}

		pathInfo += op3;

		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:40px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px;float:left;'>&nbsp;路径信息</div>" +
			"<div id = 'pathInfo' style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;float:left;'><label for=name style='font:color:green'><b>" + pathInfo + "</b></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px;float:left;float:left;'><label for=name style='font:color:green;float:left'><b>选择节点&nbsp;&nbsp;</b></label>  <select name='selectNavTerm' style= 'width:100px;height:25px;' id='selectNavTerm' onchange='changeTransit(this.options[this.options.selectedIndex].value)'>" + conn + "</select>  </div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px;float:left;float:left;'><label for=name style='font:color:green;float:left'><b>选择方向&nbsp;&nbsp;</b></label>  <select name='selectNavType' style= 'width:100px;height:25px;' id='selectNavType'><option value='1'>双向 </option><option value='2'>" + op1 + "</option> <option value='3'>" + op2 + "</option></select>  </div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;float:left;float:left;'><label for=name style='font:color:green;float:left'><b>正向信息&nbsp;&nbsp;</b></label> <input id='forward' name='forward'  style= 'width:100px;height:15px;' type=text placeholder='办公室到门口'></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px;float:left;float:left;'><label for=name style='font:color:green;float:left'><b>反向信息&nbsp;&nbsp;</b></label> <input id='backward' name='backward'  style= 'width:100px;height:15px;'type=text placeholder='门口到办公室'></div>" +
			"<div id = 'opline' style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;float:left;float:left;'><center><button type='button' class = 'blue',  onClick= 'opTransitLine(" + curr_from_node + "," + curr_to_node + ")'" + ">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class = 'red',  onClick= 'deleteTransitNavLine(" + curr_from_node + "," + curr_to_node + ")'" + ">删除</button></div>" +

			"</form>";

	} else {

		var pathInfo = "该导航线连接导航节点" + pt1 + "与" + pt2;
		var op1 = pt1 + " 到 " + pt2;
		var op2 = pt2 + " 到 " + pt1;
		var op3 = "";
		var mbackwardGuide = "";
		var mforwardGuide = "";

		for (var i = 0; i < fromNode.length; i++) {

			if (fromNode[i] == pt1 && toNode[i] == pt2) {
				if (direction[i] == 1) {
					op3 = "(双向)";
				} else {
					op3 = "(" + pt1 + "->" + pt2 + ")";
				}

				mforwardGuide = forwardGuide[i];
				mbackwardGuide = backwardGuide[i];
				break;
			}
		}

		pathInfo += op3;

		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:40px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp;路径信息</div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>" + pathInfo + "</b></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green;float:left;'><b>选择方向&nbsp;&nbsp;</b></label>  <select name='selectNavType' style='width:100px;height:25px;' id='selectNavType'><option value='1'>双向 </option><option value='2'>" + op1 + "</option> <option value='3'>" + op2 + "</option></select>  </div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>正向信息&nbsp;&nbsp</b></label> <input id='forward' name='forward'  style='width:100px;height:15px;' type=text placeholder='办公室到门口' value=" + mforwardGuide + "></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green;float:left'><b>反向信息&nbsp;&nbsp</b></label> <input id='backward' name='backward'  style='width:100px;height:15px;' type=text placeholder='门口到办公室' value=" + mbackwardGuide + "></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'blue',  onClick= 'opLine(" + pt1 + "," + pt2 + ")'" + ">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class = 'red',  onClick= 'deleteNavLine(" + pt1 + "," + pt2 + ")'" + ">删除</button></div>" +
			"</form>";
	}

	return login;
}

//不同楼层导航线的改方向和删除的导航线操作
function deleteTransitNavLine(pt1, pt2) {

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			fromNode.splice(i, 1);

			toNode.splice(i, 1);
			direction.splice(i, 1);
			forwardGuide.splice(i, 1);
			backwardGuide.splice(i, 1);

			if (!judgeTransitPt(pt1)) {
				nav_transit[pt1 - 1] = false;

				trandivId = pt1 + "_transit"
					trandiv = document.getElementById(trandivId);
				trandiv.style.display = "none";

				trandivId = pt1 + "_transit"
					trandiv = document.getElementById(trandivId);
				trandiv.style.display = "none";

				var trandivlineId = pt1 + "_" + "0";
				var trandivline = document.getElementById(trandivlineId);
				trandivline.style.display = "none";
			}

			if (!judgeTransitPt(pt2)) {
				nav_transit[pt2 - 1] = false;

				trandivId = pt2 + "_transit"
					trandiv = document.getElementById(trandivId);
				trandiv.style.display = "none";

				trandivId = pt2 + "_transit"
					trandiv = document.getElementById(trandivId);
				trandiv.style.display = "none";

				var trandivlineId = pt2 + "_" + "0";
				var trandivline = document.getElementById(trandivlineId);
				trandivline.style.display = "none";
			}
			//forwardGuide.splice(i, 1);
			//backwardGuide.splice(i, 1);

			//在数据库中删除这条导航线, 只需要知道fromNode toNode
			$.post("deletenavipath.action", {
				fromNode : pt1,
				toNode : pt2,

			});

			break;

		}
		break;
	}

	redrawAll();

	del_pop("id_out", "id_in");
	del_pop("id_out", "id_in");

	canvas_upper.style.zIndex = 2;
	canvas_nav.style.zIndex = 3;
	canvas.style.zIndex = 2;

}

//不同楼层导航线的改方向和删除的导航线操作
function opTransitLine(pt1, pt2) {
	var opcode = document.forms['loginform']['selectNavType'].value;

	var mforwardGuide = document.forms['loginform']['forward'].value;
	var mbackwardGuide = document.forms['loginform']['backward'].value;

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			switch (parseInt(opcode)) {
			case 1:
				direction[i] = 1;

				//fromNode 和 toNode 保持不变,  传direction = 1 表示该成双向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 1,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});
				break;
			case 2:

				direction[i] = 2;

				//fromNode 和 toNode 保持不变,  传direction = 2 表示该成单向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 2,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});
				break;
			case 3:
				fromNode[i] = pt2;
				toNode[i] = pt1;
				direction[i] = 2;

				//fromNode 和 toNode 要在数据库调换位置 ,  传direction = 3 表示该成单向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 3,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});

				break;
			case 4:

				fromNode.splice(i, 1);

				toNode.splice(i, 1);
				direction.splice(i, 1);
				forwardGuide.splice(i, 1);
				backwardGuide.splice(i, 1);

				if (!judgeTransitPt(pt1)) {
					nav_transit[pt1 - 1] = false;

					trandivId = pt1 + "_transit"
						trandiv = document.getElementById(trandivId);
					trandiv.style.display = "none";

					trandivId = pt1 + "_transit"
						trandiv = document.getElementById(trandivId);
					trandiv.style.display = "none";

					var trandivlineId = pt1 + "_" + "0";
					var trandivline = document.getElementById(trandivlineId);
					trandivline.style.display = "none";
				}

				if (!judgeTransitPt(pt2)) {
					nav_transit[pt2 - 1] = false;

					trandivId = pt2 + "_transit"
						trandiv = document.getElementById(trandivId);
					trandiv.style.display = "none";

					trandivId = pt2 + "_transit"
						trandiv = document.getElementById(trandivId);
					trandiv.style.display = "none";

					var trandivlineId = pt2 + "_" + "0";
					var trandivline = document.getElementById(trandivlineId);
					trandivline.style.display = "none";
				}
				//forwardGuide.splice(i, 1);
				//backwardGuide.splice(i, 1);

				//在数据库中删除这条导航线, 只需要知道fromNode toNode
				$.post("deletenavipath.action", {
					fromNode : pt1,
					toNode : pt2,

				});

				break;
			default:
				break;
			}
			break;
		}
	}

	redrawAll();

	del_pop("id_out", "id_in");
	del_pop("id_out", "id_in");

	canvas_upper.style.zIndex = 2;
	canvas_nav.style.zIndex = 3;
	canvas.style.zIndex = 2;

}

function deleteNavLine(pt1, pt2) {

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			fromNode.splice(i, 1);

			toNode.splice(i, 1);
			direction.splice(i, 1);
			forwardGuide.splice(i, 1);
			backwardGuide.splice(i, 1);
			//forwardGuide.splice(i, 1);
			//backwardGuide.splice(i, 1);
			del_div(currdiv);

			//在数据库中删除这条导航线, 只需要知道fromNode toNode
			$.post("deletenavipath.action", {
				fromNode : pt1,
				toNode : pt2,

			});
			break;
		}
	}

	redrawAll();

	del_pop("id_out", "id_in");
	del_pop("id_out", "id_in");

	canvas_upper.style.zIndex = 2;
	canvas_nav.style.zIndex = 3;
	canvas.style.zIndex = 2;

}

//同一楼层导航线的改方向和删除的导航线操作
function opLine(pt1, pt2) {
	var opcode = document.forms['loginform']['selectNavType'].value;

	var mforwardGuide = document.forms['loginform']['forward'].value;
	var mbackwardGuide = document.forms['loginform']['backward'].value;

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			switch (parseInt(opcode)) {
			case 1:
				direction[i] = 1;

				forwardGuide[i] = mforwardGuide;
				backwardGuide[i] = mbackwardGuide;
				//fromNode 和 toNode 保持不变,  传direction = 1 表示该成双向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 1,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});

				break;
			case 2:

				direction[i] = 2;

				forwardGuide[i] = mforwardGuide;
				backwardGuide[i] = mbackwardGuide;

				//fromNode 和 toNode 保持不变,  传direction = 2 表示该成单向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 2,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});
				break;
			case 3:
				fromNode[i] = pt2;
				toNode[i] = pt1;
				direction[i] = 2;
				navdiv = document.getElementById(currdiv)
					navdiv.id = pt2 + "_" + pt1;
				currdiv = pt2 + "_" + pt1;

				for (var j = 0; j < navtransdiv.length; j++) {
					if (pt1 + "_" + pt2 == navtransdiv[j]) {
						navtransdiv[j] = pt2 + "_" + pt1;
						break;
					}
				}

				forwardGuide[i] = mforwardGuide;
				backwardGuide[i] = mbackwardGuide;

				//fromNode 和 toNode 要在数据库调换位置 ,  传direction = 3 表示该成单向
				$.post("updatenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : 3,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});

				break;
			case 4:

				fromNode.splice(i, 1);

				toNode.splice(i, 1);
				direction.splice(i, 1);
				forwardGuide.splice(i, 1);
				backwardGuide.splice(i, 1);
				//forwardGuide.splice(i, 1);
				//backwardGuide.splice(i, 1);
				del_div(currdiv);

				//在数据库中删除这条导航线, 只需要知道fromNode toNode
				$.post("deletenavipath.action", {
					fromNode : pt1,
					toNode : pt2,

				});
				break;
			default:
				break;
			}
			break;
		}
	}

	redrawAll();

	del_pop("id_out", "id_in");
	del_pop("id_out", "id_in");

	canvas_upper.style.zIndex = 2;
	canvas_nav.style.zIndex = 3;
	canvas.style.zIndex = 2;
}

function setPoint(realX, realY) {
	if (currdiv != null) {
		for (var i = 0; i < interest_div.length; i++) {
			if (interest_div[i] == currdiv) {

				interest_label[i] = document.forms['loginform']['petName'].value;
				del_div(currdiv);
				//alert("vv");
				initplace(interest_x[i], interest_y[i], document.forms['loginform']['petName'].value, currdiv);

				del_pop("id_out", "id_in");
				del_pop("id_out", "id_in");

				canvas.style.zIndex = 1;
				canvas_upper.style.zIndex = 2;

				return;
			}
		}
	}

	divstr = "div" + interest_div.length + 1;

	realX = parseInt(document.forms['loginform']['xpos'].value);
	realY = parseInt(document.forms['loginform']['ypos'].value);

	initplace(realX, realY, document.forms['loginform']['petName'].value, divstr);

	interest_x.push(realX);
	interest_y.push(realY);

	interest_label.push(document.forms['loginform']['petName'].value);

	interest_div.push(divstr);

	interest_floor.push(which_floor);
	interest_generaldesc.push(document.forms['loginform']['content'].value);
	interest_type.push(document.forms['loginform']['selectInterest'].value);

	interest_hallid.push(-10000);
	interest_ttsid.push(-10000);
	interest_nearnavid.push(-10000);
	interest_iconurl.push("");
	interest_audiourl.push("");
	interest_weburl.push("");
	interest_picurl.push("");
	interest_detaileddesc.push("");
	interest_scale.push(-10000);
	interest_alpha.push(-10000);
	interest_rotation.push(-10000);
	interest_maxzoomfactor.push(-10000);
	interest_minzoomfactor.push(-10000);

	interest_shareble.push("1");
	interest_reachable.push("1");
	interest_readable.push("1");

	/*
	interest_type.push(data.data[i].type);
	interest_hallid.push(data.data[i].hallId);
	interest_ttsid.push(data.data[i].ttsNo);
	interest_floor.push(data.data[i].mapId);
	interest_x.push(data.data[i].placeX);
	interest_y.push(data.data[i].placeY);
	interest_nearnavid.push(data.data[i].neareastNaviNode);
	interest_iconurl.push(data.data[i].iconUrl);
	interest_audiourl.push(data.data[i].audioUrl);
	interest_weburl.push(data.data[i].webUrl);
	interest_picurl.push(data.data[i].picUrl);
	interest_label.push(data.data[i].label);
	interest_generaldesc.push(data.data[i].generalDesc);
	interest_detaileddesc.push(data.data[i].detailedDesc);
	//interest_shareble.push(data.data[i].shareble);
	//interest_reachable.push(data.data[i].reachable);
	//interest_readable.push(data.data[i].readable);
	interest_scale.push(data.data[i].scale);
	interest_alpha.push(data.data[i].alpha);
	interest_rotation.push(data.data[i].rotation);
	interest_maxzoomfactor.push(data.data[i].maxZoomFactor);
	interest_minzoomfactor.push(data.data[i].minZoomFactor);*/

	$.post("savepoi.action", {
		mapId : which_floor,
		placeX : realX,
		placeY : realY,
		label : document.forms['loginform']['petName'].value,
		generalDesc : document.forms['loginform']['content'].value,
		type : document.forms['loginform']['selectInterest'].value,

		hallId : -10000,
		ttsNo : -10000,
		mapId : which_floor,
		neareastNaviNode : -10000,
		iconUrl : "",
		audioUrl : "",
		webUrl : "",
		picUrl : "",
		detailedDesc : "",
		shareble : 0,
		reachable : 0,
		readable : 0,
		scale : -10000,
		alpha : -10000,
		rotation : -10000,
		maxZoomFactor : -10000,
		minZoomFactor : -10000

	});

	del_pop("id_out", "id_in");

	canvas.style.zIndex = 1;
	canvas_upper.style.zIndex = 2;

}

function setPointNav(realX, realY) {

	if (currdiv != null) {
		for (var i = 0; i < nav_div.length; i++) {
			if (nav_div[i] == currdiv) {

				nav_label[i] = document.forms['loginform']['petName'].value;
				//del_div(currdiv);
				//alert("vv");
				//initplaceNav(nav_x[i], nav_y[i], currNavId, currdiv);
				var div = document.getElementById(nav_div[i]);

				var pt1 = parseInt(div.innerHTML);

				//alert (document.forms['loginform']['selectFloor'].value);

				if (document.forms['loginform']['selectFloor'].value == "2") {
					var x1 = imgX + nav_x[pt1 - 1] * imgScale;
					var y1 = imgY + nav_y[pt1 - 1] * imgScale;

					var pt2 = document.forms['loginform']['selectNav'].value;

					fromNode.push(pt1);
					toNode.push(pt2);

					var mdirection;
					var mforwardGuide = "";
					var mbackwardGuid = "";

					if (document.forms['loginform']['selectNavType'].value == "1") {
						direction.push(1);
						mdirection = 1;
					} else {
						direction.push(2);
						mdirection = 2;
					}

					mforwardGuide = document.forms['loginform']['forward'].value;
					mbackwardGuide = document.forms['loginform']['backward'].value;

					forwardGuide.push(mforwardGuide);
					backwardGuide.push(mbackwardGuide);

					//增加导航线, 跨楼层
					$.post("savenavipath.action", {
						fromNode : pt1,
						toNode : pt2,
						direction : mdirection,
						forwardGuide : mforwardGuide,
						backwardGuide : mbackwardGuide
					});

					if (!nav_transit[pt2 - 1]) {
						nav_transit[pt2 - 1] = true;

						var x2 = nav_x[pt2 - 1];
						var y2 = nav_y[pt2 - 1];

						initplaceNav(x2, y2 + 60, "换", pt2 + "_transit");
						navtransdiv.push(pt2 + "_transit");
						trans_x.push(x2);
						trans_y.push(y2 + 60);

						var trandivId = pt2 + "_transit";
						var trandiv = document.getElementById(trandivId);
						trandiv.style.display = "none";

						initplaceLine(x2, y2 + 30, pt2 + "_" + "0");
						navtransdiv.push(pt2 + "_" + "0");
						trans_x.push(x2);
						trans_y.push(y2 + 30);

						var trandivlineId = pt2 + "_" + "0";
						var trandivline = document.getElementById(trandivlineId);
						trandivline.style.display = "none";

					}

					if (nav_transit[pt1 - 1]) {
						del_pop("id_out", "id_in");
						del_pop("id_out", "id_in");
						return;
					}

					nav_transit[pt1 - 1] = true;

					var x2 = x1;
					var y2 = y1 + 20 * imgScale;

					ctx_nav.strokeStyle = '#993300';
					ctx_nav.lineWidth = 4;

					ctx_nav.beginPath();

					ctx_nav.moveTo(x1, y1);
					ctx_nav.lineTo(x2, y2);

					ctx_nav.stroke();

					var x1 = x2;
					var y1 = y2 + 10 * imgScale;

					var x2 = x1;
					var y2 = y1 + 20 * imgScale;

					ctx_nav.strokeStyle = '#993300';
					ctx_nav.lineWidth = 4;

					ctx_nav.beginPath();

					ctx_nav.moveTo(x1, y1);
					ctx_nav.lineTo(x2, y2);

					ctx_nav.stroke();

					var x1 = x2;
					var y1 = y2 + 10 * imgScale;

					var x2 = x1;
					var y2 = y1 + 20 * imgScale;

					del_pop("id_out", "id_in");
					del_pop("id_out", "id_in");

					canvas_upper.style.zIndex = 2;
					canvas_nav.style.zIndex = 2;
					canvas.style.zIndex = 2;

					initplaceNav(x2, y2 - 20, "换", pt1 + "_transit");
					navtransdiv.push(pt1 + "_transit");
					trans_x.push(x2);
					trans_y.push(y2 - 20);
					//alert (y2 - 20 - nav_y[pt1 - 1]);

					initplaceLine(x1, y2 - 50, pt1 + "_" + "0");
					navtransdiv.push(pt1 + "_" + "0");
					trans_x.push(x1);
					trans_y.push(y2 - 50);

					return;

				}

				var pt2 = document.forms['loginform']['selectNav'].value;

				//alert(document.forms['loginform']['selectNavType'].value);


				var x1 = imgX + nav_x[pt1 - 1] * imgScale;
				var y1 = imgY + nav_y[pt1 - 1] * imgScale;

				var x2 = imgX + nav_x[pt2 - 1] * imgScale;
				var y2 = imgY + nav_y[pt2 - 1] * imgScale;

				var midx = (x1 + x2) / 2;
				var midy = (y1 + y2) / 2;

				var realmidx = (nav_x[pt1 - 1] + nav_x[pt2 - 1]) / 2;
				var realmidy = (nav_y[pt1 - 1] + nav_y[pt2 - 1]) / 2;

				fromNode.push(pt1);
				toNode.push(pt2);

				var mdirection;
				var mforwardGuide;
				var mbackwardGuide;

				if (document.forms['loginform']['selectNavType'].value == "1") {
					direction.push(1);
					mdirection = 1;
				} else {
					direction.push(2);
					mdirection = 2;
				}

				mforwardGuide = document.forms['loginform']['forward'].value;
				mbackwardGuide = document.forms['loginform']['backward'].value;

				forwardGuide.push(mforwardGuide);
				backwardGuide.push(mbackwardGuide);

				//增加导航线, 本楼层
				$.post("savenavipath.action", {
					fromNode : pt1,
					toNode : pt2,
					direction : mdirection,
					forwardGuide : mforwardGuide,
					backwardGuide : mbackwardGuide
				});

				if (document.forms['loginform']['selectNavType'].value == "1") {

					ctx_nav.strokeStyle = 'blue';
					ctx_nav.lineWidth = 2;

					ctx_nav.beginPath();

					ctx_nav.moveTo(x1, y1);
					ctx_nav.lineTo(x2, y2);

					ctx_nav.stroke();

				} else {

					new_x2 = x1 + (x2 - x1) * 5 / 6;
					new_y2 = y1 + (y2 - y1) * 5 / 6;

					var vector = {
						sta : [x1, 800 - y1],
						end : [new_x2, 800 - new_y2]
					};

					drawArrowLine(vector.sta, vector.end, true);

					var vector = {
						sta : [new_x2, 800 - new_y2],
						end : [x2, 800 - y2]
					};

					drawArrowLine(vector.sta, vector.end, false);

				}

				del_pop("id_out", "id_in");
				del_pop("id_out", "id_in");

				canvas_upper.style.zIndex = 2;
				canvas_nav.style.zIndex = 2;
				canvas.style.zIndex = 2;

				var divid = pt1 + "_" + pt2;

				initplaceLine(realmidx, realmidy, divid);
				navtransdiv.push(divid);
				trans_x.push(realmidx);
				trans_y.push(realmidy);

				return;
			}
		}
	}

	realX = parseInt(document.forms['loginform']['xpos'].value);
	realY = parseInt(document.forms['loginform']['ypos'].value);

	divstr = "divnav" + nav_div.length + 1;
	initplaceNav(realX, realY, currNavId, divstr);

	currNavId++;

	nav_x.push(realX);
	nav_y.push(realY);

	var mlabel = document.forms['loginform']['petName'].value;

	nav_label.push(document.forms['loginform']['petName'].value);

	nav_floor.push(which_floor);

	//首次增加导航点,  只是设置序号, 坐标,  楼层,  label
	$.post("savenavinode.action", {
		mapId : which_floor,
		placeX : realX,
		placeY : realY,
		label : mlabel
	}, function (data) {
		//alert(data.data);
	});

	//alert(document.forms['loginform']['petName'].value);

	nav_div.push(divstr);
	nav_transit.push(false);

	nav_flag.push(true);

	del_pop("id_out", "id_in");

	canvas.style.zIndex = 1;
	canvas_upper.style.zIndex = 2;

}

function setNewPoint(realX, realY) {

	initplace(realX, realY, "新建", "temp");

}

function setNewPointNav(realX, realY) {

	initplaceNav(realX, realY, currNavId, "temp");

}

function createInfo(posx, posy, realX, realY, content) {
	var login = document.createElement('DIV');
	login.style.backgroundColor = "#FFFFFF";

	var idx = -1;

	if (currdiv != null) {
		for (var i = 0; i < interest_div.length; i++) {
			if (interest_div[i] == currdiv) {
				interest_name = interest_label[i];
				realX = interest_x[i];
				realY = interest_y[i];
				idx = i;
				break;
			}
		}
	}

	var mtype = "展馆";

	if (interest_type[idx] == "0") {
		mtype = "展馆";
	} else if (interest_type[idx] == "3") {
		mtype = "公交站";
	} else if (interest_type[idx] == "4") {
		mtype = "影院";
	} else if (interest_type[idx] == "5") {
		mtype = "剧场";
	} else if (interest_type[idx] == "6") {
		mtype = "餐饮";
	}

	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteInterestPlace()\" ></td></tr>";
	//logonClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" >"
	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteInterestPlace()\" ></td></tr>";
	login.innerHTML = "<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + content + "<img src='images/edit.jpg' title='编辑' onClick= 'modifyInterestPlace(" + posx + "," + posy + "," + realX + "," + realY + ")'" + " style = 'position:absolute;right:75px;top:4px '><img src='images/delete.jpg' title='删除', onClick= 'deleteInterestPlace(" + ")'" + " style='position:absolute;right:50px;top:8px'></div>" +
		"<div style='width:300px;height:50px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp;坐标位置 X=" + interest_x[idx] + "    Y=" + interest_y[idx] + "    楼层" 　 + interest_floor[i] + "</div>" +

		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;color:blue;text-indent: 10px'>兴趣点类型</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;color:green;text-indent: 10px'>" + mtype + "</div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;color:blue;text-indent: 10px'>简要描述</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;color:green;text-indent: 10px'>" + interest_generaldesc[idx] + "</div>"

		return login;
	//'modifyInterestPlace('" + posx  + "," + posy + "," + realX + "," + realY + ")
}

function createInfoNav(posx, posy, realX, realY, content) {
	var login = document.createElement('DIV');
	login.style.backgroundColor = "#FFFFFF";

	var curridx = -1;
	var nav_name = null;

	if (currdiv != null) {
		for (var i = 0; i < nav_div.length; i++) {
			if (nav_div[i] == currdiv) {
				nav_name = nav_label[i];
				realX = nav_x[i];
				realY = nav_y[i];

				first = false;
				currIdx = i;
				break;
			}
		}
	}

	var conn_bi_direction = "";
	var conn_single_direction_out = "";
	var conn_single_direction_in = "";

	for (var i = 0; i < fromNode.length; i++) {
		if (fromNode[i] == currIdx + 1) {
			if (direction[i] == 1) {
				conn_bi_direction += toNode[i] + " ";
			} else {
				conn_single_direction_out += toNode[i] + " ";
			}
		}

	}

	for (var i = 0; i < fromNode.length; i++) {
		if (toNode[i] == currIdx + 1) {
			if (direction[i] == 1) {
				conn_bi_direction += fromNode[i] + " ";
			} else {
				conn_single_direction_in += fromNode[i] + " ";
			}

		}

	}

	if (conn_bi_direction == "") {
		conn_bi_direction = "无";
	}

	if (conn_single_direction_out == "") {
		conn_single_direction_out = "无";
	}

	if (conn_single_direction_in == "") {
		conn_single_direction_in = "无";
	}

	if (nav_name == null || nav_name == "") {
		nav_name = "无"
	}

	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteInterestPlace()\" ></td></tr>";
	//logonClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" >"
	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteNavPoint()\" ></td></tr>";
	login.innerHTML = "<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp;位置信息&nbsp" + "  X=" + realX + "  Y=" + realY + "&nbsp;F15" + "<img src='images/edit.jpg' title='编辑' onClick= 'modifyNavPoint(" + posx + "," + posy + "," + realX + "," + realY + ")'" + " style = 'position:absolute;right:75px;top:4px '><img src='images/delete.jpg' title='删除', onClick= 'deleteNavPoint(" + ")'" + " style='position:absolute;right:50px;top:8px'></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 导航点序号      " + content + "<br></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 导航点名称      " + nav_name + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 双向连接点      " + conn_bi_direction + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 单向连接点(出)  " + conn_single_direction_out + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 单向连接点(入)  " + conn_single_direction_in + "<br></div>";

	return login;
	//'modifyInterestPlace('" + posx  + "," + posy + "," + realX + "," + realY + ")
}

function modifyNavPoint(posx, posy, realX, realY) {

	//alert ("cc");

	del_pop("id_out", "id_in");

	pop_up(posx, posy, realX, realY, true, "修改节点");

	//
}

function modifyInterestPlace(posx, posy, realX, realY) {

	//alert ("cc");

	del_pop("id_out", "id_in");

	//pop_up(posx, posy, realX, realY, true, "修改节点");
	detaildiv = document.getElementById("stylized");
	detaildiv.style.display = "block";

	for (var i = 0; i < interest_div.length; i++) {
		if (interest_div[i] == currdiv) {
			　　　　document.forms['form1']['floor'].value = which_floor;
			　　　　document.forms['form1']['xpos'].value = interest_x[i];
			　　　　document.forms['form1']['ypos'].value = interest_y[i];

			curropIdx = i;
			break;
		}
	}

	/*
	var interest_x = new Array();
	var interest_y = new Array();
	var interest_label = new Array();
	var interest_div = new Array();
	var interest_floor = new Array();

	var interest_type = new Array();
	var interest_detaileddesc = new Array();
	var interest_hallid = new Array();
	var interest_ttsid = new Array();
	var interest_nearnavid = new Array();
	var interest_scale = new Array();
	var interest_alpha = new Array();
	var interest_rotation = new Array();
	var interest_minzoomfactor = new Array();
	var interest_maxzoomfactor = new Array();
	var interest_weburl = new Array();
	var interest_picurl = new Array();
	var interest_iconurl = new Array();
	var interest_audiourl = new Array();
	var interest_reachable = new Array();
	var interest_readable = new Array();
	var interest_generaldesc = new Array();
	var interest_shareble = new Array();
	 */

	document.forms['form1']['poilabel'].value = interest_label[curropIdx];
	document.forms['form1']['floor'].value = interest_floor[curropIdx];

	document.forms['form1']['selectInterest'].value = interest_type[curropIdx];
	document.forms['form1']['detaileddesc'].value = interest_detaileddesc[curropIdx];
	document.forms['form1']['generaldesc'].value = interest_generaldesc[curropIdx];

	if (interest_hallid[curropIdx] == -10000) {
		document.forms['form1']['hallid'].value = "";
	} else {
		document.forms['form1']['hallid'].value = interest_hallid[curropIdx];
	}

	if (interest_ttsid[curropIdx] == -10000) {
		document.forms['form1']['ttsid'].value = "";
	} else {
		document.forms['form1']['ttsid'].value = interest_ttsid[curropIdx];
	}

	if (interest_nearnavid[curropIdx] == -10000) {
		document.forms['form1']['nearnavid'].value = "";
	} else {
		document.forms['form1']['nearnavid'].value = interest_nearnavid[curropIdx];
	}

	if (interest_scale[curropIdx] == -10000) {
		document.forms['form1']['scale'].value = "";
	} else {
		document.forms['form1']['scale'].value = interest_scale[curropIdx];
	}

	if (interest_alpha[curropIdx] == -10000) {
		document.forms['form1']['alpha'].value = "";
	} else {
		document.forms['form1']['alpha'].value = interest_alpha[curropIdx];
	}

	if (interest_rotation[curropIdx] == -10000) {
		document.forms['form1']['rotation'].value = "";
	} else {
		document.forms['form1']['rotation'].value = interest_rotation[curropIdx];
	}

	if (interest_minzoomfactor[curropIdx] == -10000) {
		document.forms['form1']['minzoomfactor'].value = "";
	} else {
		document.forms['form1']['minzoomfactor'].value = interest_minzoomfactor[curropIdx];
	}

	if (interest_maxzoomfactor[curropIdx] == -10000) {
		document.forms['form1']['maxzoomfactor'].value = "";
	} else {
		document.forms['form1']['maxzoomfactor'].value = interest_maxzoomfactor[curropIdx];
	}

	document.forms['form1']['weburl'].value = interest_weburl[curropIdx];
	document.forms['form1']['picurl'].value = interest_picurl[curropIdx];
	document.forms['form1']['iconurl'].value = interest_iconurl[curropIdx];
	document.forms['form1']['audiourl'].value = interest_audiourl[curropIdx];
	document.forms['form1']['shareble'].value = interest_shareble[curropIdx];
	document.forms['form1']['reachable'].value = interest_reachable[curropIdx];
	document.forms['form1']['readable'].value = interest_readable[curropIdx];
}

function deleteInterestPlace(posx, posy, realX, realY) {

	//alert(interest_div.length);


	for (var i = 0; i < interest_div.length; i++) {
		if (interest_div[i] == currdiv) {
			//var interest_x = new Array();
			// var interest_y = new Array();
			// var interest_label = new Array();
			// var interest_div = new Array();

			$.post("deletepoi.action", {
				mapId : interest_floor[i],
				placeX : interest_x[i],
				placeY : interest_y[i],

			});
			/*
			var interest_x = new Array();
			var interest_y = new Array();
			var interest_label = new Array();
			var interest_div = new Array();
			var interest_floor = new Array();

			var interest_type = new Array();
			var interest_detaileddesc = new Array();
			var interest_hallid = new Array();
			var interest_ttsid = new Array();
			var interest_nearnavid = new Array();
			var interest_scale = new Array();
			var interest_alpha = new Array();
			var interest_rotation = new Array();
			var interest_minzoomfactor = new Array();
			var interest_maxzoomfactor = new Array();
			var interest_weburl = new Array();
			var interest_picurl = new Array();
			var interest_iconurl = new Array();
			var interest_audiourl = new Array();
			var interest_reachable = new Array();
			var interest_readable = new Array();
			var interest_generaldesc = new Array();
			var interest_shareble = new Array();*/

			interest_x.splice(i, 1);
			interest_y.splice(i, 1);
			interest_label.splice(i, 1);
			interest_div.splice(i, 1);
			interest_floor.splice(i, 1);
			interest_type.splice(i, 1);
			interest_detaileddesc.splice(i, 1);
			interest_hallid.splice(i, 1);
			interest_ttsid.splice(i, 1);
			interest_nearnavid.splice(i, 1);
			interest_scale.splice(i, 1);
			interest_alpha.splice(i, 1);
			interest_rotation.splice(i, 1);
			interest_minzoomfactor.splice(i, 1);
			interest_maxzoomfactor.splice(i, 1);
			interest_weburl.splice(i, 1);
			interest_picurl.splice(i, 1);
			interest_iconurl.splice(i, 1);
			interest_audiourl.splice(i, 1);
			interest_reachable.splice(i, 1);
			interest_readable.splice(i, 1);
			interest_generaldesc.splice(i, 1);
			interest_shareble.splice(i, 1);
			break;
		}
	}

	// alert("cc");
	del_div(currdiv);
	currdiv = null;

	del_pop("id_out", "id_in");

	canvas.style.zIndex = 1;
	canvas_upper.style.zIndex = 2;

	detaildiv = document.getElementById("stylized");
	detaildiv.style.display = "none";
}

function mywait(time) {
	for (var i = 0; i < time; i++) {
		for (var j = 0; j < time; j++) {}
	}
}

//删除导航点,  注意要将所有的和这个点相关的导航线全部要删除
function deleteNavPoint(posx, posy, realX, realY) {

	//alert(interest_div.length);

	mcurrdiv = document.getElementById(currdiv);

	pt = parseInt(mcurrdiv.innerHTML);
	nav_flag[pt - 1] = false;

	//增加导航线, 跨楼层
	$.post("deletenavinode.action", {
		id : pt

	});

	//alert(pt);

	// 注意要将所有的和这个点相关的导航线全部要删除
	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt || toNode[i] == pt) {

			var deldiv = fromNode[i] + "_" + toNode[i];

			$.post("deletenavipath.action", {
				fromNode : fromNode[i],
				toNode : toNode[i],

			});

			//alert(deldiv);

			fromNode.splice(i, 1);

			toNode.splice(i, 1);
			direction.splice(i, 1);
			//forwardGuide.splice(i, 1);
			//backwardGuide.splice(i, 1);
			forwardGuide.splice(i, 1);
			backwardGuide.splice(i, 1);

			del_div(deldiv);

			//mywait(5000);


			i--;

		}
	}

	redrawAll();

	// alert("cc");
	del_div(currdiv);
	currdiv = null;

	del_pop("id_out", "id_in");

	canvas.style.zIndex = 1;
	canvas_upper.style.zIndex = 2;

	first = true;
}

function drawImage() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width * imgScale, img.height * imgScale);
}

function drawArrowLine(sta, end, arrow) {
	ctx_nav.save();
	ctx_nav.translate(0, 800); //坐标源点
	ctx_nav.strokeStyle = 'green';
	ctx_nav.lineWidth = 2;

	//画线
	ctx_nav.beginPath();
	ctx_nav.moveTo(sta[0], -sta[1]);
	ctx_nav.lineTo(end[0], -end[1]);
	ctx_nav.stroke();

	//画箭头
	if (arrow) {
		ctx_nav.translate(end[0], -end[1]);
		(end[1] - sta[1] >= 0) ?
		ctx_nav.rotate(Math.atan((end[0] - sta[0]) / (end[1] - sta[1]))) :
		ctx_nav.rotate(Math.PI + Math.atan((end[0] - sta[0]) / (end[1] - sta[1]))); //旋转弧度
		ctx_nav.lineTo(-5, 15);
		ctx_nav.lineTo(0, 10);
		ctx_nav.lineTo(10, 15);
		ctx_nav.lineTo(0, 0);
		ctx_nav.fill();
	}
	ctx_nav.restore();

}

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x : x - bbox.left - (bbox.width - canvas.width) / 2,
		y : y - bbox.top - (bbox.height - canvas.height) / 2
	};
}

function drawArrowLine(sta, end, arrow) {
	ctx_nav.save();
	ctx_nav.translate(0, 800); //坐标源点
	ctx_nav.strokeStyle = 'green';
	ctx_nav.lineWidth = 2;

	//画线
	ctx_nav.beginPath();
	ctx_nav.moveTo(sta[0], -sta[1]);
	ctx_nav.lineTo(end[0], -end[1]);
	ctx_nav.stroke();

	//画箭头
	if (arrow) {
		ctx_nav.translate(end[0], -end[1]);
		(end[1] - sta[1] >= 0) ?
		ctx_nav.rotate(Math.atan((end[0] - sta[0]) / (end[1] - sta[1]))) :
		ctx_nav.rotate(Math.PI + Math.atan((end[0] - sta[0]) / (end[1] - sta[1]))); //旋转弧度
		ctx_nav.lineTo(-5, 15);
		ctx_nav.lineTo(0, 10);
		ctx_nav.lineTo(10, 15);
		ctx_nav.lineTo(0, 0);
		ctx_nav.fill();
	}
	ctx_nav.restore();

}

function redraw() {
	ctx_nav.clearRect(0, 0, WIDTH, HEIGHT);

	for (var i = 0; i < fromNode.length; i++) {
		var x1 = nav_x[fromNode[i] - 1];
		var y1 = nav_y[fromNode[i] - 1];

		var x2 = nav_x[toNode[i] - 1];
		var y2 = nav_y[toNode[i] - 1];

		if (direction[i] == 1) {

			ctx_nav.strokeStyle = 'blue';
			ctx_nav.lineWidth = 2;

			ctx_nav.beginPath();

			ctx_nav.moveTo(x1, y1);
			ctx_nav.lineTo(x2, y2);

			ctx_nav.stroke();

		} else {
			new_x2 = x1 + (x2 - x1) * 5 / 6;
			new_y2 = y1 + (y2 - y1) * 5 / 6;

			var vector = {
				sta : [x1, 800 - y1],
				end : [new_x2, 800 - new_y2]
			};

			drawArrowLine(vector.sta, vector.end, true);

			var vector = {
				sta : [new_x2, 800 - new_y2],
				end : [x2, 800 - y2]
			};

			drawArrowLine(vector.sta, vector.end, false);
		}
	}
}

function judgeTransitPt(pt) {

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt) {
			if (nav_flag[toNode[i] - 1]) {

				if (nav_floor[fromNode[i] - 1] != nav_floor[toNode[i] - 1]) {

					return true;

				}
			}
		}
	}

	for (var i = 0; i < toNode.length; i++) {

		if (toNode[i] == pt) {
			if (nav_flag[fromNode[i] - 1]) {

				if (nav_floor[fromNode[i] - 1] != nav_floor[toNode[i] - 1]) {

					return true;

				}
			}
		}
	}

	return false;

}

function redrawAll() {
	ctx_nav.clearRect(0, 0, WIDTH, HEIGHT);

	var mleft = 0;
	var mtop = 0;

	for (var i = 0; i < nav_x.length; i++) {
		var navdiv = document.getElementById(nav_div[i]);

		if (!nav_flag[i]) {
			continue;
		}

		if (nav_floor[i] == which_floor) {
			//alert(movex);
			//alert(movey);
			navdiv.style.left = imgX + nav_x[i] * imgScale - 12 + CANVAS_OFFSET_X + "px";
			navdiv.style.top = imgY + nav_y[i] * imgScale - 12 + CANVAS_OFFSET_Y + "px";

			mleft = imgX + nav_x[i] * imgScale - 12 + CANVAS_OFFSET_X;
			mtop = imgY + nav_y[i] * imgScale - 12 + CANVAS_OFFSET_Y;

			navdiv.style.display = "block";

			if (isOutOfBoundary(mleft, mtop)) {
				navdiv.style.display = "none";
			}

			if (nav_transit[i]) {
				trandivId = (i + 1) + "_transit"
				trandiv = document.getElementById(trandivId);

				for (var j = 0; j < navtransdiv.length; j++) {
					if (trandivId == navtransdiv[j]) {
						trandiv.style.left = imgX + trans_x[j] * imgScale - 12 + CANVAS_OFFSET_X + "px";
						trandiv.style.top = imgY + trans_y[j] * imgScale - 12 + CANVAS_OFFSET_Y + "px";

						mleft = imgX + trans_x[j] * imgScale - 12 + CANVAS_OFFSET_X;
						mtop = imgY + trans_y[j] * imgScale - 12 + CANVAS_OFFSET_Y;
						break;
					}
				}

				trandiv.style.display = "block";

				if (isOutOfBoundary(mleft, mtop)) {
					trandiv.style.display = "none";
				}

				var trandivlineId = (i + 1) + "_" + "0";
				var trandivline = document.getElementById(trandivlineId);

				for (var j = 0; j < navtransdiv.length; j++) {
					if (trandivlineId == navtransdiv[j]) {
						trandivline.style.left = imgX + trans_x[j] * imgScale - 5 + CANVAS_OFFSET_X + "px";
						trandivline.style.top = imgY + trans_y[j] * imgScale - 5 + CANVAS_OFFSET_Y + "px";

						mleft = imgX + trans_x[j] * imgScale - 5 + CANVAS_OFFSET_X;
						mtop = imgY + trans_y[j] * imgScale - 5 + CANVAS_OFFSET_Y;
						break;
					}
				}

				trandivline.style.display = "block";

				if (isOutOfBoundary(mleft, mtop)) {
					trandivline.style.display = "none";
				}

				var x1 = imgX + nav_x[i] * imgScale;
				var y1 = imgY + nav_y[i] * imgScale;

				var x2 = x1;
				var y2 = y1 + 20 * imgScale;

				ctx_nav.strokeStyle = '#993300';
				ctx_nav.lineWidth = 4;

				ctx_nav.beginPath();

				ctx_nav.moveTo(x1, y1);
				ctx_nav.lineTo(x2, y2);

				ctx_nav.stroke();

				var x1 = x2;
				var y1 = y2 + 10 * imgScale;

				var x2 = x1;
				var y2 = y1 + 20 * imgScale;

				ctx_nav.strokeStyle = '#993300';
				ctx_nav.lineWidth = 4;

				ctx_nav.beginPath();

				ctx_nav.moveTo(x1, y1);
				ctx_nav.lineTo(x2, y2);

				ctx_nav.stroke();

				var x1 = x2;
				var y1 = y2 + 10 * imgScale;

				var x2 = x1;
				var y2 = y1 + 20 * imgScale;

			}
		} else {

			navdiv.style.display = "none";

			if (nav_transit[i]) {
				trandivId = (i + 1) + "_transit"
				trandiv = document.getElementById(trandivId);
				trandiv.style.display = "none";

				var trandivlineId = (i + 1) + "_" + "0";
				var trandivline = document.getElementById(trandivlineId);
				trandivline.style.display = "none";
			}

		}
	}

	for (var i = 0; i < fromNode.length; i++) {

		divlineId = fromNode[i] + "_" + toNode[i];

		var divline = document.getElementById(divlineId);

		if (nav_floor[fromNode[i] - 1] != which_floor || nav_floor[toNode[i] - 1] != which_floor) {

			if (divline != null) {
				divline.style.display = "none";
			}

			continue;

		}

		if (divline != null) {

			for (var j = 0; j < navtransdiv.length; j++) {
				if (divlineId == navtransdiv[j]) {
					divline.style.left = imgX + trans_x[j] * imgScale - 5 + CANVAS_OFFSET_X + "px";
					divline.style.top = imgY + trans_y[j] * imgScale - 5 + CANVAS_OFFSET_Y + "px";

					mleft = imgX + trans_x[j] * imgScale - 5 + CANVAS_OFFSET_X;
					mtop = imgY + trans_y[j] * imgScale - 5 + CANVAS_OFFSET_Y + "px";
					break;
				}
			}
			divline.style.display = "block";

			if (isOutOfBoundary(mleft, mtop)) {
				divline.style.display = "none";
			}

		}

		var x1 = imgX + nav_x[fromNode[i] - 1] * imgScale;
		var y1 = imgY + nav_y[fromNode[i] - 1] * imgScale;

		var x2 = imgX + nav_x[toNode[i] - 1] * imgScale;
		var y2 = imgY + nav_y[toNode[i] - 1] * imgScale;

		if (direction[i] == 1) {

			ctx_nav.strokeStyle = 'blue';
			ctx_nav.lineWidth = 2;

			ctx_nav.beginPath();

			ctx_nav.moveTo(x1, y1);
			ctx_nav.lineTo(x2, y2);

			ctx_nav.stroke();

		} else {
			new_x2 = x1 + (x2 - x1) * 5 / 6;
			new_y2 = y1 + (y2 - y1) * 5 / 6;

			var vector = {
				sta : [x1, 800 - y1],
				end : [new_x2, 800 - new_y2]
			};

			drawArrowLine(vector.sta, vector.end, true);

			var vector = {
				sta : [new_x2, 800 - new_y2],
				end : [x2, 800 - y2]
			};

			drawArrowLine(vector.sta, vector.end, false);
		}
	}

}

function selectFloor(floor) {
	if (floor == which_floor) {
		return;
	}

	imgX = 0,
	imgY = 0,
	imgScale = 1;

	var floor_ul_1 = document.getElementById('floor_ul_1');
	var floor_ul_2 = document.getElementById('floor_ul_2');

	if (floor == 15) {
		img.src = "images/map.png";
		floor_ul_1.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		floor_ul_2.style.background = "";
		floor_ul_1.style.backgroundSize = "6px 6px";
		which_floor = 15;
		document.getElementById('floortext').innerHTML = '15F';
		scaleLevel = 3;
	} else {
		img.src = "images/map2.png";
		floor_ul_2.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		floor_ul_1.style.background = "";
		floor_ul_2.style.backgroundSize = "6px 6px";
		which_floor = 5;
		document.getElementById('floortext').innerHTML = '5F';
		scaleLevel = 3;
	}

	clearInterestDraw();
	clearNavDraw();

	if (point_type == ONLY_NAV) {
		redrawAll();
	} else if (point_type == ONLY_INTEREST) {
		showInterestDraw();
	} else if (point_type == BOTH_NAV_INTEREST) {
		redrawAll();
		showInterestDraw();
	}

	var floor_ul = document.getElementById('floor_ul');

	floor_ul.style.display = "none";

	//#floor_ul_1 {
	//background:url(images/circle.gif) no-repeat 5px 8px;
	//background-size:6px 6px;


}

// 2.向select选项中 加入一个Item
function jsAddItemToSelect(objSelect, objItemText, objItemValue) {
	//判断是否存在

	var varItem = new Option(objItemText, objItemValue);
	objSelect.options.add(varItem);

}

function changeFloor(floor) {
	var selectNav = document.getElementById("selectNav");
	document.all.selectNav.options.length = 0;

	var currIdx = -1;
	var tag = new Array();
	var dist = new Array();

	if (currdiv != null) {
		for (var i = 0; i < nav_div.length; i++) {
			if (nav_div[i] == currdiv) {

				currIdx = i;
				break;
			}
		}
	}

	if (floor == "1") {
		//selectNav
		var x1 = nav_x[currIdx];
		var y1 = nav_y[currIdx];

		tag.length = 0;

		for (var i = 0; i < nav_div.length; i++) {
			if (i != currIdx && nav_flag[i]) {
				if (nav_floor[i] == which_floor) {
					var x2 = nav_x[i];
					var y2 = nav_y[i];
					var d = mdist(x1, y1, x2, y2);
					dist.push(d);
					tag.push(i + 1);
				}
			}

		}

		tag = bubbleSort(dist, tag);

		for (var i = 0; i < tag.length; i++) {
			jsAddItemToSelect(selectNav, tag[i], tag[i + 1]);
		}

	} else {
		for (var i = 0; i < nav_div.length; i++) {
			if (i != currIdx && nav_flag[i]) {
				if (nav_floor[i] != which_floor) {

					jsAddItemToSelect(selectNav, i + 1, i + 1);
				}

			}

		}

	}

}

function changeTransit(to_node) {

	//alert (pt);
	var pathInfo = " 该导航线连接导航节点" + curr_node + "与" + to_node;
	var op1 = curr_node + " 到 " + to_node;
	var op2 = to_node + " 到 " + curr_node;
	var op3 = "";

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == curr_node && toNode[i] == to_node) {
			if (direction[i] == 1) {
				op3 = "(双向)";
			} else {
				op3 = "(" + curr_node + "->" + to_node + ")";
			}

			curr_from_node = curr_node;
			curr_to_node = to_node;

			break;
		}

		if (toNode[i] == curr_node && fromNode[i] == to_node) {
			if (direction[i] == 1) {
				op3 = "(双向)";
			} else {
				op3 = "(" + to_node + "->" + curr_node + ")";
			}

			var pathInfo = " 该导航线连接导航节点" + to_node + "与" + curr_node;

			var op2 = curr_node + " 到 " + to_node;
			var op1 = to_node + " 到 " + curr_node;

			curr_from_node = to_node;
			curr_to_node = curr_node;

			break;

		}
	}

	document.all.selectNavType.options.length = 0;

	jsAddItemToSelect(selectNavType, "双向", 1);
	jsAddItemToSelect(selectNavType, op1, 2);
	jsAddItemToSelect(selectNavType, op2, 3);
	//jsAddItemToSelect(selectNavType, "删除", 3);

	pathInfo += op3;

	var pathInfoDiv = document.getElementById("pathInfo");
	//pathInfoDiv.style = "width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px";
	//pathInfoDiv.text = pathInfo;
	//alert(pathInfoDiv.innerHTML);
	pathInfoDiv.innerHTML = "<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>" + pathInfo + "</b></div>"

		//
		pathInfo += op3;

	var opLineDiv = document.getElementById("opline");
	//pathInfoDiv.style = "width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px";
	//pathInfoDiv.text = pathInfo;
	//alert(pathInfoDiv.innerHTML);
	opLineDiv.innerHTML = "<div id = 'opline' style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center>&nbsp;&nbsp;<button type='button' class = 'blue',  onClick= 'opTransitLine(" + curr_from_node + "," + curr_to_node + ")'" + ">提交</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <button type='button' class = 'red',  onClick= 'deleteTransitNavLine(" + curr_from_node + "," + curr_to_node + ")'" + ">删除</button> </div>"

}

function selectInterestNav(value) {
	var point_ul_1 = document.getElementById('point_ul_1');
	var point_ul_2 = document.getElementById('point_ul_2');

	if (value == 1) {
		switch (point_type) {
		case NO_NAV_INTEREST:
			point_type = ONLY_NAV;
			break;
		case ONLY_NAV:
			point_type = NO_NAV_INTEREST;
			break;
		case ONLY_INTEREST:
			point_type = BOTH_NAV_INTEREST;
			break;
		case BOTH_NAV_INTEREST:
			point_type = ONLY_INTEREST;
		default:
			break;
		}
	} else {
		switch (point_type) {
		case NO_NAV_INTEREST:
			point_type = ONLY_INTEREST;
			break;
		case ONLY_NAV:
			point_type = BOTH_NAV_INTEREST;
			break;
		case ONLY_INTEREST:
			point_type = NO_NAV_INTEREST;
			break;
		case BOTH_NAV_INTEREST:
			point_type = ONLY_NAV;
		default:
			break;
		}
	}

	switch (point_type) {
	case NO_NAV_INTEREST:
		point_ul_2.style.background = "";
		point_ul_1.style.background = "";
		document.getElementById('pointtypetext').innerHTML = '仅显示地图';
		break;
	case ONLY_NAV:
		point_ul_1.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		point_ul_2.style.background = "";
		point_ul_1.style.backgroundSize = "6px 6px";
		document.getElementById('pointtypetext').innerHTML = '仅显示导航点';
		break;
	case ONLY_INTEREST:
		point_ul_2.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		point_ul_1.style.background = "";
		point_ul_2.style.backgroundSize = "6px 6px";
		document.getElementById('pointtypetext').innerHTML = '仅显示兴趣点';
		break;
	case BOTH_NAV_INTEREST:
		point_ul_2.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		point_ul_2.style.backgroundSize = "6px 6px";
		point_ul_1.style.background = "url(images/circle.gif) no-repeat 5px 8px";
		point_ul_1.style.backgroundSize = "6px 6px";
		document.getElementById('pointtypetext').innerHTML = '导航点与兴趣点均显示';
	default:
		break;
	}

	clearInterestDraw();
	clearNavDraw();

	if (point_type == ONLY_NAV) {
		redrawAll();
	} else if (point_type == ONLY_INTEREST) {
		showInterestDraw();
	} else if (point_type == BOTH_NAV_INTEREST) {
		redrawAll();
		showInterestDraw();
	}

	var point_ul = document.getElementById('point_ul');

	point_ul.style.display = "none";

}

function submitPoiDetailInfo() {

	var mtype = 0;
	var mshareble = true;
	var mreachable = true;
	var mreadable = true;

	//先根据placeX placeY floor唯一确定要更新的行
	//再填入具体数据
	if (document.forms['form1']['selectInterest'].value == "0") {
		mtype = 0;

	} else if (document.forms['form1']['selectInterest'].value == "3") {
		mtype = 3;

	} else if (document.forms['form1']['selectInterest'].value == "4") {
		mtype = 4;

	} else if (document.forms['form1']['selectInterest'].value == "5") {
		mtype = 5;

	} else if (document.forms['form1']['selectInterest'].value == "6") {
		mtype = 6;
	}

	if (document.forms['form1']['shareble'].value == "1") {
		mshareble = true;
	} else {
		mshareble = false;
	}

	if (document.forms['form1']['reachable'].value == "1") {
		mreachable = true;
	} else {
		mreachable = false;
	}

	if (document.forms['form1']['readable'].value == "1") {
		mreadable = true;
	} else {
		mreadable = false;
	}

	/*
	var opIdx = -1;

	for (var i = 0; i < interest_x.length; i++) {
	if (interest_x[i] == document.forms['form1']['xpos'].value) {
	if (interest_y[i] == document.forms['form1']['ypos'].value) {
	if (interest_floor[i] == which_floor) {
	opIdx
	}
	}
	}
	}*/

	//alert(mshareble);
	interest_label[curropIdx] = document.forms['form1']['poilabel'].value;

	interest_type[curropIdx] = document.forms['form1']['selectInterest'].value;
	interest_detaileddesc[curropIdx] = document.forms['form1']['detaileddesc'].value;

	if (document.forms['form1']['hallid'].value == "") {
		interest_hallid[curropIdx] = -10000;
	} else {
		interest_hallid[curropIdx] = parseInt(document.forms['form1']['hallid'].value);
	}

	if (document.forms['form1']['ttsid'].value == "") {
		interest_ttsid[curropIdx] = -10000;
	} else {
		interest_ttsid[curropIdx] = parseInt(document.forms['form1']['ttsid'].value);
	}

	if (document.forms['form1']['nearnavid'].value == "") {
		interest_nearnavid[curropIdx] = -10000;
	} else {
		interest_nearnavid[curropIdx] = parseInt(document.forms['form1']['nearnavid'].value);
	}

	if (document.forms['form1']['scale'].value == "") {
		interest_scale[curropIdx] = -10000;
	} else {
		interest_scale[curropIdx] = parseInt(document.forms['form1']['scale'].value);
	}

	if (document.forms['form1']['alpha'].value == "") {
		interest_alpha[curropIdx] = -10000;
	} else {
		interest_alpha[curropIdx] = parseInt(document.forms['form1']['alpha'].value);
	}

	if (document.forms['form1']['rotation'].value == "") {
		interest_rotation[curropIdx] = -10000;
	} else {
		interest_rotation[curropIdx] = parseInt(document.forms['form1']['rotation'].value);
	}

	if (document.forms['form1']['minzoomfactor'].value == "") {
		interest_minzoomfactor[curropIdx] = -10000;
	} else {
		interest_minzoomfactor[curropIdx] = parseInt(document.forms['form1']['minzoomfactor'].value);
	}

	if (document.forms['form1']['maxzoomfactor'].value == "") {
		interest_maxzoomfactor[curropIdx] = -10000;
	} else {
		interest_maxzoomfactor[curropIdx] = parseInt(document.forms['form1']['maxzoomfactor'].value);
	}

	interest_weburl[curropIdx] = document.forms['form1']['weburl'].value;
	interest_picurl[curropIdx] = document.forms['form1']['picurl'].value;
	interest_iconurl[curropIdx] = document.forms['form1']['iconurl'].value;
	interest_audiourl[curropIdx] = document.forms['form1']['audiourl'].value;
	interest_generaldesc[curropIdx] = document.forms['form1']['generaldesc'].value;

	interest_reachable[curropIdx] = document.forms['form1']['reachable'].value;
	interest_readable[curropIdx] = document.forms['form1']['readable'].value;
	interest_shareble[curropIdx] = document.forms['form1']['shareble'].value;

	$.post("updatepoi.action", {
		type : mtype,
		hallId : interest_hallid[curropIdx],
		ttsNo : interest_ttsid[curropIdx],
		mapId : which_floor,
		placeX : document.forms['form1']['xpos'].value,
		placeY : document.forms['form1']['ypos'].value,
		neareastNaviNode : interest_nearnavid[curropIdx],
		iconUrl : document.forms['form1']['iconurl'].value,
		audioUrl : document.forms['form1']['audiourl'].value,
		webUrl : document.forms['form1']['weburl'].value,
		picUrl : document.forms['form1']['picurl'].value,
		label : document.forms['form1']['poilabel'].value,
		generalDesc : document.forms['form1']['generaldesc'].value,
		detailedDesc : document.forms['form1']['detaileddesc'].value,
		shareble : mshareble,
		reachable : mreachable,
		readable : mreadable,
		scale : interest_scale[curropIdx],
		alpha : interest_alpha[curropIdx],
		rotation : interest_rotation[curropIdx],
		maxZoomFactor : interest_maxzoomfactor[curropIdx],
		minZoomFactor : interest_minzoomfactor[curropIdx]

	}, function (text, status) {
		alert("提交数据成功");
		detaildiv = document.getElementById("stylized");
		detaildiv.style.display = "none";

		document.forms['form1']['poilabel'].value = "";
		document.forms['form1']['floor'].value = "";
		document.forms['form1']['xpos'].value = "";
		document.forms['form1']['ypos'].value = "";
		document.forms['form1']['selectInterest'].value = "0";
		document.forms['form1']['detaileddesc'].value = "";
		document.forms['form1']['hallid'].value = "";
		document.forms['form1']['ttsid'].value = "";
		document.forms['form1']['nearnavid'].value = "";
		document.forms['form1']['scale'].value = "";
		document.forms['form1']['alpha'].value = "";
		document.forms['form1']['rotation'].value = "";
		document.forms['form1']['minzoomfactor'].value = "";
		document.forms['form1']['maxzoomfactor'].value = "";
		document.forms['form1']['weburl'].value = "";
		document.forms['form1']['picurl'].value = "";
		document.forms['form1']['iconurl'].value = "";
		document.forms['form1']['audiourl'].value = "";
		document.forms['form1']['shareble'].value = "1";
		document.forms['form1']['reachable'].value = "1";
		document.forms['form1']['readable'].value = "1";
	});

}

function cancelPoiDetailInfo() {
	detaildiv = document.getElementById("stylized");
	detaildiv.style.display = "none";

	document.forms['form1']['poilabel'].value = "";
	document.forms['form1']['floor'].value = "";
	document.forms['form1']['xpos'].value = "";
	document.forms['form1']['ypos'].value = "";
	document.forms['form1']['selectInterest'].value = "0";
	document.forms['form1']['detaileddesc'].value = "";
	document.forms['form1']['hallid'].value = "";
	document.forms['form1']['ttsid'].value = "";
	document.forms['form1']['nearnavid'].value = "";
	document.forms['form1']['scale'].value = "";
	document.forms['form1']['alpha'].value = "";
	document.forms['form1']['rotation'].value = "";
	document.forms['form1']['minzoomfactor'].value = "";
	document.forms['form1']['maxzoomfactor'].value = "";
	document.forms['form1']['weburl'].value = "";
	document.forms['form1']['picurl'].value = "";
	document.forms['form1']['iconurl'].value = "";
	document.forms['form1']['audiourl'].value = "";
	document.forms['form1']['shareble'].value = "1";
	document.forms['form1']['reachable'].value = "1";
	document.forms['form1']['readable'].value = "1";
}

function clearNavDraw() {
	ctx_nav.clearRect(0, 0, WIDTH, HEIGHT);

	for (var i = 0; i < nav_x.length; i++) {
		var navdiv = document.getElementById(nav_div[i]);

		if (!nav_flag[i]) {
			continue;
		}

		navdiv.style.display = "none";

		if (nav_transit[i]) {
			trandivId = (i + 1) + "_transit"
			trandiv = document.getElementById(trandivId);
			trandiv.style.display = "none";

			var trandivlineId = (i + 1) + "_" + "0";
			var trandivline = document.getElementById(trandivlineId);
			trandivline.style.display = "none";
		}
	}

	for (var i = 0; i < fromNode.length; i++) {

		divlineId = fromNode[i] + "_" + toNode[i];

		var divline = document.getElementById(divlineId);

		if (divline != null) {
			divline.style.display = "none";
		}
	}
}

function clearInterestDraw() {
	for (var i = 0; i < interest_x.length; i++) {
		var interestdiv = document.getElementById(interest_div[i]);

		interestdiv.style.display = "none";

	}
}

function showInterestDraw() {
	for (var i = 0; i < interest_x.length; i++) {
		var interestdiv = document.getElementById(interest_div[i]);

		if (interest_floor[i] == which_floor) {
			interestdiv.style.display = "block";

			var xx = imgX + (interest_x[i]) * imgScale + offset_x + CANVAS_OFFSET_X;
			var yy = imgY + (interest_y[i]) * imgScale + offset_y + CANVAS_OFFSET_Y;

			if (isOutOfBoundary(xx, yy)) {
				interestdiv.style.display = "none";
			}

			interestdiv.style.left = xx + "px";
			interestdiv.style.top = yy + "px";
		} else {
			interestdiv.style.display = "none";
		}

	}
}

function zoomIn() {
	var zoom_ul = document.getElementById('zoom_ul');

	zoom_ul.style.display = "none";

	if (imgScale >= 1.4) {

		return;
	}

	scaleLevel++;

	displayScale();

	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;

	var pos = windowToCanvas(canvas, 200, 200);

	imgScale *= 1.2;
	imgX = imgX * 1.2 - pos.x * 1.2;
	imgY = imgY * 1.2 - pos.y * 1.2;

	drawImage();

	clearInterestDraw();
	clearNavDraw();

	if (point_type == ONLY_NAV) {
		redrawAll();
	} else if (point_type == ONLY_INTEREST) {
		showInterestDraw();

	} else if (point_type == BOTH_NAV_INTEREST) {
		redrawAll();
		showInterestDraw();

	}

}

function zoomOut() {
	var zoom_ul = document.getElementById('zoom_ul');

	zoom_ul.style.display = "none";

	if (imgScale <= 1 / 1.4) {
		return;
	}

	scaleLevel--;

	displayScale();

	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;

	var pos = windowToCanvas(canvas, 200, 200);

	imgScale /= 1.2;
	imgX = imgX / 1.2 + pos.x / 1.2;
	imgY = imgY / 1.2 + pos.y / 1.2;
	onscale(1 / 1.2, pos.x / 1.2, pos.y / 1.2);

	drawImage();

	clearInterestDraw();
	clearNavDraw();

	if (point_type == ONLY_NAV) {
		redrawAll();
	} else if (point_type == ONLY_INTEREST) {
		showInterestDraw();

	} else if (point_type == BOTH_NAV_INTEREST) {
		redrawAll();
		showInterestDraw();

	}
}

function isOutOfBoundary(x, y) {

	if (x >= CANVAS_OFFSET_X + WIDTH || x <= CANVAS_OFFSET_X) {
		return true;
	}

	if (y >= CANVAS_OFFSET_Y + HEIGHT || y <= CANVAS_OFFSET_Y) {
		return true;
	}

	return false;

}

function displayScale() {
	switch (scaleLevel) {
	case 1:
		document.getElementById('zoomtext').innerHTML = '原图比例69%(最小尺寸)';
		break;
	case 2:
		document.getElementById('zoomtext').innerHTML = '原图比例83%';
		break;
	case 3:
		document.getElementById('zoomtext').innerHTML = '原图比例';
		break;
	case 4:
		document.getElementById('zoomtext').innerHTML = '原图比例120%';
		break;
	case 5:
		document.getElementById('zoomtext').innerHTML = '原图比例144%(最大尺寸)';
		break;

	}
}
