const { remote } = require('electron');
const { dialog, Menu } = remote;
const win = remote.getCurrentWindow();
window.$ = window.jQuery = require('jquery');
win.toggleDevTools();
win.removeAllListeners();
document.body.style.overflow = "hidden";

var MesMaxwidth = 0;

$(() => {
    const mainImg = $("#charImg");
    const $mascot = $("#Mascot");
    const $clock = $('#clock');
    const $clockarea = $('#clockArea');
    const $mes = $('#message');
    const $box = $(".box");
    const $option = $('#option');
     const $window = $(window);
    
    const week = {"Sun":"日", "Mon":"月", "Tue":"火", "Wed":"水", "Thu":"木", "Fri":"金", "Sat":"土"};
    const month = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
    
    var clockFlg = false;

    getclock();

    
    function WindowResize(){
        var w = Math.max($('body').width(), $clock.position().left+$clock.width()+10) + 16;
        var h = Math.max($('body').height(), 0/*$clock.position().top+$clock.height()+10*/) + 16;
        resizeTo(w,h);
    }
    // WindowResize();

    function initMessage(){
        deleteMessage();
        $('.message').remove();
    }

    function pushMessage(text){
        initMessage();
        var windowpos = {x:window.screenX, y:window.screenY};
        console.log(windowpos.x, windowpos.y);
        // window.moveTo(500,500);

        var messageDiv = $("<p></p>");
        var textlength = text.bytes();
        $mes.css({width:(textlength <= 20 ? textlength : 20)*8+32 + "px", height:(textlength/20+1)*16+32 + "px"})
        
        messageDiv.addClass("message");
        messageDiv.addClass("box bottom");
        messageDiv.css({width:(textlength <= 20 ? textlength : 20)*8 + "px", height:(textlength/20+1)*16 + "px"});
        messageDiv.text(text);
        //messageDiv.css({ top: clientConfig.message.top, left: mainImg.width() + clientConfig.message.left })
        //messageDiv.css({top:30, left: 50, width: 100, height: 20})
        //messageDiv.hide();
        $mes.append(messageDiv)
        console.log("message");
    }

    function deleteMessage(){

    }

    function getclock(){
        var date = new Date().toString().match(/(.+) (.+) (\d+) (\d+) (\d+):(\d+):(\d+)/);
        $('.date').text(date[4]+"/"+month[date[2]]+"/"+date[3]+"("+week[date[1]]+")");
        $('.time').text(date[5]+":"+date[6]+":"+date[7]);
    }
    setInterval(getclock, 1000);

    $('.clockpos:input').bind('keyup mouseup',function(){
        console.log("a");
        // $clockarea.css({"margin-left":$('.left').val() + "px"});
        $clock.css({"left":$('.left').val() + "px"})
        $clockarea.css({"margin-top":$('.top').val() + "px"});
    })

    $clock.click(()=>{
        if ( clockFlg ) {
            $option.hide();
            clockFlg = false;
        } else {
            $option.show();
            clockFlg = true;
        }
        WindowResize();
    })

    String.prototype.bytes = function () {
        var length = 0;
        for (var i = 0; i < this.length; i++) {
            var c = this.charCodeAt(i);
            if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                length += 1;
            } else {
                length += 2;
            }
        }
        return length;
    };
    
    $('#pushmessage').click(()=>{
        pushMessage("あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお");
        $mascot.before($mes);
    })

    

})


