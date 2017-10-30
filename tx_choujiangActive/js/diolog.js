
//手机号码，姓名，地址的验证
var yz_phone = /^0?1[34758]\d{9}$/; // 定义验证手机号码的正则表达式
var yz_name = /^[\u4e00-\u9fa5]{2,4}$|^[a-zA-Z]{2}/;
var serverUrl = 'http://192.168.0.158:8080/lucky-dram3/'; //接口地址
// var yz_address='';
// 验证对错后的小提示
var submit_yzmsg = {
    wrong: function(s) {
        s.siblings('.yz').find(".yz_wrong").show();
        s.siblings('.yz').find(".yz_right").hide();
    },
    right: function(h) {
        h.siblings('.yz').find(".yz_wrong").hide();
        h.siblings('.yz').find(".yz_right").show();
    }

}

var config1 = {
        // 音效播放
        musicPlayer: function(a) {
            a.paused ? a.play() : a.pause();
        }, // 中实物奖，弹框填写信息
        assure: function() {
            $('#Dialog1 .page__bd>input').remove();
            $('#Dialog1 .weui-dialog').fadeOut();
            $('.swlj').fadeIn();
        }, //点击领取奖品出现的信息
        showmsgFunction: function(hpnState) {
            config1.musicPlayer($('#ruleAudio')[0]); //按钮音效
            var data = {
                Person: 'Air'
            };
            $.ajax({
                type: 'post',
                url: serverUrl + 'lingjiang',
                data: data,
                crossDomain: true,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: "lingjiangpin",
                success: function(data) {
                    if (data.error) {
                        layer.open({
                            content: '你已经领取了，请不要重复领取!!',
                            style: 'color:#444;',
                            btn: '好的'
                        });
                    } else {
                        if (hpnState == 1) {
                            layer.open({
                                content: '已发放，请在微信公众号里领取！',
                                style: 'color:#444;',
                                btn: '我知道了'
                            });

                        } else if (hpnState == 2) {
                            var chanceNum = $('.award_chance').text();
                            chanceNum++;
                            $('.award_chance').text(chanceNum);
                            layer.open({
                                content: '已为您增加了一次抽奖机会，加油！',
                                style: 'color:#444;',
                                btn: '好的'
                            });

                        } else {
                            layer.open({
                                content: '领取成功，奖品已发放至您的游戏账号中，请注意查收！',
                                style: 'color:#444;',
                                btn: '好的'
                            });

                        }
                    }


                    setTimeout(function() {
                        $('.dialog').fadeOut();
                    }, 800);
                }
            });

        }, //提交实物奖励信息
        submit: function() {
            config1.musicPlayer($('#ruleAudio')[0]); //按钮音效
            var phone = $("#phone").val();
            var name = $("#name").val();
            var address = $("#adress").val();
            $(".award_bg").show();
            if (name.match(yz_name) == null) {
                layer.open({
                    content: '请填写真实姓名！',
                    style: 'color:#444;',
                    btn: '我知道了'
                });

            } else if (phone.match(yz_phone) == null) {
                layer.open({
                    content: '电话号码必须填写真实有效的，请重新填写！',
                    style: 'color:#444;',
                    btn: '我知道了'
                });

            } else if (!(address.indexOf('省') > -1 || address.indexOf('市') > -1 || address
                    .indexOf('县') > -1)) {
                // console.log(address);
                layer.open({
                    content: '请填写有效的地址!',
                    style: 'color:#444;',
                    btn: '我知道了'
                });

            } else {
                var data = {

                    name: name,
                    phone: phone,
                    address: address
                };
                // console.log($('#name').val());
                $.ajax({
                    type: 'post',
                    url: serverUrl + 'saveLucky',
                    data: data,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: "saveLucky",
                    success: function(data) {
                        layer.open({
                            content: '提交成功！',
                            style: 'color:#444;',
                            btn: 'ok'
                        });

                        setTimeout(function() {
                            $("#Dialog1").fadeOut();
                        }, 1000);
                    }
                });

            };

        }, // 是否为安卓
        isAndroid: function() {

            var ua = navigator.userAgent.toLowerCase();

            return ua.match(/Android/i) == "android";
        }
    }
    // 如果是安卓手机，填写实物信息时，弹出输入法时隐藏恭喜你中奖标题以防遮挡输入框
if (config1.isAndroid()) {
    $("input").focus(function() {

        $(".award_bg").hide();

    }).blur(function() {
        $(".award_bg").show();
    })
}
//验证实物中奖信息正确性
$("#phone").blur(function() {
    var phone = $(this).val();
    phone != "" ? (phone.match(yz_phone) == null ? submit_yzmsg
        .wrong($(this)) : submit_yzmsg.right($(this))) : submit_yzmsg.wrong($(this));
});
$("#name").blur(
    function() {
        var name = $(this).val();
        name != "" ? (name.match(yz_name) == null ? submit_yzmsg
            .wrong($(this)) : submit_yzmsg.right($(this))) : submit_yzmsg.wrong($(this));

    });
$("#adress").blur(
    function() {
        var adress = $(this).val();
        var yz_address = !(adress.indexOf('省') > -1 || adress.indexOf('市') > -1 || adress.indexOf('县') > -1);
        yz_address ? submit_yzmsg.wrong($(this)) : submit_yzmsg
            .right($(this));
    });
//关闭
$('#Dialog1 .close').click(function() {
    $('#Dialog1').hide();
    config1.musicPlayer($('#ruleAudio')[0]); //按钮音效
})

$(".close_btn").click(function() {
    $('.dialog').fadeOut();
    config1.musicPlayer($('#ruleAudio')[0]); //按钮音效
});
