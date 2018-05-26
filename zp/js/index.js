window.onload = function() {
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    var body = document.getElementsByTagName('body')[0];
    var bodyHeight = body.clientHeight;
    var pointer = document.getElementsByClassName('pointer')[0];
    var content = document.getElementsByClassName('content')[0];
    var zpbj = document.getElementsByClassName('zpbj')[0];
    var style = document.createElement('style');
    document.head.appendChild(style);
    sheet = style.sheet;
    var centerX = '';
    var centerY = '';
    var centerR = '';
    var config = {
        canWidth: c.width,
        canHeight: c.height,
        awardName: ['服饰', '50000', '7200', '5钻', '门票', '轮盘', '800', '450', '1钻 ', '3钻', '3000', '戒指'],
        awardNameLength: '',
        goodsimgArr: ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png ', 'images/5.png', 'images/1.png', 'images/3.png'],
        centerX: 0,
        centerY: 0,
        centerR: 0,
        light: false,
        startAngle: '',
        endAngle: '',
        rotateFinal: 0,
        rotateTime: 8, //指针转动时间
        rotateNum: 9, //指针转动圈数
        //初始化
        init: function() {
            centerX = Math.floor(Number(this.canHeight) / 2);
            centerY = Math.floor(Number(this.canHeight) / 2);
            centerR = Math.floor((Number(this.canHeight) * .55) / 2);
            this.centerX = centerX;
            this.centerY = centerY;
            this.centerR = centerR;
            this.awardNameLength = this.awardName.length;
        },
        
        //转盘背景
        turtuleBg: function() {
            var zpbjWidth = zpbjHeight = c.clientHeight;

            zpbj.style.height = zpbjHeight + 35 + 'px';
            zpbj.style.width = zpbjWidth + 35 + 'px';
            var ww = zpbjWidth + 5;

            sheet.addRule('.zpbj::after', 'width:' + ww + 'px;height:' + ww + 'px;margin:' + (bodyHeight - zpbjWidth - 26) / 2 + 'px  14px');
            sheet.addRule('.zpbj::before', 'width:' + ww + 'px;height:' + ww + 'px;margin:' + (bodyHeight - zpbjWidth - 26) / 2 + 'px  14px');
            zpbj.style.margin = (bodyHeight - zpbjWidth - 34) / 2 + 'px  34px';
            content.style.margin = (bodyHeight - zpbjWidth) / 2 + 'px auto';
        },
        //转盘颜色
        turtuleColor: function(a, b, c) {

            var lGrd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerR * 1.85);
            lGrd.addColorStop(0, a);
            lGrd.addColorStop(.9, b);
            lGrd.addColorStop(1, c);
            ctx.strokeStyle = lGrd;
        },
        //转盘奖项背景
        turtuleAwardBg: function() {
            var awardNameLength = this.awardNameLength;
            for (var i = 1; i <= awardNameLength; i++) {
                startAngle = Math.PI * (2 / awardNameLength) * i;
                endAngle = Math.PI * (2 / awardNameLength) * (i + 1);
                // 
                ctx.beginPath();
                ctx.save();
                ctx.arc(centerX, centerY, centerR, startAngle, endAngle, false);
                ctx.lineWidth = centerR + (centerR * 0.6);
                if (i % 2 == 0) {

                    config.turtuleColor('rgba(255,255,255,.5)', 'rgba(255,255,255,.4)', 'rgba(255,255,255,.1)');
                } else if (i == awardNameLength && awardNameLength % 2 != 0) {
                    config.turtuleColor('#20c520', '#31c531', '#7fe739');
                } else {
                    ctx.strokeStyle = 'rgba(255,255,255,0)';
                }

                ctx.stroke();
                ctx.restore();

            }

        },
        //转盘奖项文字和图片
        turtuleAward: function() {
            var awardNameLength = this.awardNameLength;
            ctx.font = "bold 35px Arial"; // 设置字体
            ctx.fillStyle = "#333"; // 设置填充颜色
            var line_height = 27;
            var step = 2 * Math.PI / awardNameLength; // 圆的弧度
            var arc = Math.PI / (awardNameLength / 2);
            var info = this.awardName;
            for (var i = 1; i <= awardNameLength; i++) {
                var angle = (i * arc);
                startAngle = Math.PI * (2 / awardNameLength) * i;
                endAngle = Math.PI * (2 / awardNameLength) * (i + 1);
                //绘制放文字背景
                ctx.beginPath();
                ctx.save();
                ctx.arc(centerX, centerY, centerR * 0.8, startAngle, endAngle, false);
                ctx.lineWidth = 50;
                if (i % 2 == 0) {

                    config.turtuleColor('rgba(255,255,255,.5)', 'rgba(255,255,255,.4)', 'rgba(255,255,255,.1)');
                } else if (i == awardNameLength && awardNameLength % 2 != 0) {
                    config.turtuleColor('#20c520', '#31c531', '#7fe739');
                } else {
                    config.turtuleColor('rgba(255,255,255,.5)', 'rgba(255,255,255,.4)', 'rgba(255,255,255,.1)');
                }

                ctx.stroke();
                ctx.restore();
                ctx.closePath();
                //转盘奖项文字和图片
                ctx.beginPath();
                ctx.save();
                ctx.translate(centerX + Math.cos(angle + arc / 2) * 185, centerY + Math.sin(angle + arc / 2) * 185);
                //rotate方法旋转当前的绘图
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                //绘制奖品图片
                var goodsimgArr = this.goodsimgArr;
                var img = new Image();
                img.src = goodsimgArr[i - 1];
                ctx.drawImage(img, -85, -220, 155, 155);
                //绘制奖品文字
                ctx.fillText(info[i - 1], -ctx.measureText(info[i - 1]).width / 2, 0);
                ctx.restore();
                ctx.closePath();
            }

        },
        // 光圈闪动画提取的可重用代码
        lightBlinkCream: function(a, b, c, style) {

            sheet.addRule('.zpbj::after', a);
            sheet.addRule('.zpbj::before', b);
            light = c;
            this.light = light;
        },
        // 光圈闪动画
        lightBlink: function() {

            var light = this.light;
            light == false ? config.lightBlinkCream('display:none', 'display:block', true, style) : config.lightBlinkCream('display:block', 'display:none', false);

        },
        //对奖品图片预加载
        preloadimages: function(arr) {
            var newimages = [],
                loadedimages = 0;
            var postaction = function() {}; //此处增加了一个postaction函数
            var arr = (typeof arr != "object") ? [arr] : arr;

            function imageloadpost() {
                loadedimages++;
                if (loadedimages == arr.length) {
                    postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
                };
            }
            for (var i = 0; i < arr.length; i++) {
                newimages[i] = new Image();
                newimages[i].src = arr[i];
                newimages[i].onload = function() {
                    imageloadpost();
                };
                newimages[i].onerror = function() {
                    imageloadpost();
                };
            };
            return { //此处返回一个空白对象的done方法
                done: function(f) {
                    postaction = f || postaction
                }
            }
        },
        //转的角度
        rotateAngleAll:function(){
           
        },
        //指针转动画
        rotatePoint: function() {

         var rotateNum = this.rotateNum;
            var averAngle = 360 / this.awardNameLength; //奖项平均度数
            var rotateAngle = Math.floor(Math.random() * 10) * averAngle + (averAngle * 0.5); //旋转度数
            var rotateFinal = this.rotateFinal;
            rotateFinal = 360 * rotateNum + rotateAngle + rotateFinal;
               console.log(rotateAngle);
            pointer.setAttribute('style', 'transition:all ' + this.rotateTime + 's ease ; transform:rotate(' + rotateFinal + 'deg)');
               turtuleAnimate.setAttribute('style', 'transition:all ' + this.rotateTime + 's ease ; transform:rotate(' + rotateFinal + 'deg)');
                 this.rotateFinal = rotateFinal - (averAngle * 0.5);
          

        },
        //绘制转盘光圈动画
        turtuleAnimate: function() {

            var turtuleAnimate = document.getElementById('turtuleAnimate');
            var ctxA = turtuleAnimate.getContext('2d');
            var awardNameLength = this.awardNameLength;
            ctxA.clearRect(0,0,900,900);
            for (var i = 1; i <= awardNameLength; i++) {
                startAngle = Math.PI * (2 / awardNameLength) * (i+6.5);
                endAngle = Math.PI * (2 / awardNameLength) * (i + 7.5);
    
                 ctxA.beginPath();
                 ctxA.save();
                 ctxA.arc(centerX, centerY, centerR, startAngle, endAngle, false);
                 ctxA.lineWidth = centerR + (centerR * 0.6);
                if (i == 1) {
                        ctx.shadowBlur=190;
                     ctx.shadowColor="rgba(0,0,0,.8)";
                     ctxA.strokeStyle = 'rgba(255,255,0,.2)';
                 
                } else if (i == 2) {
                       console.log(2);
                           ctx.shadowBlur=20;
                     ctx.shadowColor="rgba(255,255,0,.2)";
                     ctxA.strokeStyle = 'rgba(255,255,0,.4)';
                }else if (i == 3) {
                     console.log(3);
                         ctx.shadowBlur=20;
                     ctx.shadowColor="rgba(255,255,0,.2)";
                   ctxA.strokeStyle = 'rgba(255,255,0,.6)';
                }else if (i == 4) {
                     console.log(4);
                         ctx.shadowBlur=20;
                     ctx.shadowColor="rgba(255,255,0,.2)";
                  ctxA.strokeStyle = 'rgba(255,255,0,.8)';
                } else {
                     ctxA.strokeStyle = 'rgba(0,0,0,.4)';
                }
    
                 ctxA.stroke();
                     
          
                

            }
         //      var aniGif=new Image();
         // aniGif.src ='images/light.gif';
         //   aniGif.onload = function() {

         //           ctxA.drawImage(aniGif,-100,-200, 900, 900);
         //            console.log(12);
         //        };


        },
    };
    config.init();
    config.turtuleBg();
    config.turtuleAwardBg();

    //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
    config.preloadimages(config.goodsimgArr).done(function(images) {
        config.turtuleAward();
    });

    var Interval = setInterval(config.lightBlink, 500);
    pointer.addEventListener('click', function() {
        console.log();

       
        config.turtuleAnimate();
         config.rotatePoint();
    });

}