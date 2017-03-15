'use strict';
function DOMReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function (){
            fn&&fn();
        },false);
    }else{
        document.attachEvent('onreadystatechange',function (){
            if(document.readyState=='complete'){
                fn&&fn();
            }
        });
    }
}

DOMReady(function() {


 var oDiv = document.getElementById("boxList");

    var chrome = window.navigator.userAgent;

    var reWebkit = /chrome/gi;

    if (!reWebkit.test(chrome)) {
        alert('请使用谷歌浏览器查看此效果');
    }

    var aRoll = oDiv.children;

    for (var i = 0; i < aRoll.length; i++) {
        aRoll[i].iNow = -1;
    }

    clock(aRoll);

    drag(oDiv);

    auto(oDiv);


function toDou(num)
{
    if(num<10)
    {
        return '0'+num;
    }
    else
    {
        return num;
    }
}

function atimer(aObj)
{
    var oDate=new Date();
    var hour=oDate.getHours();
    var minuetes=oDate.getMinutes();
    var sec=oDate.getSeconds();

    var str=''+toDou(hour)+toDou(minuetes)+toDou(sec);

    for (var i=0;i<aObj.length;i++)
    {
        aObj[i].children[2].innerHTML=str.charAt(i);

        if(aObj[i].iNow!=str.charAt(i))
        {
            rotate(aObj[i],0,-90)
        }

        aObj[i].iNow=str.charAt(i);
    }
}

function clock(aObj)
{
    atimer(aObj);
    setInterval(function (){atimer(aObj)}, 1000);
}

function auto(obj)
{
    var iCurX=-100;
    var iCurY=-100;
    var iSpeedX=0;
    var iSpeedY=0;
    var iTarget=100;

    var btn=true;

    clearInterval(obj.timerAuto)
    obj.timerAuto=setInterval(function(){

        iSpeedX+=(iTarget-iCurX)/5;
        iSpeedX*=0.7;
        iCurX+=iSpeedX;

        iSpeedY+=(iTarget-iCurY)/5;
        iSpeedY*=0.7;
        iCurY+=iSpeedY;

        obj.style.WebkitTransform='perspective(500px) translateZ(-40px) rotateX('+(-(iCurY+iSpeedY)/10)+'deg) rotateY('+(-(iCurX+iSpeedX)/10)+'deg)';

    },30)
}

function drag(obj)
{
    obj.onmousedown=function(ev)
    {
        var nowX=0;
        var nowY=0;
        var x=0;
        var y=0;

        clearInterval(obj.timerAuto);
        var oEvent=ev||event;

        var disX=oEvent.clientX-nowX;
        var disY=oEvent.clientY-nowY;

        document.onmousemove=fnMove;
        document.onmouseup=fnUp;

        return false;

        function fnMove(ev)
        {
            var oEvent=ev||event;
            x=oEvent.clientX-disX;
            y=oEvent.clientY-disY;

            obj.style.WebkitTransform='perspective(500px) translateZ(-40px) rotateX('+(-y/10)+'deg) rotateY('+(-x/10)+'deg)';

            return false;
        }

        function fnUp()
        {
            nowX=x;
            nowY=y;
            this.onmouseup=null;
            this.onmousemove=null;
            auto(obj);
        }
    }
}

function rotate(obj,iCur,iTarget,fn) {
    obj.iSpeed = 0;

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var bStop = true;

        obj.iSpeed += (iTarget - iCur) / 5;
        obj.iSpeed *= 0.7;

        iCur += obj.iSpeed;

        if (Math.round(iCur) != iTarget || parseInt(obj.iSpeed) != 0) {
            bStop = false;
        }

        obj.style.WebkitTransform = 'rotateX(' + (iCur + obj.iSpeed) + 'deg)';

        if (bStop) {
            clearInterval(obj.timer);

            if (fn) {
                fn();
            }
        }

    }, 30)
};
});