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
    const mainwindow = $("body").parent().parent();
    const title = $("title");

    function WindowResize(){
        resizeTo($('body').width() + MesMaxwidth,$('body').height());
        console.log("width:"+$('body').width() + " | height:"+$('body').height());
        console.log("width:"+$mascot.width() + " | height:"+$mascot.height());
        console.log("width:"+mainImg.width() + " | height:"+mainImg.height());
        console.log("width:"+$('#Message').width() + " | height:"+$('#Message').height());        
    }
    //WindowResize();

    function pushMessage(text){
        var messageDiv = $("<p></p>");
        messageDiv.addClass("left_balloon")
        //messageDiv.css({ top: clientConfig.message.top, left: mainImg.width() + clientConfig.message.left })
        messageDiv.css({top:30, left: 50, width: 100, height: 20})
        //messageDiv.hide();
        $mascot.append(messageDiv)
        console.log("message");
    }
    pushMessage(1);

    var chipbox;
    var chipboxs = [];

   function sliceImage(){
        console.log("panelImage");
        var slice_url = 'img/balloon/balloon_b.png';
        //var panel = "";
        //panel = '<dir id = "slice" class = "slice_bk"></dir>';
        //$('#top-box').append(panel);
        //chipbox = $("#slice");

        roop_v = 9;
        var img_ver = 100;
        var img_hor = 100;
        var vertical = 50;
        var horizontal = 50;
        var chipboxs_ver = [];
        var chipboxs_hor = [];
        var chipboxs_pos_x = [];
        var chipboxs_pos_y = [];

        var sliceboxs = "";
        for (var i=0; i < roop_v; i++) {
            sliceboxs += '<div id="'+ 'slice'+ i + '" class="slice_bk"></div>';
        }
        $('#top-box').append(sliceboxs);

        for ( var i=0, tmp_x = 0, tmp_y = 0; i < roop_v; i++){
            chipboxs_ver[i] = (Math.floor(i/3)==1)?vertical:(img_ver-vertical)/2;
            chipboxs_hor[i] = (i%3==1)?horizontal:(img_hor-horizontal)/2;
            chipboxs_pos_y[i] = (i%3||!i)? tmp_y : (tmp_y+=chipboxs_ver[i-1]);
            chipboxs_pos_x[i] = (i%3)? (tmp_x+=chipboxs_hor[i-1]) : (tmp_x=0);
            chipboxs[i] = $("#slice"+i);
        }
        console.log(chipboxs_ver);
        console.log(chipboxs_pos_x);
        console.log(chipboxs_hor);
        console.log(chipboxs_pos_y);
        for ( var i = 0; i < roop_v; i++ ) {
            chipboxs_pos_x[i] += 100;
            chipboxs_pos_y[i] += 100;
        }

        for ( var i=0; i < roop_v; i++) {
            chipboxs[i].css({
                'background-image':'url(' + slice_url + ')',
                'background-position':(chipboxs_pos_x[i]*-1) + 'px ' + (chipboxs_pos_y[i]*-1) + 'px',
                'left':chipboxs_pos_x[i],
                'top':chipboxs_pos_y[i],
                'width':chipboxs_hor[i],
                'height':chipboxs_ver[i]
            })
        }
        chipboxs[4].css({'background-position' : '40% 40%'})


        // chipbox.css({'background-image':'url('+ slice_url + ')'});
        
        // chipbox.css({'backgroundPosition':(30 * -1) + 'px ' + (30 * -1) + 'px'});
        // chipbox.css({'left':100,'top':100,'width':30,'height':30,'opacity':1});
        //chipbox.css({'background-repeat':no-repeat})
        
    }
    sliceImage();
    var i = 30;
    var d = 100;
    chipboxs[4].on("mousemove",(e)=>{
        i++; d++;
        //chipboxs[4].css({'background-size':d + 'px','width':i, 'height':i});
        chipboxs[4].css({'height' : (i+50) + 'px', 'width' : (i+50) + 'px'})
        chipboxs[4].css({'background-size': (2*i+100)+'px ' + (2*i+100) + 'px'})
        //chipboxs[4].css({'background-position' : '40% 40%'})
        //chipboxs[4].css({'left':i+100})
        chipboxs[1].css({'width':(i+50) + 'px'})
        //chipboxs[1].css({'background-size': (2*i+100)+'px ' + })
        console.log("1");
    })

})


