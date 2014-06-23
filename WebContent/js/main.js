var canvas, context, canvas_upper, ctx_up, canvas_nav, ctx_nav;
var img; //图片对象
var which_floor = 15,
imgIsLoaded, //图片是否加载完成;
imgX = 0,
imgY = 0,
imgScale = 1;
var is_transit = false;

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

var interest_x = new Array();
var interest_y = new Array();
var interest_label = new Array();
var interest_div = new Array();

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

(function int() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas_upper = document.getElementById('line');
	ctx_up = canvas_upper.getContext('2d');

	canvas_nav = document.getElementById('nav');
	ctx_nav = canvas_nav.getContext('2d');

	//initplaceNav(100, 100, "", "22");
	//initplaceLine(100, 100, "22");
	//ctx_nav.fillStyle='rgb(255,255,0)';

	// ctx_nav.fillRect(50,50,200,200);

	//路径绘制开始

	/*

	ctx_nav.beginPath();

	//路径的绘制

	ctx_nav.moveTo(0,100);

	ctx_nav.lineTo(0,290);

	ctx_nav.lineTo(290,290);

	ctx_nav.stroke();

	//路径绘制结束
	ctx_nav.closePath();

	//ctx_up.clearRect(0, 0, 1200, 1600);

	 */

	loadImg();

})();

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

	div.style.background = "url(blue.gif) repeat-x 0 -33px";
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

	div.style.background = "url(blue.gif) repeat-x 0 -33px";
	div.style.color = "white";
	div.style.height = "21px";
	div.style.padding = "2px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "12px";
	div.style.zIndex = 3;

	x = x * imgScale + imgX + offset_x;
	y = y * imgScale + imgY + offset_y;

	div.style.left = x + "px";
	div.style.top = y + "px";

	div.innerHTML = content;

	var span = document.createElement("span");
	div.appendChild(span);
	span.appendChild(document.createTextNode(""));

	var arrow = document.createElement("div");
	arrow.style.background = "url(blue.gif) no-repeat -8px -100px";
	arrow.style.position = "absolute";
	arrow.style.width = "30px";
	arrow.style.height = "12px";
	arrow.style.top = "19px";
	arrow.style.left = "0px";
	arrow.style.overflow = "hidden";
	div.appendChild(arrow);

	var leftBar = this._leftBar = document.createElement("div");
	leftBar.style.background = "url(blue.gif) no-repeat -12px -2px";
	leftBar.style.position = "absolute";
	leftBar.style.width = "11px";
	leftBar.style.height = "24px";
	leftBar.style.top = "0px";
	leftBar.style.left = "-10px";
	leftBar.style.overflow = "hidden";
	div.appendChild(leftBar);

	var rightBar = document.createElement("div");
	rightBar.style.background = "url(blue.gif) no-repeat -22px -2px";
	rightBar.style.position = "absolute";
	rightBar.style.width = "11px";
	rightBar.style.height = "24px";
	rightBar.style.top = "0px";
	rightBar.style.right = "-10px";
	rightBar.style.overflow = "hidden";
	div.appendChild(rightBar);

	var bodydiv = document.getElementById("body");

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

		pop_up(pos.x, pos.y, realX, realY, false, content);

		canvas.style.zIndex = 2;
		canvas_upper.style.zIndex = 1;

		ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	}
	div.onmouseover = function () {
		this.style.zIndex = 9999;
		this.style.background = "url(blue2.gif) repeat-x 0 -33px";
		this.getElementsByTagName("span")[0].innerHTML = "";
		arrow.style.background = "url(blue2.gif) no-repeat -8px -100px";
		leftBar.style.background = "url(blue2.gif) no-repeat -12px -2px";
		rightBar.style.background = "url(blue2.gif) no-repeat -22px -2px";
	}

	div.onmouseout = function () {
		this.style.zIndex = 3;
		this.style.cursor = 'hand'; //放上去小手状
		this.style.background = "url(blue.gif) repeat-x 0 -33px";
		this.getElementsByTagName("span")[0].innerHTML = "";
		arrow.style.background = "url(blue.gif) no-repeat -8px -100px";
		leftBar.style.background = "url(blue.gif) no-repeat -12px -2px";
		rightBar.style.background = "url(blue.gif) no-repeat -22px -2px";
	}
}

