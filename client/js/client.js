const { remote } = require('electron');
const { dialog, Menu } = remote;
const win = remote.getCurrentWindow();
const fs = require('fs');
window.$ = window.jQuery = require('jquery');
// win.toggleDevTools();
win.removeAllListeners();
document.body.style.overflow = "hidden";

var MesMaxwidth = 0;

$(() => {
    const mainImg = $('#charImg');
    const $mascot = $('#Mascot');
    const $clock = $('#clock');
    const $clockarea = $('#clockArea');
    const $option = $('#option');
    
    const week = {"Sun":"日", "Mon":"月", "Tue":"火", "Wed":"水", "Thu":"木", "Fri":"金", "Sat":"土"};
    const month = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
    
    var optionFlg = false;

    (function setImg(){
        fs.readdir('client/img/char/', function(err, files){
            if (err) throw err;
            // console.log(files)
            $('.charImg').attr("src", "img/char/"+ files[0]);
        });
    })();

    setTimeout(() => {
        WindowResize();
    }, 1000);
    
    function WindowResize(){
        var w = Math.max($('body').width(), $clock.position().left+$clock.width()+10) + 16;
        var h = $('body').height() + 16;
        resizeTo(w,h);
    }
    
    function getclock(){
        var date = new Date().toString().match(/(.+) (.+) (\d+) (\d+) (\d+):(\d+):(\d+)/);
        $('.date').text(date[4]+"/"+month[date[2]]+"/"+date[3]+"("+week[date[1]]+")");
        $('.time').text(date[5]+":"+date[6]+":"+date[7]);
    }
    getclock();
    setInterval(getclock, 1000);
    
    $('.clockpos:input').bind('keyup mouseup',function(){
        $clock.css({"left":$('.left').val() + "px"})
        $clockarea.css({"margin-top":-$('.top').val() + "px"});
        WindowResize();
    })
    
    $clock.click(()=>{
        if ( optionFlg ) {
            $option.hide();
            optionFlg = false;
        } else {
            $option.show();
            optionFlg = true;
        }
        WindowResize();
    })
    
    $('.close').click(function(){
        $option.hide();
        optionFlg = false;
        WindowResize();
    })
})


