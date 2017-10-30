/*
1.各种设备的判断
2.各种浏览浏览器的判断
*/
//调用时，需先导入sea.js在html中
define(function(require, exports, module) {
    /* 判断是否是平板电脑 */
    exports.tabletCheck = function() {
        var a = /ipad|android 3.0|android|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
        return a;
    };
    /* 检测是电脑端还是手机移动端，false为手机移动端,true为电脑端 */
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
    /* 判断是否是微信 */
    exports.isWeixin = function() {
        var a = navigator.userAgent.toLowerCase();
        return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1;
    };
    /*判断是否是safari*/
    exports.isSafari = function() {
        var a = navigator.userAgent,
            b = (navigator.appVersion,
                a.indexOf("Safari") > -1 && a.indexOf("Version") > -1);
        return b
    };
    /* 判断是否是uc浏览器 */
    exports.isUcbrowser = function() {
        var a = navigator.userAgent.toLowerCase();
        return "ucbrowser" == a.match(/ucbrowser/i) ? !0 : !1;
    };
    /* 判断是否是opera浏览器 */
    exports.isUcbrowser = function() {
        var a = navigator.userAgent.toLowerCase();
        return "opera" == a.match(/opera/i) ? !0 : !1;
    };
    /* 判断是否是qq浏览器 */
    exports.isUcbrowser = function() {
        var a = navigator.userAgent.toLowerCase();
        return "qqbrowser" == a.match(/qqbrowser/i) ? !0 : !1;
    }


})