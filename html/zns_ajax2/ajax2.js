// JavaScript Document

function json2url(json){
    json.t = Math.random();
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(url,data,fnSucc,fnFail){
    //data  = {a:1,b:2,wd:'js'}


    //1.ajax对象  request:请求  response:响应
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }
    else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //2.建立连接
    oAjax.open('GET',url+'?'+json2url(data),true);
    //3.打开连接
    oAjax.send();
    //4.接收
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState == 4){
            //完成
            if(oAjax.status >= 200 && oAjax.status<300){
                //成功
                fnSucc && fnSucc(oAjax.responseText);
            }
            else{
                fnFail && fnFail(oAjax.status);
            }
        }
    };


}