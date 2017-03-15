var JSON={};
function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}
function rnd(n,m){
	return Math.floor(Math.random()*(m-n)+n);
}

function loadImage(arr,fnSucc,fnLoading){
	var count=0;
	for(var i=0; i<arr.length; i++){
		var oImg=new Image();
			(function (index){
			oImg.onload=function (){
				JSON[arr[index]]=this;
				
				count++;
				
				fnLoading&&fnLoading(count,arr.length);
				
				if(count==arr.length){
					fnSucc&&fnSucc();
				}
			};
		})(i);
		oImg.src='../img/'+arr[i]+'.png';
	}
}

















