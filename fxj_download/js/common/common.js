//移动端手机常用
define(function(require,exports,moudule) {
    /*橫竖屏切換 */
    /***
    用法：在css上加上
    body.landscape:before
    {
    font-size: 1.375rem;
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;
    padding-top: 15%;

    content: '为了更好的体验，请使用竖屏浏览';
    text-align: center;
    letter-spacing: 1px;

    color: #eee;
    background-color: rgba(205,29,40,1);  背景颜色可自定义
    }
    body.landscape:after
    {
    position: absolute;
    z-index: 10000;
    top: 30%;
    right: 0;
    left: 0;

    width: 4.625rem;
    height: 6.875rem;
    margin: auto;

    content: '';
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-animation: tablet 1.6s ease-out infinite alternate;
    -moz-animation: tablet 1.6s ease-out infinite alternate;
    -ms-animation: tablet 1.6s ease-out infinite alternate;
    -o-animation: tablet 1.6s ease-out infinite alternate;
    animation: tablet 1.6s ease-out infinite alternate;

    background: url(../img/rotate.png) 0 0 no-repeat;   可自定义
    background-size: 100%;
    }
    @-webkit-keyframes tablet
    {
    0%
    {
    -webkit-transform: rotate(-90deg);
    }

    100%
    {
    -webkit-transform: rotate(-90deg);
    }
    }

    @-moz-keyframes tablet
    {
    0%
    {
    -moz-transform: rotate(-90deg);
    }

    100%
    {
    -moz-transform: rotate(90deg);
    }
    }

    @keyframes tablet
    {
    0%
    {
    transform: rotate(-90deg);
    }
    100%
    {
    transform: rotate(90deg);
    }
    }
    ***/

    exports.suppOrientation = function() {
        var supportOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object");

        var updateOrientation = function() {

            if (supportOrientation) {
                updateOrientation = function() {
                    var orientation = window.orientation;
                    switch (orientation) {
                        case 90:
                            orientation = "landscape";
                            break;
                        case -90:
                            orientation = "landscape";
                            break;
                        default:
                            orientation = "portrait";
                    }
                    document.body.setAttribute("class", orientation);
                };
            } else {
                updateOrientation = function() {
                    var orientation = (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
                    document.body.setAttribute("class", orientation);

                };
            };
            updateOrientation();
        };

        var init = function() {
            updateOrientation();

            if (supportOrientation) {

                window.addEventListener("orientationchange", updateOrientation, false);
            } else {
                window.setInterval(updateOrientation, 5000);
            };
        };
        window.addEventListener("DOMContentLoaded", init, false);
    };
    /*媒体查询*/
    exports.mediaQuery = function() {
        //全兼容的 事件绑定  and  阻止默认事件EventUtil.preventDefault();
        var EventUtil = {
            //Notice: type is not include 'on', for example: click mouseover mouseout and so on
            addHandler: function(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler);
                } else {
                    element['on' + type] = handler;
                }
            },
            preventDefault: function(event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        };
        var mediaQuery = {
            init: function() {
                var _this = this;
                _this.outputSize();
                EventUtil.addHandler(window, "resize", function() {});
            },
            outputSize: function() {
                var result1 = window.matchMedia('(min-width:1000px)');
                if (result1.matches) {
                    $(".main").css({
                        "width": "375px",
                        "height": "667px",
                        'top': '10%',
                        'left': '40%'
                    }); {
                        /* : ; */
                    }
                    $(".main>.btn ").css({

                        'margin-top': '380px',
                    });
                };
            }
        };

    };
    /*计算用户查看哪个地方次数多*/
    exports.caculateClickNum = function() {
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?dd6f67dcdb40ee19b02c9fb84bbb991c";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    };
     /*音效*/
    exports.musicPlayer=function(a) {
            if (config.isWeixin()) { //判断是否在微信 
                  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                      WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                       a.paused ? a.play() : a.pause();
        
                        }, false);
                }
             }else {
                a.paused ? a.play() : a.pause();
            }
        };
})