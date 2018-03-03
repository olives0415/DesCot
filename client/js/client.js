const { remote } = require('electron');
const { dialog, Menu } = remote;
const win = remote.getCurrentWindow();
window.$ = window.jQuery = require('jquery');
win.toggleDevTools();
win.removeAllListeners();
document.body.style.overflow = "hidden";

var MesMaxwidth = 0;

$(() => {
    const mainImg = $(".charImg");
    const $mascot = $("#Mascot");
    const $clock = $('#clock');
    const $box = $(".box");
    const $option = $('#option');

    const week = {"Sun":"日", "Mon":"月", "Tue":"火", "Wed":"水", "Thu":"木", "Fri":"金", "Sat":"土"};
    const month = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};

    getclock();

    function WindowResize(){
        resizeTo($('body').width() + MesMaxwidth,$('body').height());
        console.log("width:"+$('body').width() + " | height:"+$('body').height());
        console.log("width:"+$mascot.width() + " | height:"+$mascot.height());
        console.log("width:"+mainImg.width() + " | height:"+mainImg.height());
        console.log("width:"+$('#Message').width() + " | height:"+$('#Message').height());        
    }
    //WindowResize();

    function initMessage(){
        deleteMessage();
        $('.message').remove();
    }

    function pushMessage(text){
        initMessage();
        var messageDiv = $("<p></p>");
        messageDiv.addClass("message");
        messageDiv.addClass("box top");
        //messageDiv.css({ top: clientConfig.message.top, left: mainImg.width() + clientConfig.message.left })
        //messageDiv.css({top:30, left: 50, width: 100, height: 20})
        //messageDiv.hide();
        $mascot.append(messageDiv)
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
        $clock.css({left:$('.left').val() + "px"});
        $clock.css({top:$('.top').val() + "px"});
    })

    var clockFlg = true;
    $clock.click(()=>{
        if ( clockFlg ) {
            $option.hide();
            clockFlg = false;
        } else {
            $option.show();
            clockFlg = true;
        }
    })

    $('#pushmessage').click(()=>{
        pushMessage("example...");
    })

})


