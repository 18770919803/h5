# sea.js - h5 -
	这是在公司做的h5简单下载活动页面， 主要是简单运用sea.js模块化示例。 代码可观赏。

1. sea.js 示例 第一步 在html文件内先引进sea.js:

	< script src = "js/sea.js"
type = "text/javascript"
charset = "utf-8" > < /script>

2. 第二步： 创建一个js主模块， 假如说是一个indexa.js, 然后所有其他小模块可以通过主模块调用。 调用时才会加载进来。

	< script > seajs.use("indexa"); < /script>


3. 第三步（ 这是indexa.js 文件）

/*ps://引入文件需先defined源码 // seajs 的简单配置 //调用时简化路径名，方便调用。
示例：以jquery替代common/jquery-1.9.1.min.js*/


seajs.config({
	alias: {

		"jquery": "common/jquery-1.9.1.min.js",
		/*引入文件需先defined jquery源码，尽量选最新版本，具体可想看jquery文件内代码*/
		"leaves": "common/leaves.js",
		"verifyDevices": "common/verifyDevices.js",
		"common": "common/common.js"
	}
});
define(function(require, exports, module) {
	var $ = require("jquery"); //此处就是上面简化的名字，比较方便，把jquery文件require进来调用，但是源码需要改造一下，第四步会贴代码 
	$(document).ready(function() {
		var leave = require('leaves');
		var downloadUrl = "./download.html";
		var common = require('common');
		var verifyDevices = require('verifyDevices');
		var windowHeight = $('body').height();
		$body = $("body");
		$body.css("height", windowHeight); //重要代码 
		common.caculateClickNum();
		$(".page_xz").click(function() { //下载点击事件

			event.stopPropagation();
			window.location.href = downloadUrl;
		});
		if (verifyDevices.checkDevice() == true) { //电脑端
			common.mediaQuery.init(); //媒体查询 
		} else if (verifyDevices.checkDevice() == false) { //手机端 
			common.suppOrientation(); // 橫屏切換 
		};
	})
})



4. 第四步 //加载jquery文件，与其他文件不一样，因为他是只支持amd模块化，但是seajs是cmd模块化，所以需要封装一下 

define(function() {

	//下面是源码

	//源码省略

	//下面不是源码
	return $.noConflict();

	//noConflict() 方法让渡变量 $ 的 jQuery 控制权。该方法释放 jQuery 对 $ 变量的控制。该方法也可用于为 jQuery 变量规定新的自定义名称。提示：在其他 JavaScript 库为其函数使用 $ 时，该方法很有用。，不加则用不了里面的方法

})

//普通的js文件

// 1.各种设备的判断 2.各种浏览浏览器的判断 / //调用时，需先导入sea.js在html中 


define(function(require, exports, module) { //判断是否是平板电脑 

	exports.tabletCheck = function() {

		var a = /ipad|android 3.0|android|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
		return a;
	};


	// 检测是电脑端还是手机移动端，false为手机移动端,true为电脑端 

	exports.checkDevice = function() {

		var userAgentInfo = navigator.userAgent.toLowerCase();

		var Agents = new Array("android", "iphone os", "symbianos", "windows phone", "ipad", "ipod", "midp", "rv:1.2.3.4", "ucweb", "windows ce", "windows mobile", "mobile");

		var flag = true;

		for (var v = 0; v < Agents.length; v++) {

			if (userAgentInfo.indexOf(Agents[v]) > -1) {

				flag = false;

				break;
			}
		}
		return flag;
	};
	// 判断是否是微信 
	exports.isWeixin = function() {

		var a = navigator.userAgent.toLowerCase();

		return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1;

	};
	//判断是否是safari

	exports.isSafari = function() {

		var a = navigator.userAgent,

			b = (navigator.appVersion, a.indexOf("Safari") > -1 && a.indexOf("Version") > -1);

		return b
	};
	// 判断是否是uc浏览器 

	exports.isUcbrowser = function() {

		var a = navigator.userAgent.toLowerCase();

		return "ucbrowser" == a.match(/ucbrowser/i) ? !0 : !1;

	};
	// 判断是否是opera浏览器 

	exports.isUcbrowser = function() {

		var a = navigator.userAgent.toLowerCase();

		return "opera" == a.match(/opera/i) ? !0 : !1;

	};
	// 判断是否是qq浏览器 

	exports.isUcbrowser = function() {

		var a = navigator.userAgent.toLowerCase();

		return "qqbrowser" == a.match(/qqbrowser/i) ? !0 : !1;

	}

})