<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<html>
<head>
<meta charset='utf-8'>

<title>信息编辑</title>
<style>
html,body {
	margin: 0px;
	padding: 0px;
}

canvas {
	border: 1px solid #000;
}

p,h1,form,button {
	border: 0;
	margin: 0;
	padding: 0;
}

.spacer {
	clear: both;
	height: 1px;
}

.myform {
	margin-left: 30px;
	width: 400px;
	padding: 14px;
	font-size: 12px;
}

#stylized {
	border: solid 2px #b7ddf2;
	background: #ebf4fb;
}

#stylized h1 {
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 8px;
}

#stylized p {
	font-size: 20px;
	color: blue;
	margin-bottom: 20px;
	border-bottom: solid 1px #b7ddf2;
	padding-bottom: 10px;
}

#stylized label {
	display: block;
	font-weight: bold;
	padding: 6px 10px;
	width: 50px;
	float: left;
}

#stylized .small {
	color: #666666;
	display: block;
	font-size: 11px;
	font-weight: normal;
	text-align: right;
	width: 140px;
}

#stylized input {
	float: left;
	font-size: 12px;
	padding: 4px;
	border: solid 1px #aacfe4;
	width: 200px;
	margin: 2px 0 2px 1px;
}

#stylized textarea {
	float: left;
	font-size: 12px;
	padding: 4px;
	border: solid 1px #aacfe4;
	width: 200px;
	margin: 2px 0 20px 10px;
}

#stylized button {
	clear: both;
	margin-left: 30px;
	width: 75px;
	height: 31px;
	background: #666666;
	text-align: center;
	line-height: 31px;
	color: #FFFFFF;
	font-size: 11px;
	font-weight: bold;
}

table {
	font-size: 12px;
	table-layout: fixed;
	empty-cells: show;
	border-collapse: collapse;
	margin-left: 30px;
	margin-top: 30px;
	border: 1px solid #cad9ea;
	color: #666;
}

th {
	background-image: url(images/th_bg1.gif);
	background-repeat: repeat-x;
	height: 30px;
	overflow: hidden;
	text-align: center;
}

td {
	height: 20px;
}

td,th {
	border: 1px solid #cad9ea;
	padding: 0 1em 0;
	text-align: center;
}

tr:nth-child(even) {
	background-color: #f5fafe;
}

#floornum {
	width: 70px;
	height: 30px;
	position: absolute;
	top: 10px;
	left: 20px;
	z-index: 4;
	color: #0000FF;
	font-weight: bold;
}

#pointtype {
	width: 160px;
	height: 30px;
	position: absolute;
	top: 10px;
	left: 100px;
	z-index: 4;
	color: #228B22;
	font-weight: bold;
}

#coord {
	width: 120px;
	height: 30px;
	position: absolute;
	top: 10px;
	left: 290px;
	z-index: 4;
	color: #082E54;
	font-weight: bold;
}

#zoomlimit {
	width: 180px;
	height: 30px;
	position: absolute;
	top: 10px;
	left: 490px;
	z-index: 4;
	color: #B0171F;
	font-weight: bold;
}

#zoom {
	width: 70px;
	height: 30px;
	cursor: pointer;
	position: absolute;
	top: 10px;
	left: 980px;
	background: url(images/arrow.png) no-repeat 35px 8px;
	cursor: pointer;
	z-index: 4;
}

#zoom_ul {
	position: absolute;
	top: 75px;
	left: 950px;
	background: #F2F2F2;
	width: 80px;
	height: 55px;
	border: 1px solid #999;
	padding: 10px 0 0 0;
	display: none;
	z-index: 5;
}

#zoom_ul_1,#zoom_ul_2 {
	height: 25px;
	line-height: 25px;
	text-indent: 20px;
	letter-spacing: 1px;
	font-size: 14px;
}

#zoom_ul_1 a,#zoom_ul_2 a {
	display: block;
	text-decoration: none;
	color: #333;
}

#floor {
	width: 70px;
	height: 30px;
	cursor: pointer;
	position: absolute;
	top: 10px;
	left: 1050px;
	background: url(images/arrow.png) no-repeat 35px 8px;
	cursor: pointer;
	z-index: 4;
}

