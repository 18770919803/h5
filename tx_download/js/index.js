$(document).ready(function() {
  var windowHeight = $(window).height();
  $body = $("body");
  $body.css("height", windowHeight); //重要代码
  var pageHeight = $("body").height(); //页面高度
  var pageWidth = $("body").width(); //页面宽度
  var num = $(".page").length;
  var DOWN_URL = "./download.html";
  var currentPage = "";
  var pre = "";
  var next = "";
  /*判断锦集*/
  var config = {
    /*将多余的手机样式隐藏*/
    deletePhoneStyle: function() {
      $(".content").css({
          "width": "100%",
          "height": "100%",
          "left": "0",
          "margin-left": "0",
          "top": "0",
          "margin-top": "0"
        }),
        $(".content>.phonebox").css("width", "100%");
      $(".phonebox>.main").css({
        "width": "100%",
        "border-left": "none",
        "border-right": "none",
        "height": "100%"
      });
      $(".content>.code").hide();
      $(".phonebox>.top").hide();
      $(".phonebox>.phone_menubar").hide();
      $(".phonebox>.scene_title_baner").hide();
      $(".phonebox>.bottom").hide();
    },
    /*将隐藏的手机样式显示*/
    addPhoneStyle: function() {
      $(".content>#code").show();
      $(".phonebox>.top").show();
      $(".phonebox>.phone_menubar").show();
      $(".phonebox>.scene_title_baner").show();
      $(".phonebox>.bottom").show();
      $(".phonebox>.main").css("height", "75.8%");
      $("#page1 > #page1_title").css({
        "width": "150px",
        "height": "240px",
        "margin": "30% auto"
      });
      $("#page2 > #page2_title").css({
        "width": "150px",
        "height": "140px",
        "margin": "49% auto"
      });
      $("#page3 > #page3_title").css({
        "width": "160px",
        "height": "150px",
        "margin": "50% auto"
      });
      $("#page4 > #page4_title").css({
        "width": "210px",
        "height": "110px",
        "margin": "50% auto"
      });
      $("#fix_left_content>.hand_note").css({
        "bottom": "13%",
        "right": " 50%"
      });
      $("#fix_right_content> .hand_note").css({
        "bottom": "6%",
        "right": " 5%"
      });
      $("#all_page >.page_fixed_content").css("font-size", ".75rem");
    },
    /*判断是否是平板电脑*/
    tabletCheck: function() {
      var a = /ipad|android 3.0|android|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
      return a;
    },
    /*判断是否是微信*/
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
    /*判断是否是uc浏览器*/
    isUcbrowser: function() {
      var a = navigator.userAgent.toLowerCase();
      return "ucbrowser" == a.match(/ucbrowser/i) ? !0 : !1;
    },

    /* 检测是电脑端还是手机移动端，false为手机移动端,true为电脑端*/
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
    playMusic: function(a) { //音乐播放
      a.paused ? $("#music_player>audio")[0].play() & $("#music_player").attr("class", "disc") : $("#music_player>audio")[0].pause() & $("#music_player").attr("class", "stop");
    },
    // 监听用户是否切换页面，切换则暂停音乐,回来则继续
    browerKernel: function() {
      var result;
      ['webkit', 'moz', 'o', 'ms'].forEach(function(prefix) {
        if (typeof document[prefix + 'Hidden'] != 'undefined') {
          result = prefix;
        }
      });
      return result;
    },
    init: function() {
      prefix = config.browerKernel();
      document.addEventListener(prefix + 'visibilitychange', function onVisibilityChange(e) {
        if (document[prefix + 'VisibilityState'] == 'visible') $("#music_player>img:eq(1)").hasClass("disc") ? $("#music_player>audio")[0].play() : $("#music_player>audio")[0].pause();
        else if (document[prefix + 'VisibilityState'] == 'hidden') $("#music_player>audio")[0].pause();
      });
    },
    // 上一页动画
    prePage: function() {
      animatePage();
      var preNum = currentPage - 1;
      if (currentPage == 1) {
        preNum = num;
      };
      setTimeout(function() {
        touchEndSlip(preNum, "", pageHeight);
      }, 500);
    },
    // 下一页动画
    nextPage: function() {

      animatePage();
      var nextNum = currentPage + 1;
      if (currentPage == num) {
        nextNum = 1;
      };
      setTimeout(function() {
        touchEndSlip(nextNum, "", -pageHeight);
      }, 500);
    },
    clickFuli: function(a, b, c) {
      c.click(function() {
        a.toggle();
        b.toggle();
      });
    }, // 手机端触发福利事件
    touchFuli: function(a, b, c) {
      c.addEventListener("touchstart", function() {
        a.toggle();
        b.toggle();
      });
    }
  };
  config.init();
  // 上一页，下一页点击事件
  $(".pre_button").click(function() {
    config.prePage(pageHeight);
  });
  $(".next_button").click(function() {
    config.nextPage(pageHeight);
  });
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

  /*媒体查询*/

  var mediaQuery = {
    init: function() {
      var _this = this;
      _this.outputSize();
      EventUtil.addHandler(window, "resize", function() {});
    },
    outputSize: function() {
      var result1 = window.matchMedia('(max-width:600px)');
      if (result1.matches) {
        $(".content > .phonebox").css({
          "height": "545px",
          "width": "20.1rem"
        });
        $("body > .content").css({
          "left": "23%",
          "top": "30%"
        });
        $("#code").css({
          "display": "none"
        });
      }
    }
  };



  /*橫竖屏切換 */

  function suppOrientation() {
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

  if (config.checkDevice() == true) { //电脑端
    $("#code").show();
    config.addPhoneStyle();
    /*电脑端鼠标点击事件*/
    $(".page_xz").click(function() {
      window.open(DOWN_URL);
      return false;
    });
    $("#music_player").click(function() {
      config.playMusic($("#music_player>audio")[0]);
      return false;
    });
    config.clickFuli($("#fix_left_content"), $("#fix_right"), $("#fix_left_content>.close"));
    config.clickFuli($("#fix_left"), $("#fix_right_content"), $("#fix_right"));
    config.clickFuli($("#fix_right_content"), $("#fix_left"), $("#fix_right_content>.close"));
    config.clickFuli($("#fix_right"), $("#fix_left_content"), $("#fix_left"));
  } else if (config.checkDevice() == false) { //手机端

    $("#code").hide();
    suppOrientation(); // 橫屏切換 
    config.deletePhoneStyle(); // 将多余的手机样式去掉
    //监听音乐结束，自动停止动画
  
    /* 音乐 播放器  */
    $("#music_player")[0].addEventListener("touchend", function(event) {
      config.playMusic($("#music_player>audio")[0]);
    }, false);
  };

  //监听音乐结束，自动停止动画
  $("#music_player>audio")[0].addEventListener("ended", function(event) {
    $(".disc").attr("class", "stop");
  }, false);
  //解决ios禁止audio自动播放属性 
  config.isSafari() ? $("#music_player>img.disc").removeClass("disc") : "";

  if (config.isWeixin()) { //判断是否在微信 
    if ($("#music_player>audio").length > 0) {
      if ($("#music_player").hasClass("disc")) {
        document.addEventListener("WeixinJSBridgeReady", function() {
          document.getElementById('myaudio').play();
        }, false);
      }
    }
  };
  // 福利
  config.touchFuli($("#fix_left_content"), $("#fix_right"), $("#fix_left_content>.close")[0]);
  config.touchFuli($("#fix_left"), $("#fix_right_content"), $("#fix_right")[0]);
  config.touchFuli($("#fix_right_content"), $("#fix_left"), $("#fix_right_content>.close")[0]);
  config.touchFuli($("#fix_right"), $("#fix_left_content"), $("#fix_left")[0]);

  /*如果是平板电脑*/
  if (config.tabletCheck() == true && pageWidth >= 600) {
    $("#code").show();
    config.addPhoneStyle();
    $(".content > .phonebox").css({
      "height": "565px",
      "width": "20rem"
    });
    $("body > .content").css({
      "left": "5%",
      "top": "10%"
    });
    mediaQuery.init();
  }


  // 如果是uc浏览器
  if (config.isUcbrowser()) {
    deletePhoneStyle(); /*将多余的手机样式隐藏*/
    $(".page_words").show();
  };
  //第三页
  /*翻页效果*/
  //手指滑动屏幕效果，只做了向上向下滑

  $(".page").on("touchstart", function(e) {
    var currentPage = $(this).index(".page") + 1;　　　　
    e.preventDefault();　　　　
    startX = e.originalEvent.changedTouches[0].pageX, 　　　　
      startY = e.originalEvent.changedTouches[0].pageY;
    removeStart(currentPage, num);
    setTimeout(function() {
      $(".page").on("touchmove", function(e) {
        var currentPage = $(this).index(".page") + 1;　　　
        e.preventDefault();　　　
        moveEndX = e.originalEvent.changedTouches[0].pageX, 　　　moveEndY = e.originalEvent.changedTouches[0].pageY, 　　　X = moveEndX - startX, 　　　
          Y = moveEndY - startY;
        $(".page").removeClass("show_moving show_moving2");
        $(".page").css({
          "-webkit-transition": "none !important",
          "-moz-transition": "none !important",
          "-ms-transition": "none !important",
          "-o-transition": "none !important",
          "transition": "none !important",
        });
        showMoving(pre, Y);
        showMoving(next, Y);　　
      });
      $(".page").on("touchend", function(e) {
        e.preventDefault();
        var currentPage = $(this).index(".page") + 1;　　　

        //上一页，下拉`　　　
        if (Math.abs(Y) > Math.abs(X) && Y > 30) {
          touchEndSlip(pre, currentPage, pageHeight);　　
        } else if (Math.abs(Y) > Math.abs(X) && Y <= 30 && Y > 0) {
          touchEndSlip1(pre, currentPage, -Y);　　　　
        } else if (Math.abs(Y) > Math.abs(X) && Y < -30) { //下一页，上滑`
          touchEndSlip(next, currentPage, -pageHeight);　　　　
        } else if (Math.abs(Y) > Math.abs(X) && Y >= -30 && Y < 0) { //下一页，上滑`
          touchEndSlip1(next, currentPage, -Y);　　　　
        }　　　
      });
    }, 100);
  });
  $(".page_xz").on("touchend", function(e) {
    e.preventDefault();
    window.open(DOWN_URL, "_blank");

  });


  // 动画部分
  function removeStart(currentPage, num) {
    pre = currentPage - 1;
    next = currentPage + 1;
    if (currentPage == 1) {
      pre = num;
    } else if (currentPage == num) {
      next = 1;
    };
    $("#page" + (pre)).css("margin-top", "-" + pageHeight + "px");
    $("#page" + (next)).css("margin-top", pageHeight + "px");
  };

  function showMoving(move, y) {
    $("#page" + (move)).addClass("show_moving");
    $("#page" + (move)).css({
      "-webkit-transform": "translateY(" + y + "px)",
      "-moz-transform": "translateY(" + y + "px)",
      "-ms-transform": "translateY(" + y + "px)",
      "-o-transform": "translateY(" + y + "px)",
      "transform": "translateY(" + y + "px)",
    }).show();
  };

  function hideMoving(hide) {
    $("#page" + (hide)).hide();
  };

  function touchEndSlip(a, b, pageHeight) {
    $(".page").not("#page" + b).removeClass("current_page show_moving show_moving1 show_moving2").css("display", "none");
    $("#page" + a).addClass("show_moving show_moving1");
    showMoving(a, pageHeight);
    $("#page" + a).addClass("current_page");
  };

  function touchEndSlip1(a, pageHeight) {
    $(".page").removeClass("current_page show_moving show_moving1 show_moving2");
    $("#page" + a).addClass("show_moving show_moving2");
    showMoving(a, pageHeight);
    $("#page" + a).addClass("current_page");
  }; // 电脑端点击福利事件

  function animatePage() {
    currentPage = Number($(".current_page").attr("id").substr(4));
    removeStart(currentPage, num);
  };
  
  
})