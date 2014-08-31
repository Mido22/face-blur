

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
var comp=[];
$(document).ready(function() {

	navigator.getUserMedia({audio: true, video: true}, function(stream) {
		console.log('hah 123');
		$('#video')[0].src = window.URL.createObjectURL(stream);

		$('#video')[0].muted=true;
		$('#video').hide();
		$('#tc').hide();
		play();
		blurFace();
  }, function(e){ console.log('error occoured= '+e)});
});

function play(){
	try{		
		var v= $('#video')[0];
		var context=$('#canvas1')[0].getContext('2d');
		context.drawImage(v,0,0);
		window.requestAnimationFrame(play);
	}catch(e){
		window.requestAnimationFrame(play);
	}
}

function blurFace(){
			var c=$('#tc')[0];
			var c1=$('#canvas1')[0];
			var c2=$('#canvas2')[0];
			var ctx=c.getContext('2d');
			var ctx1=c1.getContext('2d');
			var ctx2=c2.getContext('2d');
			ctx.drawImage(c1,0,0,720,540,0,0,280,210);

			var tComp = ccv.detect_objects({ "canvas" : c,
											"cascade" : cascade,
											"interval" : 5,
											"min_neighbors" : 1 });
			if(tComp.length>0)	{
				comp=tComp;
    			ctx2.clearRect ( 0 , 0 , 720 , 540 );
    		}
    		var hr= 540/210,wr=720/280, room=5,x,y,w,h;
			for (i = 0; i < comp.length; i++) {	
				x=(comp[i].x*wr-room>0)?comp[i].x*wr-room:0;
				y=(comp[i].y*hr-room)?comp[i].y*hr-room:0;
				w=(comp[i].width+wr*2*room<c2.width)?comp[i].width*wr+2*room:c2.width;
				h=(comp[i].height+wr*2*room<c2.height)?comp[i].height*hr+2*room:c2.height;
				x=Math.round(x);
				y=Math.round(y);
				w=Math.round(w);
				h=Math.round(h);
				var imgdata = ctx1.getImageData(x,y,w,h);
				manipulate(imgdata.data,w,h,9);
    			ctx2.putImageData(imgdata,x,y);		
			}
			setTimeout(blurFace,500);
						
}


function manipulate(data,w,h,r){
	var idx,idy,val;
	for(var p=0;p<3;p++){ // change to 4 for RGBA
		for(var i=0;i<h;i+=r){
			for(var j=0;j<w;j+=r){
				idx=(i*w+j)*4+p;
				val=data[idx];
				for(var k=0;k<r;k++){
					for(var l=0;l<r;l++){
						idy=idx+(k*w+l)*4;
						data[idy]=val;
					}
				}
			}
		}
	}
}