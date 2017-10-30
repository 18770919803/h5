$(document).ready(function() {

    var info = []; //定义奖项类别数组
    // var goodsimgArr = []; //定义奖项类别数组

    var c = document.getElementById("myCanvas"); //定义canvas画布（转盘）
    var ctx = c.getContext("2d");

    var centerX = Math.floor(c.width / 2), //定义转盘圆心x坐标
        centerY = Math.floor(c.width / 2), //定义转盘圆心y坐标
        centerR = Math.floor((c.width * 0.555) / 2); //定义转盘半径

    var prizeName = '', //定义获取到的奖项名
        prizeState = '', //定义获取到的奖项是否是实物（1为实物，0为虚拟）
        hadPrizeName = '', //定义获取到的中奖奖品名
        prizeId = '', //定义获取到的中奖奖品名

        hadPrizeImg = '', //定义已经抽到的奖品图片
        chanceNum = ''; //定义可抽奖次数

    var serverUrl = 'http://192.168.0.158:8080/lucky-dram3/'; //接口地址
    var duUlr = window.document.location.href; //获取本身地址

    /* 方法锦集 */
    var config = {
        /* 旋转网络超时 */
        rotateTimeOut: function() {
            layer.open({
                style: 'background-color:#f74',
                content: '加载失败！点击屏幕重试',
                skin: 'footer'
            });
            $(document).on('click touchstart', function() {
                location.reload();
            })

        }, //转盘颜色
        turtuleColor: function(a, b, c) {
            var lGrd = ctx.createRadialGradient(centerX, centerY, centerR, centerX, centerY, centerR + 80);
            lGrd.addColorStop(0, a);
            lGrd.addColorStop(0.2, b);
            lGrd.addColorStop(0.9, c);
            ctx.strokeStyle = lGrd;
        },
        /*是否是iphone*/
        isApple: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.match(/ios|iphone|ipad|mac/i);
        },
        /*音效*/
        musicPlayer: function(a) {
            if (config.isWeixin()) { //判断是否在微信 
                if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                    WeixinJSBridge.invoke('getNetworkType', {}, function(res) {
                        a.paused ? a.play() : a.pause();

                    }, false);
                }
            } else {
                a.paused ? a.play() : a.pause();
            }
        },
        /*画转盘*/
        turtuleArc: function(num) {
            var pageWidth = document.documentElement.clientWidth;
            // var arcColor = ['#cf4700', '#ffd711', '#f7a172'];
            var startAngle = 0;
            var endAngle = 0;
            var canvasW = c.width; // 画板的高度
            var canvasH = c.height; // 画板的宽度
            ctx.clearRect(0, 0, canvasW, canvasH);

            for (var i = 1; i <= num; i++) {
                startAngle = Math.PI * (2 / num) * i;
                endAngle = Math.PI * (2 / num) * (i + 1);
                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, centerR, startAngle, endAngle, false);
                ctx.lineWidth = centerR + (centerR * 0.6);
                if (i % 2 == 0) {
                    config.turtuleColor('#f9d838', '#fff900', '#ffe121');
                } else if (i == num && num % 2 != 0) {
                    config.turtuleColor('#f9d838', '#ff3800', '#ec5218');

                } else {
                    config.turtuleColor('#f6cc31', '#ce4600', '#e96a00');
                }
                $('#myCanvas').rotate(-(90 - (360 / num) - (360 / num)));
                ctx.stroke();
                ctx.restore();

            }

        },
        // 抽奖次数
        chanceNumber: function() {
            $.ajax({
                type: 'get',
                url: serverUrl + 'gameCount',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: "gameCount",

                success: function(data) {

                    if (data == 'error') {
                        alert('系统繁忙，请稍后！');
                    } else {

                        var data_count = Number(data.Count);
                        isNaN(data_count) ? $('.award_chance').text(0) : $('.award_chance').text(data_count); // 获取机会次数
                    }
                }
            });
        },
        /*奖项设置*/
        createCirText: function(num) {
            ctx.font = "Bold 50px Arial"; // 设置字体
            ctx.fillStyle = "#fff"; // 设置填充颜色
            var line_height = 17;
            var step = 2 * Math.PI / num; // 圆的弧度
            var arc = Math.PI / (num / 2);
            for (var i = 1; i <= num; i++) {
                var angle = -(i * arc + step * 2);

                ctx.save();
                ctx.beginPath();
                if (i == num && num % 2 != 0) {
                    ctx.fillStyle = "#aaa";
                }
                ctx.translate(centerX + Math.cos(angle + arc / 2) * 245, centerY + Math.sin(angle + arc / 2) * 245);
                //rotate方法旋转当前的绘图
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                //绘制奖品图片
                // var img = new Image();
                // img.src = goodsimgArr[i - 1];
                // ctx.drawImage(img, angle + arc / 2, 25);
                // console.log('over');
                //将字体绘制在对应坐标
                ctx.fillText(info[i - 1], -ctx.measureText(info[i - 1]).width / 2, 0);
                ctx.restore();
            }
        },
        /* 旋转角度奖品及弹框内容 */
        rotateFn: function(awards, angles, txt, num, state, hadPrizeName, hadPrizeImg) {

            bRotate = !bRotate;
            $('.rotate').stopRotate();
            $('.rotate').rotate({
                angle: 0,
                animateTo: -(90 - (360 / num) - (360 / num)) + angles + 1800,
                duration: 3800,
                callback: function() {
                    if (state == -1) { //未中奖
                        $('#Dialog2').fadeIn();
                        config.musicPlayer($('#dialogAudioNull')[0]); //谢谢惠顾音效
                        $('#Dialog2 .weui-dialog__bd>img').attr('src', serverUrl + hadPrizeImg);

                    } else {
                        $('#Dialog1 .weui-dialog').show();
                        $('.swlj').hide();
                        $('#Dialog1 .page__bd>input').remove();
                        if (state == 1) { //中实物奖
                            config.musicPlayer($('#dialogAudioWin')[0]);
                            $('#Dialog1 .page__bd').prepend(' <input type="button" class="weui-btn weui-btn_primary" onclick="config1.assure()" value="确定"></p>');
                        } else { //中虚拟奖品

                            hadPrizeName.indexOf('再来一次') > -1 ? config.musicPlayer($('#dialogAudioAgain')[0]) : config.musicPlayer($('#dialogAudioWin')[0]);
                            var hpnState = ''; //中奖奖项有红包，红包为1，再来一次为2，否则为0，根据这个值来显示不同的提示内容
                            if (hadPrizeName.indexOf('红包') > -1) {
                                hpnState = 1;
                            } else if (hadPrizeName.indexOf('再来一次') > -1) {
                                var chanceNum = $('.award_chance').text();
                                chanceNum--;
                                $('.award_chance').text(chanceNum);
                                hpnState = 2;
                            } else {
                                hpnState = 0;
                            }
                            $('#Dialog1 .page__bd').prepend(' <input type="button" class="weui-btn weui-btn_primary" onclick="config1.showmsgFunction(' + hpnState + ')" id="lq_btn" value="立即领取">');
                        }
                        $('#Dialog1 .weui-dialog__hd').html('<strong class="weui-dialog__title">获得了<span id="award_gift">' + txt + '</span></strong>');
                        $('#weui-dialog__bd>img').attr('src', serverUrl + hadPrizeImg);
                        $('#Dialog1').fadeIn();
                    }
                    bRotate = !bRotate;
                    $('.pointer').attr('disabled', true);

                }
            });
        },
        /* 中奖选项 */
        rotateWhich: function(item, state, hadPrizeName) {
            $.ajax({
                type: 'post',
                url: serverUrl + 'suibian',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: "successCallback",
                async: true,
                beforeSend: function() {
                    layer.open({
                        type: 2,
                        shadeClose: false,
                        content: '加载中...'
                    });
                },
                success: function(data) {
                    // console.log(item);
                    layer.close(0);
                    $.each(data, function(i, n) {
                        info.push(n.prizeName);
                        // goodsimgArr.push('http://192.168.0.158:8080/lucky-dram3/' + n.prizeImage);
                        // console.log(n.prizeImage);
                    });
                    config.turtuleArc(data.length);
                    config.createCirText(data.length);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                    layer.close(0);
                    config.rotateTimeOut();
                }
            })
        },

        /* 抽中第几个 */
        rnd: function() {
            $.ajax({
                type: 'get',
                url: serverUrl + 'save',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: "save",
                async: false,
                success: function(data) {
                    $('.pointer').attr('disabled', false);
                    if (data == 'error') {
                        layer.open({
                            content: '系统繁忙，请稍后！',
                            btn: '我知道了'
                        });
                    } else {

                        // $("#bb").text(data[0].prizeId);
                        prizeId = data[0].prizeId;
                        prizeState = data[0].prizeStats;
                        hadPrizeName = data[0].prizeName;
                        hadPrizeImg = data[0].prizeImage2;
                        config.chanceNumber();
                        setTimeout(function() {

                            if (bRotate) return;
                            // var item = Number($("#bb").text());
                            var item = Number(prizeId);
                            var state = prizeState;
                            chanceNum = Number($('.award_chance').text());
                            var dataLength = info.length;
                            for (var i = 1; i <= dataLength; i++) {
                                switch (item) {
                                    case i:
                                        config.rotateFn(i, Math.floor(Math.floor(360 / dataLength) * (i - 0.5)), data[0].prizeName, dataLength, prizeState, hadPrizeName, hadPrizeImg);
                                        break;
                                }
                            };
                            if (chanceNum > 0) {


                                config.musicPlayer($('#rotateAudio')[0]);

                                //转盘音效

                                // config.rotateWhich(item, state, hadPrizeName);
                                // console.log("over");
                                // chanceNum--;
                                // $('.award_chance').text(chanceNum);


                            } else {
                                var htmlSize = $('html').css('fontSize');
                                htmlSize = htmlSize.substring(0, htmlSize.indexOf('px'));
                                // console.log(htmlSize);
                                layer.open({
                                    content: '抱歉！您的次数已用完。继续玩游戏可以增加抽奖机会哦，赶紧去玩吧！！',
                                    style: ' color:#eee;',
                                    time: 2,
                                    skin: 'msg',
                                });
                            }
                        }, 10);
                        // console.log( data[0].prizeStats);   
                    }
                }
            });

        },
        /* 判断是否是平板电脑 */
        tabletCheck: function() {
            var a = /ipad|android 3.0|android|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
            return a;
        },

        /* 判断是否是微信 */
        isWeixin: function() {
            var a = navigator.userAgent.toLowerCase();
            return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1;
        },
        isSafari: function() {
            var a = navigator.userAgent,
                b = (navigator.appVersion,
                    a.indexOf("Safari") > -1 && a.indexOf("Version") > -1);
            return b
        },

        /* 判断是否是uc浏览器 */
        isUcbrowser: function() {
            var a = navigator.userAgent.toLowerCase();
            return "ucbrowser" == a.match(/ucbrowser/i) ? !0 : !1;
        },

        /* 检测是电脑端还是手机移动端，false为手机移动端,true为电脑端 */
        checkDevice: function() {
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
        },
        /* 橫竖屏切換 */

        suppOrientation: function() {
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
        }
    };


    // 全兼容的 事件绑定 and 阻止默认事件EventUtil.preventDefault();

    var EventUtil = {
        // Notice: type is not include 'on', for example: click mouseover mouseout
        // and so on
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
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        }

    };
    /*媒体查询*/

    var mediaQuery = {
        init: function() {
            var _this = this;
            _this.outputSize();
            EventUtil.addHandler(window, "resize", function() {});
        },
        outputSize: function() {
            var result1 = window.matchMedia('(min-width:1000px)');
            if (result1.matches) {
                $(".content").css({
                    "height": "1024px",
                    "width": "768px",
                    ' position': 'absolute',
                    'top': ' 0%',
                    ' left': '35%'
                });
            }
        }
    };
    mediaQuery.init();


    /* 点击大转盘，开始抽奖 */
    var bRotate = false;
    $('.pointer').click(function() {
        if ($('.pointer').attr('disabled') != undefined) {
            $("#rotateAudio")[0].paused ? config.musicPlayer($('#pointerAudio')[0]) : $('#pointerAudio')[0].pause();
            // }, 200);
            if ($('.award_chance').text() > 0) {
                config.rnd();


            } else {
                var htmlSize = $('html').css('fontSize');
                htmlSize = htmlSize.substring(0, htmlSize.indexOf('px'));
                // console.log(htmlSize);
                layer.open({
                    content: '抱歉！您的次数已用完。继续玩游戏可以增加抽奖机会哦，赶紧去玩吧！！',
                    style: ' color:#eee;',
                    time: 2,
                    skin: 'msg',
                });
            };


            // setTimeout(function(){


        }
    });
    if (config.checkDevice() == false) { // 手机端

        config.suppOrientation();
    }

    // 活动说明操作
    $(".rule").click(function() {
        $('.about_active').fadeIn();
        config.musicPlayer($('#ruleAudio')[0]); //按钮音效
    });
    $(".close").click(function() {
        $(".about_active").fadeOut();
        config.musicPlayer($('#ruleAudio')[0]); //按钮音效
    })

    config.rotateWhich();

    // 获取中奖名单

    $.ajax({
        type: 'get',
        url: serverUrl + 'findAll',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: "PrizeAllPerson",
        async: false,
        success: function(data) {
            $.each(data, function(index, item) {
                $('#con1').append('  <li><span>' + item.luckyPerson + '</span>获得<span>' + item.listName + '</span></li>');
            });
            // 轮播图
            var area = document.getElementById('scrollBox');
            var con1 = document.getElementById('con1');
            var con2 = document.getElementById('con2');
            con2.innerHTML = con1.innerHTML;

            function scrollUp() {
                area.scrollTop >= con1.offsetHeight ? area.scrollTop = 0 : area.scrollTop += 3;
            }
            var time = 50;
            var mytimer = setInterval(scrollUp, time);

        }
    });
    // 获取code
    if (duUlr.indexOf('code=') > -1) {
        var data = {
            code: duUlr.substr(duUlr.indexOf('code='))
        };
        $.ajax({
            type: 'post',
            url: serverUrl + 'getCode',
            dataType: 'jsonp',
            data: data,
            // jsonp: 'callback',
            // jsonpCallback: "c",
            async: false,
            success: function(data) {
                console.log(1);
            }
        });
    }
    // 抽奖次数
    config.chanceNumber();

})