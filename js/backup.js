var s       = 8;
var m       = 10;
var marr    = [];
var marrX   = [];marrY  = [];
var gameboard = [];
var end = 0;
var dwidth , dheight;
var counter = 0;

$(document).ready(function(){
    $('.header').hide();
    drawboard();
    generateminer();
    plothints();
    showboard();
    preparescreen();
    
    $('.box').click(function(){
        counter = 0;
        if(end ==0 ) reveal(this.id);
    });
});

function preparescreen(){
    dwidth = screen.availWidth;
    dheight = screen.availHeight;
    console.log("device is "+dwidth+" px wide and "+dheight+" px tall");
    sw = sh = Math.floor(Math.sqrt(Math.floor((dwidth*dheight)/(s*s))));
    $('.box').css('width',sw/3+'px');
    $('.box').css('height',sh/3+'px');
    $('.box').css('padding',sh/7+'px');
}

function drawboard(){
    var html = '';
    for(var i = 0;i<s;i++){
        html+="<div class='row'>"
        for(var j=0;j<s;j++){
            html+="<div id="+(i*s+j)+" class='box'></div>"
            gameboard[i*s+j] = 0;
        }
        html+="</div>";
    }
    _('board').innerHTML = html;
}
function  generateminer(){
    var t=0;
    for(var k=0;k<m;k++){
        t = generateunique(marr);
        marr[marr.length] = t;
        gameboard[t] = -1;
    }
}
function plothints(){
    var nbrs = [];
    for(var i=0;i<marr.length;i++){
        nbrs = preparearr(marr[i]);
        for(var k=0;k<nbrs.length;k++){
            if(nbrs[k]!=-2&&gameboard[nbrs[k]]!=-1){ gameboard[nbrs[k]]++; }
        }
        nbrs = [];
    }
}



function reveal(id){    
    if(gameboard[id]==-1){ console.log("mine detonated, game over!!"); plotmines();}
    else  flipit(id);
}
function flipit(id){
        setTimeout(function(){
            if(!$('#'+id).hasClass('flip')){
                $('#'+id).addClass('flip');
                $('#'+id).css('background','green');
                if(gameboard[id]>0) $('#'+id).html(gameboard[id]);
                else  fliprecursive(id);
            }
        },0);
}
function fliprecursive(k){
    // I need help with this logic of revealing the numbers one by  one , the max call stack size exceed err occurs if I dont use this counter thing //  :(
        counter++;
        if(counter<10){
            var nbrs = preparearr(k);
            console.log(nbrs );
            for(var l=0;l<nbrs.length;l++){
                if(nbrs[l]!=-2){ 
                    $('#'+nbrs[l]).css('background','green');
                    flipit(nbrs[l]);
                } 
            }
        }
}

// small and cute helper functions :) ! 

function generateunique(arr){
    var a = generaterand(0,s*s-1);
    while(arr.indexOf(a)>0) a = generaterand(0,s*s-1);    
    return a;
}
function generaterand(l,u){
    return Math.floor(l+Math.random()*(u-l));
}
function preparearr(k){
    k = parseInt(k);
    var tarr = [k-s-1,k-s,k-s+1,k-1,k+1,k+s-1,k+s,k+s+1];
    for(var j=0;j<tarr.length;j++){
        if(tarr[j]<0) tarr[j] = -2;
        if(getX(k)==0){ tarr[0]= tarr[3]= tarr[5] = -2;}
        if(getX(k)==(s-1)){ tarr[2] = tarr[4] = tarr[7] = -2;}
        if(getY(k)==(s-1)){ tarr[5] = tarr[6] = tarr[7] = -2;}
    }
    return tarr;
}
function getKey(l,k){ return l+k*s;}
function getY(key){  return (key-key%s)/s; }
function getX(key){  return  key%s; }
function _(el){
    return document.getElementById(el);
}

// debugger functions 
function checkmines(){
    for(var k=0;k<marr.length;k++){
        console.log(gameboard[marr[k]]);
    }
}
function plotnums(){
    for(var k=0;k<s;k++){
        for(l=0;l<s;l++){
            $('#'+(k*s+l)).html(gameboard[l+k*s]);
        }
    }
}
function plotmines(){
    end = 1;
    for(var l=0;l<m;l++){
        $('#'+marr[l]).css('background','red');
        $('#'+marr[l]).html("<img class='smiley' src='images/sad.png'>");
    }
}
function showboard(){
   console.log(marr);
    console.log(gameboard);
}
function revealnbrs(id){
    console.log(id);
    var nbrs = preparearr(id);
    console.log(nbrs);
    for(var k=0;k<nbrs.length;k++){
        if(nbrs[k]!=-2) $('#'+nbrs[k]).css('background','green');
    }
}
