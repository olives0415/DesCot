const { remote } = require('electron');
const { dialog, Menu } = remote;
const win = remote.getCurrentWindow();
window.$ = window.jQuery = require('jquery');
win.toggleDevTools();
win.removeAllListeners();

var MesMaxwidth = 0;

$(() => {
    const mainImg = $(".charImg");
    const $mascot = $("#Mascot");
    const mainwindow = $("body").parent();
    const fillter = $(".charBary");

    var moveFlg = false;
    var moveX = 0;
    var moveY = 0;

    fillter.css({left: mainImg.offset().left, top: mainImg.offset().top, width: mainImg.width(), height: mainImg.height()});
    console.log(mainImg.width());
    console.log("width:"+$(".charBary").width() + " height:"+fillter.height());
    console.log(fillter);

    function WindowResize(){
        resizeTo($mascot.width() + MesMaxwidth,$mascot.height());
    }
    WindowResize();

    fillter.on('mousedown', (e)=>{
        moveFlg = true;
        moveX = event.clientX;
        moveY = event.clientY;
        console.log("pos : "+win.getPosition() + " : " + typeof win.getPosition())
    })
    mainwindow.on('mouseup', (e)=>{
        moveFlg = false;
    })
    mainwindow.on('mousemove', (e)=>{
        if(moveFlg){
            //win.setPosition((event.clientX+win.getPosition()[0]-moveX), (event.clientY+win.getPosition()[1]-moveY));
            window.moveTo((event.clientX+win.getPosition()[0]-moveX), (event.clientY+win.getPosition()[1]-moveY));
        }
        //console.log("X:" + (event.clientX+win.getPosition()[0]-moveX) + "  Y:" + (event.clientY+win.getPosition()[1]-moveY));
    })
})