#point {
	width: 70px;
	height: 30px;
	cursor: pointer;
	position: absolute;
	top: 10px;
	left: 1120px;
	background: url(images/arrow.png) no-repeat 35px 8px;
	cursor: pointer;
	z-index: 4;
}

#floor_ul {
	position: absolute;
	top: 75px;
	left: 1020px;
	background: #F2F2F2;
	width: 80px;
	height: 55px;
	border: 1px solid #999;
	padding: 10px 0 0 0;
	display: none;
	z-index: 5;
}

#floor_ul_1,#floor_ul_2 {
	height: 25px;
	line-height: 25px;
	text-indent: 20px;
	letter-spacing: 1px;
	font-size: 14px;
}

#floor_ul_1 a,#floor_ul_2 a {
	display: block;
	text-decoration: none;
	color: #333;
}

#point_ul {
	position: absolute;
	top: 75px;
	left: 1090px;
	background: #F2F2F2;
	width: 100px;
	height: 55px;
	border: 1px solid #999;
	padding: 10px 0 0 0;
	display: none;
	z-index: 5;
}

#point_ul_1,#point_ul_2 {
	height: 25px;
	line-height: 25px;
	text-indent: 20px;
	letter-spacing: 1px;
	font-size: 14px;
}

#point_ul_1 a,#point_ul_2 a {
	display: block;
	text-decoration: none;
	color: #333;
}

