const canvas=document.getElementById("programCanvas"),ctx=canvas.getContext("2d"),canImg=ctx.createImageData(canvas.width,canvas.height);let camX=0,camY=-2,camZ=0,camXRot=0,camYRot=0,camZRot=0,plusX=[1,0,0],plusY=[0,1,0],plusZ=[0,0,1],scale=canvas.width;const clipPlane=.01;let keys=[];function processPoint($,t,c){let a=plusX[0]*($-camX)+plusY[0]*(t-camY)+plusZ[0]*(c-camZ),s;return[a,plusX[1]*($-camX)+plusY[1]*(t-camY)+plusZ[1]*(c-camZ),plusX[2]*($-camX)+plusY[2]*(t-camY)+plusZ[2]*(c-camZ)]}function triangle($,t,c){$[0]>t[0]&&([$,t]=[t,$]),t[0]>c[0]&&([t,c]=[c,t]),$[0]>t[0]&&([$,t]=[t,$]),t[1],$[1],t[0],$[0],t[2],$[2],t[0],$[0]}function shape($,t){let c=processPoint($[0],$[1],$[2]);c[2]>.01&&(ctx.fillStyle=t,ctx.beginPath(),ctx.arc(c[0]/c[2]*scale+canvas.width/2,c[1]/c[2]*scale+canvas.height/2,scale/10/c[2],0,2*Math.PI),ctx.fill())}let points=[[1,1,1,"#ffff00"],[-1,1,1,"#00ff00"],[1,-1,1,"#ff0000"],[-1,-1,1,"#000000"],[1,1,3,"#ffffff"],[-1,1,3,"#00ffff"],[1,-1,3,"#ff00ff"],[-1,-1,3,"#0000ff"],],colors=["#ffff00","#00ff00","#ff0000","#000000","#ffffff","#00ffff","#ff00ff","#0000ff",];function rtd($){return $/2/Math.PI*360}function dtr($){return $/360*2*Math.PI}function dsin($){return Math.sin($/360*2*Math.PI)}function dcos($){return Math.cos($/360*2*Math.PI)}function frame(){plusX=[dcos(camYRot),0,-dsin(camYRot)],plusY=[0,1,0],plusZ=[dsin(camYRot),0,dcos(camYRot)],ctx.fillStyle="lightgray",ctx.fillRect(0,0,canvas.width,canvas.height),keys[68]&&(camX+=.125*plusX[0],camZ-=.125*plusX[2]),keys[65]&&(camX-=.125*plusX[0],camZ+=.125*plusX[2]),keys[87]&&(camX-=.125*plusZ[0],camZ+=.125*plusZ[2]),keys[83]&&(camX+=.125*plusZ[0],camZ-=.125*plusZ[2]),keys[69]&&(camY-=.125),keys[81]&&(camY+=.125),keys[37]&&(camYRot+=1),keys[39]&&(camYRot-=1);let $=[];for(let t=0;t<points.length;t++)$.push(processPoint(points[t][0],points[t][1],points[t][2]).concat(points[t][3]));$.sort(($,t)=>t[2]-$[2]);for(let c=0;c<$.length;c++)ctx.fillStyle=$[c][3],$[c][2]>.01&&(ctx.beginPath(),ctx.arc($[c][0]/$[c][2]*scale+canvas.width/2,$[c][1]/$[c][2]*scale+canvas.height/2,50/$[c][2],0,2*Math.PI),ctx.fill());requestAnimationFrame(frame)}requestAnimationFrame(frame),document.addEventListener("keydown",$=>{keys[$.keyCode]=!0}),document.addEventListener("keyup",$=>{keys[$.keyCode]=!1});