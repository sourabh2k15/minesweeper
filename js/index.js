var picasso = _('picasso');
var ctx     = picasso.getContext('2d');
var w       = picasso.width;
var h       = picasso.height;
var s       = 6;
var sw      = w/10;
var sh      = sw;
var m       = 9;
var marr    = [];
var marrX   = [];marrY  = [];
var px= sw*2,py = sw*0.2;
var gameboard = [];

$(document).ready(function(){
    console.log("app ready to use!!");
    drawboard();
    generateminer();
    plotmines();
    plothints(m);
});

var bx = sw,by = sw,bw = sw*0.9,bh = sw*0.9;

function drawboard(){
    for(var i = 0;i<s;i++){
        for(var j=0;j<s;j++){
            drawrect(px+bx*i,py+by*j,bw,bh,'yellow',ctx);
            gameboard[i*s+j] = 0;
        }
    }
}

function plothints(a){
    var z,zX,zY; 
    for(var k=0;k<a;k++){
        z = marr[k];
        zX = z%s; zY = (z-z%s)/s;
        
        if(zX-1>-1&&zX+1<s&&zY-1>-1&&zY+1<s){
                assignval(zX,zY-1);
                assignval(zX,zY+1);
                assignval(zX+1,zY);
                assignval(zX+1,zY-1);
                assignval(zX+1,zY+1);
                assignval(zX-1,zY); 
                assignval(zX-1,zY-1);
                assignval(zX-1,zY+1);
        }
        else if(zX-1==-1&&zY-1==-1){
            assignval(zX+1,zY);
            assignval(zX+1,zY+1);
            assignval(zX,zY+1);
        }
        else if(zX-1==-1&&zY+1==s){
            assignval(zX+1,zY);
            assignval(zX+1,zY-1);
            assignval(zX,zY-1);
        }
        else if(zX+1==s&&zY+1==s){
            assignval(zX-1,zY-1);
            assignval(zX,zY-1);
            assignval(zX-1,zY);
        }
        else if(zX+1==s&&zY-1==-1){
            assignval(zX,zY+1);
            assignval(zX-1,zY+1);
            assignval(zX-1,zY);
        }
        else if(zX-1==-1){
            assignval(zX,zY-1);
            assignval(zX,zY+1);
            assignval(zX+1,zY-1);
            assignval(zX+1,zY);
            assignval(zX+1,zY+1);
        }
        else if(zX+1==s){
            console.log(zX+" "+zY+" "+marr[k]);
            assignval(zX,zY-1);
            assignval(zX,zY+1);
            assignval(zX-1,zY-1);
            assignval(zX-1,zY);
            assignval(zX-1,zY+1);
        }
        else if(zY-1==-1){
            assignval(zX+1,zY);
            assignval(zX-1,zY);
            assignval(zX-1,zY+1);
            assignval(zX,zY+1);
            assignval(zX+1,zY+1);
        }
        else{
            assignval(zX+1,zY);
            assignval(zX-1,zY);
            assignval(zX+1,zY-1);
            assignval(zX,zY-1);
            assignval(zX-1,zY-1);
        }
    }
    plotnums();
}

function plotnums(){
    ctx.fillStyle = '#9C27B0';
    ctx.font = '1.2em  cursive';
    for(var k=0;k<s;k++){
        for(l=0;l<s;l++){
            ctx.fillText(gameboard[l+k*s],px+bx*l+bw/2,py+by*k+bh/2);
        }
    }
}

function assignval(x,y){
    if(gameboard[x+s*y]!=-1){  gameboard[x+s*y]++;}
}

function checkmines(){
    for(var k=0;k<marr.length;k++){
        console.log(gameboard[marr[k]]);
    }
}

function plotmines(){
    var x,y;
    for(var l=0;l<m;l++){
        x = marr[l]%s;
        y =(marr[l]-marr[l]%s)/s;
        drawrect(px+bx*x,py+by*y,bw,bh,'red',ctx);
    }
}

function  generateminer(){
    var t=0;
    for(var k=0;k<m;k++){
        t = generateunique(marr);
        if(marr.indexOf(t)==-1){
            marr[marr.length] = t;
            gameboard[t] = -1;
        }
        else marr[marr.length] = generateunique(marr);
    }
}

function generateunique(arr){
    var a = generaterand(1,s*s-1);
    while(arr.indexOf(a)>0) a = generaterand(1,s*s-1);    
    return a;
}

function generaterand(l,u){
    return Math.floor(l+Math.random()*(u-l));
}

function drawrect(sX,sY,w,h,color,ctx){
    ctx.fillStyle = color;
    ctx.fillRect(sX,sY,w,h);
}

function _(el){
    return document.getElementById(el);
}