function initplaceNav(x, y, content, divid) {
	//保存map对象实例

	//创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.id = divid;
	div.style.position = "absolute";

	div.style.color = "yellow";
	if (content != "换") {
		div.style.background = "red";
	} else {
		div.style.background = "green";
	}
	div.style.borderRadius = "15px";
	div.style.height = "24px";
	div.style.width = "24px";

	div.style.lineHeight = "12px";
	//div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "16px";
	div.style.textAlign = "center";
	div.style.lineHeight = "20px";
	div.style.zIndex = 3;
	div.style.verticalAlign = "bottom";
	div.style.fontWeight = "bolder";
	//div.style.fontColor = "#FFFF00";


	x = x * imgScale + imgX - 12;
	y = y * imgScale + imgY - 12;

	div.style.left = x + "px";
	div.style.top = y + "px";

	div.innerHTML = content;

	var bodydiv = document.getElementById("body");

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

		pop_up(pos.x, pos.y, realX, realY, false, content);

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
	div.style.zIndex = 3;
	div.style.verticalAlign = "bottom";
	div.style.fontWeight = "bolder";
	//div.style.fontColor = "#FFFF00";


	x = x * imgScale + imgX - 5;
	y = y * imgScale + imgY - 5;

	div.style.left = x + "px";
	div.style.top = y + "px";

	var bodydiv = document.getElementById("body");

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

		pop_up_line_info(pos.x, pos.y, pt1, pt2);

		canvas.style.zIndex = 2;
		canvas_upper.style.zIndex = 1;

		ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	}

}
function pop_up(posx, posy, realX, realY, isInput, content) {

	var login;

	if (posy > 1500) {
		posy = posy - 260;
		posx = posx + 30;
	}

	if (isInput) {
		login = new createLoginNav(realX, realY, posx, posy, content);
		if (content == null) {
			setNewPointNav(realX, realY);
		}
	} else {
		//alert("aa");
		login = new createInfoNav(posx, posy, realX, realY, content);
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

	login.zIndex = 10000;
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

	login.appendChild(x);

	var bodydiv = document.getElementById("body");

	bodydiv.appendChild(div_in);
	bodydiv.style.overflow = "scroll";
	bodydiv.style.zIndex = 10000;
	//bodydiv.style.overflow = "hidden";

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

	login.zIndex = 10000;
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

	var bodydiv = document.getElementById("body");

	bodydiv.appendChild(div_in);
	bodydiv.style.overflow = "scroll";
	bodydiv.style.zIndex = 10000;
	//bodydiv.style.overflow = "hidden";

}

function del_pop(id_out, id_in) {
	var bodydiv = document.getElementById('body');
	bodydiv.style.overflow = "scroll";

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


		var xx = imgX + (interest_x[i]) * imgScale + x + offset_x;
		var yy = imgY + (interest_y[i]) * imgScale + y + offset_y;

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

function del_div(temp) {
	var bodydiv = document.getElementById('body');
	bodydiv.style.overflow = "scroll";

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
	//alert("xx");

	for (var i = 0; i < interest_div.length; i++) {
		var div = document.getElementById(interest_div[i]);

		//alert(div);


		var xx = imgX + (interest_x[i]) * imgScale + offset_x;
		var yy = imgY + (interest_y[i]) * imgScale + offset_y;

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
		"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标  " + "  X=" + realX + "  Y=" + realY + "</div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='兴趣点' value=" + interest_name + "></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>节点类型&nbsp</b></label>  <select name='selectInterest' id='selectInterest'><option value='1'>电影馆 </option><option value='2'>展览馆 </option> <option value='3'>公交站</option><option value='4'>餐厅</option><option value='5'>导航点</option></select>  </div>" +

		"<div style='width:300px;height:120px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><label for=name style='font:color:green'><b>简要描述&nbsp</b></label> <br><br>&nbsp;&nbsp;<textarea name='content' cols='30' rows='4' placeholder='请输入具体信息' with='180px'></textarea></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><ceneter><a href='#'  style='display:block;text-align:center;'>编辑更完整信息</a></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'setPoint(" + realX + "," + realY + ")'" + ">提交</button></div>" +
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

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='检票口' value=" + nav_name + "></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
			"</form>";
	} else {
		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标" + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='检票口' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>楼层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>  <select name='selectFloor' id='selectFloor'><option value='1'>F15</option><option value='2'>F5</option></select> </div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>连通点&nbsp;&nbsp;&nbsp;&nbsp</b></label><select name='selectNav' id='selectNav'><option value='1'>1</option><option value='2'>2</option></option><option value='3'>3</option></option><option value='4'>4</option></option><option value='5'>5</option></select></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>连通类型&nbsp</b></label>  <select name='selectNavType' id='selectNavType'><option value='1'>双向 </option><option value='2'>单向 </option></select> </div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
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
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标  " + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='检票口' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>坐标 X&nbsp;&emsp;</b></label> <input id='xpos' name='xpos'  type=text  value=" + realX + "></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>坐标 Y&nbsp;&emsp;</b></label> <input id='ypos' name='ypos'  type=text  value=" + realY + "></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
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
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + "位置坐标" + "  X=" + realX + "  Y=" + realY + "&nbsp;&nbsp;&nbsp; F15</div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>节点名称&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='导航点' value=" + nav_name + "></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>楼层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>  <select name='selectFloor' id='selectFloor' onchange='changeFloor(this.options[this.options.selectedIndex].value)'>" + floorStr + "</select></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>连通点&nbsp;&nbsp;&nbsp;&nbsp</b></label><select name='selectNav' id='selectNav'>" + optStr + "</select></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>连通类型&nbsp</b></label>  <select name='selectNavType' id='selectNavType'><option value='1'>双向 </option><option value='2'>单向 </option></select> </div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>正向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='办公室到门口'></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>反向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='门口到办公室'></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'setPointNav(" + realX + "," + realY + ")'" + ">提交</button></div>" +
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
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp;路径信息</div>" +
			"<div id = 'pathInfo' style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>" + pathInfo + "</b></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>&nbsp;操作&nbsp;&nbsp;;&nbsp;</b></label>  <select name='selectNavTerm' id='selectNavTerm' onchange='changeTransit(this.options[this.options.selectedIndex].value)'>" + conn + "</select>  </div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>&nbsp;操作&nbsp;&nbsp;;&nbsp;</b></label>  <select name='selectNavType' id='selectNavType'><option value='1'>双向 </option><option value='2'>" + op1 + "</option> <option value='3'>" + op2 + "</option><option value='4'>删除</option></select>  </div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>正向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='办公室到门口'></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>反向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='门口到办公室'></div>" +
			"<div id = 'opline' style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'opTransitLine(" + curr_from_node + "," + curr_to_node + ")'" + ">提交</button></div>" +

			"</form>";

	} else {

		var pathInfo = "该导航线连接导航节点" + pt1 + "与" + pt2;
		var op1 = pt1 + " 到 " + pt2;
		var op2 = pt2 + " 到 " + pt1;
		var op3 = "";

		for (var i = 0; i < fromNode.length; i++) {

			if (fromNode[i] == pt1 && toNode[i] == pt2) {
				if (direction[i] == 1) {
					op3 = "(双向)";
				} else {
					op3 = "(" + pt1 + "->" + pt2 + ")";
				}
				break;
			}
		}

		pathInfo += op3;

		//login.innerHTML="<form name = \"loginform\" action=\"login.jsp\" method=\"post\" onSubmit=\"return validateFormLogin()\"><fieldset><legend>位置信息  "+ "  X=" + realX + "  Y=" + realY + "</legend><table><tr><td><label for=\"petName\">节点名称</label></td><td><input type=\"text\" name=\"petName\" value=" + interest_name + "></td></tr><tr><td><label for=\"psd\">具体信息</label></td><td><input type=\"text\" name=\"psd\" /></td></tr><tr><td><input type = \"hidden\" name = \"return_url\" /></td></tr><tr><td></td></table><center><td><input type=\"button\" value=\提交\ onClick=\"setPoint(+" + realX + "," + realY + ")\" ></td></tr></fieldset></form>";
		login.innerHTML = "<form name = 'loginform'>" +
			"<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp;路径信息</div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>&nbsp;" + pathInfo + "</b></div>" +

			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:0px'><label for=name style='font:color:green'><b>&nbsp;操作&nbsp;&nbsp;;&nbsp;</b></label>  <select name='selectNavType' id='selectNavType'><option value='1'>双向 </option><option value='2'>" + op1 + "</option> <option value='3'>" + op2 + "</option><option value='4'>删除</option></select>  </div>" +

			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>正向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='办公室到门口'></div>" +
			"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;line-height:30px'><label for=name style='font:color:green'><b>反向信息&nbsp</b></label> <input id='petName' name='petName'  type=text placeholder='门口到办公室'></div>" +
			"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'opLine(" + pt1 + "," + pt2 + ")'" + ">提交</button></div>" +

			"</form>";
	}

	return login;
}

function opTransitLine(pt1, pt2) {
	var opcode = document.forms['loginform']['selectNavType'].value;
	


	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			switch (parseInt(opcode)) {
			case 1:
				direction[i] = 1;
				break;
			case 2:

				direction[i] = 2;
				break;
			case 3:
				fromNode[i] = pt2;
				toNode[i] = pt1;
				direction[i] = 2;

				break;
			case 4:

				fromNode.splice(i, 1);

				toNode.splice(i, 1);
				direction.splice(i, 1);
				
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

function opLine(pt1, pt2) {
	var opcode = document.forms['loginform']['selectNavType'].value;

	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt1 && toNode[i] == pt2) {

			switch (parseInt(opcode)) {
			case 1:
				direction[i] = 1;
				break;
			case 2:

				direction[i] = 2;
				break;
			case 3:
				fromNode[i] = pt2;
				toNode[i] = pt1;
				direction[i] = 2;
				navdiv = document.getElementById(currdiv)
					navdiv.id = pt2 + "_" + pt1;
				currdiv = pt2 + "_" + pt1;
				break;
			case 4:

				fromNode.splice(i, 1);

				toNode.splice(i, 1);
				direction.splice(i, 1);
				//forwardGuide.splice(i, 1);
				//backwardGuide.splice(i, 1);
				del_div(currdiv);
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
	initplace(realX, realY, document.forms['loginform']['petName'].value, divstr);

	interest_x.push(realX);
	interest_y.push(realY);

	interest_label.push(document.forms['loginform']['petName'].value);

	interest_div.push(divstr);

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
					var x1 = nav_x[pt1 - 1];
					var y1 = nav_y[pt1 - 1];

					var pt2 = document.forms['loginform']['selectNav'].value;

					fromNode.push(pt1);
					toNode.push(pt2);

					if (document.forms['loginform']['selectNavType'].value == "1") {
						direction.push(1);
					} else {
						direction.push(2);
					}

					if (!nav_transit[pt2 - 1]) {
						nav_transit[pt2 - 1] = true;

						var x2 = nav_x[pt2 - 1];
						var y2 = nav_y[pt2 - 1];

						initplaceNav(x2, y2 + 60, "换", pt2 + "_transit");

						var trandivId = pt2 + "_transit";
						var trandiv = document.getElementById(trandivId);
						trandiv.style.display = "none";

						initplaceLine(x2, y2 + 30, pt2 + "_" + "0");

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
					var y2 = y1 + 20;

					ctx_nav.strokeStyle = '#993300';
					ctx_nav.lineWidth = 4;

					ctx_nav.beginPath();

					ctx_nav.moveTo(x1, y1);
					ctx_nav.lineTo(x2, y2);

					ctx_nav.stroke();

					var x1 = x2;
					var y1 = y2 + 10;

					var x2 = x1;
					var y2 = y1 + 20;

					ctx_nav.strokeStyle = '#993300';
					ctx_nav.lineWidth = 4;

					ctx_nav.beginPath();

					ctx_nav.moveTo(x1, y1);
					ctx_nav.lineTo(x2, y2);

					ctx_nav.stroke();

					var x1 = x2;
					var y1 = y2 + 10;

					var x2 = x1;
					var y2 = y1 + 20;

					del_pop("id_out", "id_in");
					del_pop("id_out", "id_in");

					canvas_upper.style.zIndex = 2;
					canvas_nav.style.zIndex = 2;
					canvas.style.zIndex = 2;

					initplaceNav(x2, y2 - 20, "换", pt1 + "_transit");

					//alert (y2 - 20 - nav_y[pt1 - 1]);

					initplaceLine(x1, y2 - 50, pt1 + "_" + "0");

					return;

				}

				var pt2 = document.forms['loginform']['selectNav'].value;

				//alert(document.forms['loginform']['selectNavType'].value);


				var x1 = nav_x[pt1 - 1];
				var y1 = nav_y[pt1 - 1];

				var x2 = nav_x[pt2 - 1];
				var y2 = nav_y[pt2 - 1];

				var midx = (x1 + x2) / 2;
				var midy = (y1 + y2) / 2;

				fromNode.push(pt1);
				toNode.push(pt2);

				if (document.forms['loginform']['selectNavType'].value == "1") {
					direction.push(1);
				} else {
					direction.push(2);
				}

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

				initplaceLine(midx, midy, divid);

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

	nav_label.push(document.forms['loginform']['petName'].value);

	//alert(document.forms['loginform']['petName'].value);

	nav_div.push(divstr);
	nav_transit.push(false);

	nav_flag.push(true);

	nav_floor.push(which_floor);

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

	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteInterestPlace()\" ></td></tr>";
	//logonClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" >"
	//login.innerHTML="<div style='width:200px;height:200px;background-color:Black;'> + content + "<br><center><tr><td><input type=\"button\" value=\修改\ onClick=\"modifyInterestPlace(" + posx + "," + posy +  "," + realX +  "," + realY + ")\" ><input type=\"button\" value=\删除\ onClick=\"deleteInterestPlace()\" ></td></tr>";
	login.innerHTML = "<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp" + content + "&nbsp;<a href='#''>详情>></a><img src='images/edit.jpg' title='编辑' onClick= 'modifyInterestPlace(" + posx + "," + posy + "," + realX + "," + realY + ")'" + " style = 'position:absolute;right:75px;top:4px '><img src='images/delete.jpg' title='删除', onClick= 'deleteInterestPlace(" + ")'" + " style='position:absolute;right:50px;top:8px'></div>" +
		"<div style='width:300px;height:50px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp;位于科韵路信息港A栋<br>&nbsp;&nbsp;(020-38193993</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px'><img src='images/star.jpg'/></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;color:blue;text-indent: 10px'>兴趣点类型</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;color:green;text-indent: 10px'>餐饮</div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;color:blue;text-indent: 10px'>地点描述</div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;color:green;text-indent: 10px'>提供丰富的粤菜， 价格适中</div>" +
		"<div style='width:300px;height:80px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px'><center><img src='images/example.jpg'/></div>"

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
	login.innerHTML = "<div style='poaition:absoltue;width:300px;height:30px;background-color:#F5F5F5;font:bold 14px 宋体;color:blue;line-height:27px'>&nbsp;位置信息&nbsp" + "  X=" + realX + "  Y=" + realY + "&nbsp;F15" + "<img src='images/edit.jpg' title='编辑' onClick= 'modifyInterestPlace(" + posx + "," + posy + "," + realX + "," + realY + ")'" + " style = 'position:absolute;right:75px;top:4px '><img src='images/delete.jpg' title='删除', onClick= 'deleteNavPoint(" + ")'" + " style='position:absolute;right:50px;top:8px'></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 导航点序号      " + content + "<br></div>" +
		"<div style='width:300px;height:30px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 导航点名称      " + nav_name + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 双向连接点      " + conn_bi_direction + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 单向连接点(出)  " + conn_single_direction_out + "<br></div>" +
		"<div style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 100px'><br>&nbsp;&nbsp; 单向连接点(入)  " + conn_single_direction_in + "<br></div>";

	return login;
	//'modifyInterestPlace('" + posx  + "," + posy + "," + realX + "," + realY + ")
}

function modifyInterestPlace(posx, posy, realX, realY) {

	//alert ("cc");

	del_pop("id_out", "id_in");

	pop_up(posx, posy, realX, realY, true, "修改节点");

	//
}

function deleteInterestPlace(posx, posy, realX, realY) {

	//alert(interest_div.length);

	for (var i = 0; i < interest_div.length; i++) {
		if (interest_div[i] == currdiv) {
			//var interest_x = new Array();
			// var interest_y = new Array();
			// var interest_label = new Array();
			// var interest_div = new Array();

			interest_x.splice(i, 1);
			interest_y.splice(i, 1);
			interest_label.splice(i, 1);
			interest_div.splice(i, 1);

			break;
		}
	}

	// alert("cc");
	del_div(currdiv);
	currdiv = null;

	del_pop("id_out", "id_in");

	canvas.style.zIndex = 1;
	canvas_upper.style.zIndex = 2;
}

function deleteNavPoint(posx, posy, realX, realY) {

	//alert(interest_div.length);

	mcurrdiv = document.getElementById(currdiv);

	pt = parseInt(mcurrdiv.innerHTML);
	nav_flag[pt - 1] = false;

	//alert(pt);


	for (var i = 0; i < fromNode.length; i++) {

		if (fromNode[i] == pt || toNode[i] == pt) {

			var deldiv = fromNode[i] + "_" + toNode[i];
			//alert(deldiv);

			fromNode.splice(i, 1);

			toNode.splice(i, 1);
			direction.splice(i, 1);
			//forwardGuide.splice(i, 1);
			//backwardGuide.splice(i, 1);


			del_div(deldiv);

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

canvas_upper.onmousedown = function (event) {
	//alert("aa");
	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;
	ctx_up.clearRect(0, 0, WIDTH, HEIGHT);
	//canvas.click();
	//alert("cc");

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	ismove = false;

	//var h1 =document.getElementById('h1');
	//alert(h1);
	//h1.value = "X="+event.clientX + "Y=" + event.clientY;
	//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


	realX = Math.floor((pos.x - imgX) / imgScale);
	realY = Math.floor((pos.y - imgY) / imgScale);

	//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;


	//pop_up(pos.x, pos.y);
	// alert("X="+event.clientX + "Y=" + event.clientY);
	canvas.onmousemove = function (event) {
		canvas.style.cursor = "move";
		var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
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
		drawImage();
		ismove = true;

		onmove(x, y);
	}
	canvas.onmouseup = function () {
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

		currdiv = null;

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;
		if (!ismove) {
			//alert("bb");
			del_pop("id_out", "id_in");
			pop_up(pos.x, pos.y, realX, realY, true, null);
		} else {
			canvas.style.zIndex = 1;
			canvas_upper.style.zIndex = 2;
		}

	}

}

canvas_upper.onmousemove = function (event) {
	//canvas_upper.style.cursor = "move";
	var pos1 = windowToCanvas(canvas_upper, event.clientX, event.clientY);
	//var x = pos1.x - pos.x;

	realX = Math.floor((pos1.x - imgX) / imgScale);
	realY = Math.floor((pos1.y - imgY) / imgScale);

	ctx_up.clearRect(0, 0, WIDTH, HEIGHT);

	ctx_up.strokeStyle = 'red';
	ctx_up.lineWidth = 2;

	ctx_up.beginPath();

	ctx_up.moveTo(0, pos1.y);
	ctx_up.lineTo(WIDTH, pos1.y);

	ctx_up.moveTo(pos1.x, 0);
	ctx_up.lineTo(pos1.x, HEIGHT);

	ctx_up.stroke();

	//路径绘制开始


	//路径绘制结束
	ctx_up.closePath();

	ctx_up.fillStyle = "blue";

	ctx_up.font = "20pt Arial";
	var coordinate = "(" + realX + " , " + realY + ")";

	ctx_up.fillText(coordinate, pos1.x, pos1.y);

	//ctx_up.fillStyle='rgb(255,0,0)';

	//ctx_up.fillRect(50,50,200,200);


	//alert(pos1.x);
	//alert(pos1.y);
	//var y = pos1.y - pos.y;
	//pos = pos1;
	//imgX += x;
	//imgY += y;
	//drawImage();
	//ismove = true;

	//onmove(x, y);
}

canvas.onmouseover = function (event) {
	//alert("aa");
	//var source=event.target || window.event.srcElement;
	// source.click();
	//source
	//source.onmousedown();
	// alert(source);
}

canvas.onmousedown = function (event) {

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	ismove = false;

	//var h1 =document.getElementById('h1');
	//alert(h1);
	//h1.value = "X="+event.clientX + "Y=" + event.clientY;
	//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


	realX = Math.floor((pos.x - imgX) / imgScale);
	realY = Math.floor((pos.y - imgY) / imgScale);

	//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;


	//pop_up(pos.x, pos.y);
	// alert("X="+event.clientX + "Y=" + event.clientY);
	canvas.onmousemove = function (event) {
		canvas.style.cursor = "move";
		var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
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
		drawImage();
		ismove = true;

		onmove(x, y);
	}
	canvas.onmouseup = function () {
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

		currdiv = null;

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;
		if (!ismove) {
			//alert("bb");
			del_pop("id_out", "id_in");
			pop_up(pos.x, pos.y, realX, realY, true, null);
		} else {
			canvas.style.zIndex = 1;
			canvas_upper.style.zIndex = 2;
		}
	}
}

canvas.onmousewheel = canvas.onwheel = function (event) {
	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
}

canvas_upper.onmousewheel = canvas.onwheel = function (event) {
	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
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

canvas.onmousedown = function (event) {

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	ismove = false;

	//var h1 =document.getElementById('h1');
	//alert(h1);
	//h1.value = "X="+event.clientX + "Y=" + event.clientY;
	//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


	realX = Math.floor((pos.x - imgX) / imgScale);
	realY = Math.floor((pos.y - imgY) / imgScale);

	//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;


	//pop_up(pos.x, pos.y);
	// alert("X="+event.clientX + "Y=" + event.clientY);
	canvas.onmousemove = function (event) {
		canvas.style.cursor = "move";
		var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
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
		drawImage();
		ismove = true;

		onmove(x, y);
	}
	canvas.onmouseup = function () {
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

		currdiv = null;

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;
		if (!ismove) {
			//alert("bb");
			del_pop("id_out", "id_in");
			pop_up(pos.x, pos.y, realX, realY, true, null);
		} else {
			canvas.style.zIndex = 1;
			canvas_upper.style.zIndex = 2;
		}
	}
}

canvas.onmousewheel = canvas.onwheel = function (event) {
	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
}

canvas_upper.onmousewheel = canvas.onwheel = function (event) {
	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
}

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x : x - bbox.left - (bbox.width - canvas.width) / 2,
		y : y - bbox.top - (bbox.height - canvas.height) / 2
	};
}

canvas_nav.onmousedown = function (event) {

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	ismove = false;

	//var h1 =document.getElementById('h1');
	//alert(h1);
	//h1.value = "X="+event.clientX + "Y=" + event.clientY;
	//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


	realX = Math.floor((pos.x - imgX) / imgScale);
	realY = Math.floor((pos.y - imgY) / imgScale);

	//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;


	//pop_up(pos.x, pos.y);
	// alert("X="+event.clientX + "Y=" + event.clientY);
	canvas.onmousemove = function (event) {
		canvas.style.cursor = "move";
		var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
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
		drawImage();
		ismove = true;

		onmove(x, y);
	}
	canvas_nav.onmouseup = function () {
		canvas_nav.onmousemove = null;
		canvas_nav.onmouseup = null;
		canvas_nav.style.cursor = "default";

		var pos = windowToCanvas(canvas, event.clientX, event.clientY);
		//var h1 =document.getElementById('h1');
		//alert(h1);
		//h1.value = "X="+event.clientX + "Y=" + event.clientY;
		//h1.innerHTML="X="+pos.x + "  Y=" + pos.y;


		realX = Math.floor((pos.x - imgX) / imgScale);
		realY = Math.floor((pos.y - imgY) / imgScale);

		currdiv = null;

		//h2.innerHTML="真实X=" + realX + "  真实Y=" + realY;
		if (!ismove) {
			//alert("bb");
			del_pop("id_out", "id_in");
			pop_up(pos.x, pos.y, realX, realY, true, null);
		} else {
			canvas.style.zIndex = 1;
			canvas_upper.style.zIndex = 2;
		}
	}
}

canvas_nav.onmousewheel = canvas.onwheel = function (event) {
	canvas.style.zIndex = 2;
	canvas_upper.style.zIndex = 1;

	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
}

canvas_nav.onmousewheel = canvas.onwheel = function (event) {
	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));

	if (event.wheelDelta > 0 && imgScale < 4) {
		imgScale *= 2;
		imgX = imgX * 2 - pos.x;
		imgY = imgY * 2 - pos.y;
		onscale(2, -pos.x, -pos.y);
	} else if (event.wheelDelta < 0 && imgScale > 0.5) {
		imgScale /= 2;
		imgX = imgX * 0.5 + pos.x * 0.5;
		imgY = imgY * 0.5 + pos.y * 0.5;
		onscale(0.5, pos.x * 0.5, pos.y * 0.5);
	}
	drawImage();
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

			if (nav_floor[fromNode[i] - 1] != nav_floor[toNode[i] - 1]) {

				return true;

			}
		}
	}
	
	
	for (var i = 0; i < toNode.length; i++) {

		if (toNode[i] == pt) {

			if (nav_floor[fromNode[i] - 1] != nav_floor[toNode[i] - 1]) {

				return true;

			}
		}
	}
	
	
	
	return false;

}

function redrawAll() {
	ctx_nav.clearRect(0, 0, WIDTH, HEIGHT);

	for (var i = 0; i < nav_x.length; i++) {
		var navdiv = document.getElementById(nav_div[i]);

		if (!nav_flag[i]) {
			continue;
		}

		if (nav_floor[i] == which_floor) {

			navdiv.style.display = "block";

			if (nav_transit[i]) {
				trandivId = (i + 1) + "_transit"
				trandiv = document.getElementById(trandivId);
				trandiv.style.display = "block";

				trandivId = (i + 1) + "_transit"
				trandiv = document.getElementById(trandivId);
				trandiv.style.display = "block";

				var trandivlineId = (i + 1) + "_" + "0";
				var trandivline = document.getElementById(trandivlineId);
				trandivline.style.display = "block";

				var x1 = nav_x[i];
				var y1 = nav_y[i];

				var x2 = x1;
				var y2 = y1 + 20;

				ctx_nav.strokeStyle = '#993300';
				ctx_nav.lineWidth = 4;

				ctx_nav.beginPath();

				ctx_nav.moveTo(x1, y1);
				ctx_nav.lineTo(x2, y2);

				ctx_nav.stroke();

				var x1 = x2;
				var y1 = y2 + 10;

				var x2 = x1;
				var y2 = y1 + 20;

				ctx_nav.strokeStyle = '#993300';
				ctx_nav.lineWidth = 4;

				ctx_nav.beginPath();

				ctx_nav.moveTo(x1, y1);
				ctx_nav.lineTo(x2, y2);

				ctx_nav.stroke();

				var x1 = x2;
				var y1 = y2 + 10;

				var x2 = x1;
				var y2 = y1 + 20;

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
			divline.style.display = "block";
		}

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

function selectFloor(floor) {

	if (floor == "1") {
		img.src = "images/map.png";
		which_floor = 15;
	} else {
		img.src = "images/map2.png";
		which_floor = 5;
	}

	redrawAll();

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

	redrawAll();

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
	jsAddItemToSelect(selectNavType, "删除", 3);

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
	opLineDiv.innerHTML = "<div id = 'opline' style='width:300px;height:40px;background-color:#F9F9F9;font: 12px 宋体;text-indent: 10px;'><center><button type='button' class = 'button',  onClick= 'opTransitLine(" + curr_from_node + "," + curr_to_node + ")'" + ">提交</button></div>"

	
}
