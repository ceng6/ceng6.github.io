/**
 * Created by zhanghaibin on 2016/11/18.
 */
function json2url(json){
    json.t = Math.random();
    var arr = [];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
//url,data,type,time,fnSucc,fnFail
function ajax(json){
    var json = json || {};
    if(!json.url){
        alert('滚！');
        return;
    }
    json.data = json.data || {};
    json.time = json.time || 1000;
    json.type = json.type || 'GET';


    //1.ajax对象  request:请求  response:响应
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }
    else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //2.建立连接
    switch (json.type.toLowerCase()){
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置一个请求头

            oAjax.send(json2url(json.data));
            break;
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            //3.打开连接
            oAjax.send();
            break;
    }

    //4.接收
    var timer = null;
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState == 4){
            //完成
            if(oAjax.status >= 200 && oAjax.status<300 || oAjax.status == 304){
                //成功
                json.success && json.success(oAjax.responseText);
                clearTimeout(timer);
            }
            else{
                json.error && json.error(oAjax.status);
            }
        }
    };

    timer = setTimeout(function(){
        alert('你的网速太慢了，别等了！！');
    },json.time);


}












