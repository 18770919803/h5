   window.onload = function() {
    var c = document.getElementById("myCanvas"); //定义canvas画布（转盘）
        var ctx = c.getContext("2d");
        var i = 0;
        var centerX = '';
        var centerY = '';
        var centerR = '';
        var recOrd = {};
        var awards = document.getElementsByTagName('li');
        var click = false;
        function drawCanvas() {};
        drawCanvas.prototype.fillArc = function(descX, descY, width, height) {

            ctx.beginPath();
            ctx.save();
            var bgcolor = "#f3eb00"; //矩形背景的颜色
            centerX = descX + Math.floor(width / 2);
            centerY = descY + Math.floor(height / 2);
            centerR = Math.floor(height / 2);
            recOrd = {
                centerX: centerX,
                centerY: centerY,
                centerR: centerR
            };
            ctx.arc(centerX, centerY, centerR, 0, Math.PI * 2, true);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#f8b551';
            ctx.fillStyle = bgcolor;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.beginPath();
            ctx.save();
            var bgcolor = "#fff6e5"; //矩形背景的颜色
            ctx.arc(centerX, centerY, centerR - 5, 0, Math.PI * 2, true);
            ctx.fillStyle = bgcolor;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        };
        drawCanvas.prototype.fillRect = function(descX, descY, width, height) {
            var x = descX; //开始的x轴坐标
            var y = descY; //开始的y轴坐标
            var w = width; //矩形宽
            var h = height; //矩形高
            var r = 10; //圆角半径
            var bgcolor = "#f55"; //矩形背景的颜色
            ctx.beginPath();
            ctx.save();
            ctx.moveTo(x + r, y);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#f68';
            ctx.fillStyle = bgcolor;
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        };
        drawCanvas.prototype.drawImage = function(descX, descY) {

            var imgUrl = ['./img/1.png', './img/2.png', './img/3.png', './img/4.png', '', './img/1.png', './img/2.png', './img/4.png', './img/3.png'];
            ctx.beginPath();
            ctx.save();
            var img = new Image();
            img.src = imgUrl[i];
            img.onload = function() {
                ctx.drawImage(img, descX, descY, width, height);
            };
            i++;

            ctx.restore();
            ctx.closePath();
        };
        drawCanvas.prototype.fillText = function() {
            ctx.beginPath();
            ctx.strokeStyle = '#f39800';

            ctx.lineWidth = 1;
            ctx.font = '20px 微软雅黑';
            ctx.strokeText('开始', 132, 150);
            ctx.strokeText('抽奖', 132, 175);

        };
        drawCanvas.prototype.addAllShadow = function() {

            for (var k = 0; k < awards.length; k++) {
                k != 4 ? awards[k].style.backgroundColor = 'rgba(0,0,0,.4)' : '';
            }

        };
        drawCanvas.prototype.addShadow = function(awards) {
         // console.log(awards);
           awards.style.backgroundColor = 'rgba(0,0,0,.5)';
        };
        drawCanvas.prototype.removeShadow = function(awards) {
            // console.log(awards);
            awards.style.backgroundColor = 'rgba(0,0,0,0)';
        };
        drawCanvas.prototype.animate = function(index) {
            
            document.getElementById('action')
        };
        var drawCanvas = new drawCanvas();
        for (var k = 0; k < 3; k++) {
            var width = height = 83;
            var space = 15;
            var descY = height * k + space * (k + 1);
            for (var j = 0; j < 3; j++) {
                var descX = width * j + (j + 1) * space;
                j == 1 && k == 1 ? drawCanvas.fillArc(descX, descY, width, height) : drawCanvas.fillRect(descX, descY, width, height);
                drawCanvas.drawImage(descX, descY, width, height);
            }
        };
        var animateAll = {
            index:0, //当前转动到哪个位置，起点位置
            count:0, //总共有多少个位置
            timer: 0, //setTimeout的ID，用clearTimeout清除
            speed: 20, //初始转动速度
            times: 0, //转动次数
            cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:0, //中奖位置
            init: function(id) {
                if (awards.length > 0) {

                    $animateAll = document.getElementById(id);

                    $units = document.getElementsByClassName("active" + this.index)[0];
                    $units1 = document.getElementsByClassName("active" );
                    this.obj = $animateAll;
                    this.count =$units1.length;
                    drawCanvas.removeShadow($units);
                };
            },
            roll: function() {
     
                var index = this.index;
                var count = this.count;
         
                var animateAll = this.obj;
                drawCanvas.addShadow(document.getElementsByClassName("active" + index)[0]);
                index += 1;
                if (index > count - 1) {
                    index = 0;
                };

                drawCanvas.removeShadow(document.getElementsByClassName("active" + index)[0]);
                this.index = index;
                return false;
            },
            stop: function(index) {
                this.prize = index;
                return false;
            }
        }

        function roll() {
            animateAll.times += 1;
            animateAll.roll();
            if (animateAll.times > animateAll.cycle + 10 && animateAll.prize == animateAll.index) {

                clearTimeout(animateAll.timer);
                animateAll.prize = 0;
                animateAll.times = 0;
                click = false;
                console.log(click);
                
            } else {
             
                if (animateAll.times < animateAll.cycle) {
                
                    animateAll.speed -= 10;
                } else if (animateAll.times == animateAll.cycle) {
   
                    var index = Math.random() * (animateAll.count) | 0;
                    animateAll.prize = index;
                } else {
                        
                    if (animateAll.times > animateAll.cycle + 10 && ((animateAll.prize == 0 && animateAll.index == 7) || animateAll.prize == animateAll.index + 1)) {
                        animateAll.speed += 110;
                    
                    } else {
                        animateAll.speed += 20;
                       
                    }
                }
                if (animateAll.speed < 40) {
                    animateAll.speed = 40;
                     
                };
                //console.log(animateAll.times+'^^^^^^'+animateAll.speed+'^^^^^^^'+animateAll.prize);
                animateAll.timer = setTimeout(roll, animateAll.speed);
             
            }
            return false;
        }

     
        
        animateAll.init('animateAll');
        document.getElementById('action').onclick = function() {
            drawCanvas.addAllShadow();
            console.log(click);
            if (click) {
                
                return false;

            } else {
                   // console.log("false");
                animateAll.speed = 100;
                roll();
                click = true;
                return false;
            }
        };
        drawCanvas.fillText();
    }