/* button 
---------------------------------------------- */
.button1 {
	zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */
	vertical-align: baseline;
	margin: 0 2px;
	margin-left: 580px;
	outline: none;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font: 16px/100% Arial, Helvetica, sans-serif;
	font-weight: bold;
	padding: .5em 2em .55em;
	text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
	-webkit-border-radius: .5em;
	-moz-border-radius: .5em;
	border-radius: .3em;
	-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

.button1:hover {
	text-decoration: none;
}

.button1:active {
	position: relative;
	top: 1px;
}

/* color styles 
---------------------------------------------- */

/* blue */
.blue {
	outline: none;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font: 14px/100% Arial, Helvetica, sans-serif;
	padding: .3em 1em .35em;
	text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
	-webkit-border-radius: .5em;
	-moz-border-radius: .5em;
	border-radius: .5em;
	-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	color: #d9eef7;
	border: solid 1px #0076a3;
	background: #0095cd;
	background: -webkit-gradient(linear, left top, left bottom, from(#00adee),
		to(#0078a5));
	background: -moz-linear-gradient(top, #00adee, #0078a5);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee',
		endColorstr='#0078a5');
}

.blue:hover {
	background: #007ead;
	background: -webkit-gradient(linear, left top, left bottom, from(#0095cc),
		to(#00678e));
	background: -moz-linear-gradient(top, #0095cc, #00678e);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0095cc',
		endColorstr='#00678e');
}

.blue:active {
	color: #80bed6;
	background: -webkit-gradient(linear, left top, left bottom, from(#0078a5),
		to(#00adee));
	background: -moz-linear-gradient(top, #0078a5, #00adee);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0078a5',
		endColorstr='#00adee');
}

/* red */
.red {
	outline: none;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font: 14px/100% Arial, Helvetica, sans-serif;
	padding: .3em 1em .35em;
	text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
	-webkit-border-radius: .5em;
	-moz-border-radius: .5em;
	border-radius: .5em;
	-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	color: #faddde;
	border: solid 1px #980c10;
	background: #d81b21;
	background: -webkit-gradient(linear, left top, left bottom, from(#ed1c24),
		to(#aa1317));
	background: -moz-linear-gradient(top, #ed1c24, #aa1317);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ed1c24',
		endColorstr='#aa1317');
}

.red:hover {
	background: #b61318;
	background: -webkit-gradient(linear, left top, left bottom, from(#c9151b),
		to(#a11115));
	background: -moz-linear-gradient(top, #c9151b, #a11115);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c9151b',
		endColorstr='#a11115');
}

.red:active {
	color: #de898c;
	background: -webkit-gradient(linear, left top, left bottom, from(#aa1317),
		to(#ed1c24));
	background: -moz-linear-gradient(top, #aa1317, #ed1c24);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#aa1317',
		endColorstr='#ed1c24');
}

.diamond-narrow {
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-bottom: 10px solid blue;
	position: absolute;
	top: 100px;
	left: 100px
}

.diamond-narrow:after {
	content: '';
	position: absolute;
	left: -5px;
	top: 10px;
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-top: 10px solid blue;
}

.triangle-right {
	width: 0;
	height: 0;
	border-top: 6px solid transparent;
	border-left: 12px solid green;
	border-bottom: 6px solid transparent;
}
</style>


</head>
<body style="overflow: auto">

	<div class="container-fluid1">
		<div class="row-fluid">
			<div class="span12">


				<div id="parentId" class="layout-container">



					<div id="header"
						style="position: absolute; left: 0px; top: 40px; z-index: 4; overflow: hidden; width: 1203px; height: 40px; background: #f3f3f3; opacity: 0.9">

						<div id="floornum">
							<p id="floortext">1F</p>


						</div>

						<div id="pointtype">
							<p id="pointtypetext">仅显示导航点</p>


						</div>


						<div id="coord">
							<p id="coordtext">X=0&nbsp;&nbsp;&nbsp;&nbsp;Y=0</p>


						</div>


						<div id="zoomlimit">
							<p id="zoomtext">原图尺寸</p>


						</div>


						<div id="zoom" style="width: 100px">缩放</div>

						<div id="floor" style="width: 100px">楼层</div>
						<div id="point" style="width: 100px">节点</div>
					</div>

					<ul id="zoom_ul" style="list-style-type: none;">
						<li id="zoom_ul_1"><a href="javascript:zoomIn()">放 大</a></li>
						<li id="zoom_ul_2"><a href="javascript:zoomOut()">缩 小</a></li>
					</ul>

					<ul id="floor_ul" style="list-style-type: none;">
						<li id="floor_ul_1"><a href="javascript:selectFloor(1)">1
								楼</a></li>
						<li id="floor_ul_2"><a href="javascript:selectFloor(2)">2
								楼</a></li>
					</ul>

					<ul id="point_ul" style="list-style-type: none;">
						<li id="point_ul_1"><a href="javascript:selectInterestNav(1)">导
								航 点</a></li>
						<li id="point_ul_2"><a href="javascript:selectInterestNav(2)">兴
								趣 点</a></li>
					</ul>

					<div id="canvasdiv"
						style="position: absolute; left: 0px; top: 40px; z-index: 2; overflow: hidden; width: 2400px; height: 2000px; z-index: 0; background: #f3f3f3; visibility: hidden">
						<canvas id="canvas" width=1200 " height="1600"
							style="position: absolute; left: 0px; top: 0px; z-index: 1; overflow: hidden; visibility: visible"></canvas>
						<canvas id="line" width=1200 " height="1600"
							style="position: absolute; left: 0px; top: 0px; z-index: 2; overflow: hidden; visibility: visible"></canvas>
						<canvas id="nav" width=1200 " height="1600"
							style="position: absolute; left: 0px; top: 0px; z-index: 3; overflow: hidden; visibility: visible"></canvas>




						<div id="stylized" class="myform"
							style="border: solid 2px #b7ddf2; background: #ebf4fb; left: 175px; top: 63px; display: none; z-index: 10; width: 600px; overflow: hidden; visibility: visible">
							<form id="form1" name="form1" method="post"
								style="position: absolute; left: 175px; top: 63px; border: solid 2px #b7ddf2; background: #ebf4fb; width: 600px; z-index: 10; overflow: hidden; visibility: visible"
								action="">

								<p>兴趣点信息填写</p>
								<label>名称 <span class="small"></span>
								</label> <input type="text" name="poilabel" id="textfield" /> <label>&nbsp;&nbsp;&nbsp;&nbsp;类型
									<span class="small"></span>
								</label> <select name="selectInterest" id="textfield"
									style="width: 100px"><option value='0'>展馆</option>
									<option value='3'>公交站</option>
									<option value='4'>影院</option>
									<option value='5'>剧场</option>
									<option value='6'>餐饮</option></select><br>
								<br> <label style="width: 70px">楼层 <span
									class="small"></span>
								</label> <input type="text" name="floor" id="textfield" disabled="true"
									style="width: 40px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label
									style="width: 70px">X坐标 <span class="small"></span>
								</label> <input type="text" name="xpos" id="textfield" disabled="true"
									style="width: 40px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label
									style="width: 70px">Y坐标 <span class="small"></span>
								</label> <input type="text" name="ypos" id="textfield" disabled="true"
									style="width: 40px" /><br />
								<br />
								<br /> <label style="width: 70px">简要描述<span
									class="small"></span>
								</label><br />
								<br />
								<textarea name="generaldesc" id="textfield" cols='120' rows='1'></textarea>
								<br />
								<br />
								<br /> <label style="width: 70px">详细描述<span
									class="small"></span>
								</label><br />
								<br />
								<textarea name="detaileddesc" id="textfield" cols='120' rows='2'></textarea>
								<br />
								<br /> <br /> <br /> <label style="width: 70px">大堂编号 <span
									class="small"></span>
								</label> <input type="text" name="hallid" id="textfield"
									style="width: 40px" /> <label style="width: 70px">TTS编号
									<span class="small"></span>
								</label> <input type="text" name="ttsid" id="textfield"
									style="width: 40px" /> <label>缩放 <span class="small"></span>
								</label> <input type="text" name="scale" id="textfield"
									style="width: 40px" /> <label>透明度 <span class="small"></span>
								</label> <input type="text" name="alpha" id="textfield"
									style="width: 40px" /><br />
								<br />
								<br /> <label>旋转 <span class="small"></span>
								</label> <input type="text" name="rotation" id="textfield"
									style="width: 30px" /> <label style="width: 70px">最小缩放
									<span class="small"></span>
								</label>&nbsp;&nbsp; <input type="text" name="minzoomfactor"
									id="textfield" style="width: 40px" />&nbsp;&nbsp; <label
									style="width: 70px">最大缩放 <span class="small"></span>
								</label> <input type="text" name="maxzoomfactor" id="textfield"
									style="width: 40px" /> <label style="width: 78px">最近导航点
									<span class="small"></span>
								</label> <input type="text" name="nearnavid" id="textfield"
									style="width: 40px" /><br />
								<br />
								<br /> &nbsp;&nbsp;<select name="reachable" id="textfield"
									style="width: 100px"><option value='1'>可达</option>
									<option value='2'>不可达</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<select name="readable" id="textfield" style="width: 100px"><option
										value='1'>可读</option>
									<option value='2'>不可读</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<select name="shareble" id="textfield" style="width: 100px"><option
										value='1'>可分享</option>
									<option value='2'>不可分享</option></select><br>
								<br> <label style="width: 70px">关联网页<span
									class="small"></span>
								</label> <input type="text" name="weburl" id="textfield"
									style="width: 140px" /> <label style="width: 70px">图标路径<span
									class="small"></span>
								</label> <input type="text" name="iconurl" id="textfield"
									style="width: 140px" /><br />
								<br />
								<br /> <label style="width: 70px">图片路径<span
									class="small"></span>
								</label> <input type="text" name="picurl" id="textfield"
									style="width: 140px" /> <label style="width: 70px">音频路径<span
									class="small"></span>
								</label> <input type="text" name="audiourl" id="textfield"
									style="width: 140px" /><br />
								<br />
								<br />



								<button type="button" onclick="submitPoiDetailInfo()"
									style="margin-left: 140px; font: bold 14px 宋体; color: white">提&nbsp;交</button>
								<button type="button" onclick="deleteInterestPlace()"
									style="font: bold 14px 宋体; color: white">删&nbsp;除</button>
								<button type="button" onclick="cancelPoiDetailInfo()"
									style="font: bold 14px 宋体; color: white">取&nbsp;消</button>
								<br />
								<br />
								<div class="spacer"></div>
							</form>
						</div>
					</div>





					<script type="text/javascript" src="js/main.js"></script>
					<script type="text/javascript">
						window.onload = function() {
							load();
						}
					</script>

				</div>
			</div>
		</div>

	</div>





</body>

</html>