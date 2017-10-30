// seajs 的简单配置
seajs.config({
    alias: {
        "jquery": "common/jquery-1.9.1.min.js",
        "leaves":"common/leaves.js",
        "verifyDevices":"common/verifyDevices.js",
        "common":"common/common.js"
    }
});

define(function(require, exports, module) {
    var $ = require("jquery");
    var leave=require('leaves');
    $(document).ready(function() {
        var windowHeight = $('body').height();
        $body = $("body");
        $body.css("height", windowHeight); //重要代码
        var downloadUrl = "./download.html";
        /*判断锦集*/
           var common = require('common');
           var verifyDevices = require('verifyDevices');
           common.caculateClickNum();

        $(".page_xz").click(function() { //下载点击事件
            event.stopPropagation();
            window.location.href = downloadUrl;
        });
        if (verifyDevices.checkDevice() == true) { //电脑端
            common.mediaQuery.init();
        } else if ( verifyDevices.checkDevice() == false) { //手机端
            common.suppOrientation(); // 橫屏切換 
        };
    })

})