let contain = document.getElementById('contain');
let gameTitle = document.getElementById('game-title');
let stupidBird = document.getElementById('stupid-bird');
let banner = document.getElementById('banner');
let start = document.getElementById('start');
let replay = document.getElementById('replay');
let over = document.getElementById('game-over');
let bird = document.getElementById('bird');
let short = 70,long = 200,h,flag = true;
let move = 400; //用来计算管道移动
let speed = 1; //小鸟下降速度
let up = ["url(./img/up_bird0.png) no-repeat", "url(./img/up_bird1.png) no-repeat"];
let down = ["url(./img/down_bird0.png) no-repeat", "url(./img/down_bird1.png) no-repeat"];
let upL = 0;
downL = 0;
let flyDownInterval,flyWing;
let gameOver = true;
//生成管道
function gameMap() {
    let div = document.createElement('div');
    let top  = document.createElement('div');
    let bottom  = document.createElement('div');
    let topMod = document.createElement('div');
    let topPipe = document.createElement('div');
    let bottomPipe = document.createElement('div');
    let bottomMod = document.createElement('div');
    div.className = 'pipe-mod';
    top.className = 'top';
    bottom.className = 'bottom';
    topMod.className = 'top-mod';
    topPipe.className = 'top-pipe';
    bottomPipe.className = 'bottom-pipe';
    bottomMod.className = 'bottom-mod';
    //生成管道肯定是有长有短的，这样更随机使得上短还是下短。
    if(flag){
        h = Math.random()*short;
        topMod.style.height = h + 'px';
        bottomMod.style.height = 180 - h + 'px';
        flag = false;
    }else{
        h = Math.random()*long;
        topMod.style.height = h + 'px';
        bottomMod.style.height = 180 - h + 'px';
        flag = true;
    }
    top.style.left = move + 'px';
    bottom.style.left = move + 'px';
    move += 230;
    top.appendChild(topMod);
    top.appendChild(topPipe);
    bottom.appendChild(bottomPipe);
    bottom.appendChild(bottomMod);
    div.appendChild(top);
    div.appendChild(bottom);
    contain.appendChild(div);
}
//管道移动
function pipeMove(){
    let tops = document.getElementsByClassName('top');
    let bottoms = document.getElementsByClassName('bottom');
    for(let i=0;i<tops.length&&gameOver;i++){
        if(parseInt(tops[i].style.left) < -63){
            tops[i].parentNode.removeChild(tops[i]);
            if(Math.random() < 0.3){
                move = parseInt(tops[tops.length-1].style.left) + 160; 
            }else if(Math.random() >= 0.3 && Math.random() < 0.67){
                move = parseInt(tops[tops.length-1].style.left) + 220;
            }else{
                move = parseInt(tops[tops.length-1].style.left) + 280;
            }
            gameMap();
        }else{
            tops[i].style.left = parseInt(tops[i].style.left) - 1 + 'px';
            if(parseInt(tops[i].style.left) > -40 && parseInt(tops[i].style.left) < 57){
                if((parseInt(tops[i].childNodes[0].style.height) + 60) > parseInt(bird.style.top)){
                    contain.removeEventListener('click',flyUp);
                    contain.removeEventListener('touchMove',flyUp);
                    gameOver = false;
                    replay.className = 'show';
                    over.className = 'show';
                    replay.addEventListener('click',replaying);
                    replay.addEventListener('touchMove',replaying);
                }
            }
        }
    }
    for(let i=0;i<bottoms.length&&gameOver;i++){
        if(parseInt(bottoms[i].style.left) < -63){
            bottoms[i].parentNode.removeChild(bottoms[i]);
        }else{
            bottoms[i].style.left = parseInt(bottoms[i].style.left) - 1 + 'px';
              if(parseInt(bottoms[i].style.left) > -40 && parseInt(bottoms[i].style.left) < 57){
                if((parseInt(bottoms[i].childNodes[1].style.height) + 60) > (389 - parseInt(bird.style.top))){
                    contain.removeEventListener('click',flyUp);
                    contain.removeEventListener('touchMove',flyUp);
                    gameOver = false;
                    replay.className = 'show';
                    over.className = 'show';
                    replay.addEventListener('click',replaying);
                    replay.addEventListener('touchMove',replaying);
                }
            }
        }
    }
}
//自由落体
function fly(){
    bird.style.top = parseInt(bird.style.top) + speed++ + "px";
    if (bird.style.top < 0) {  
        speed = 2; //这里用于控制小鸟不要飞出界面
    }
    if (parseInt(bird.style.top) >= 395) {
        speed = 0;
        clearInterval(flyDownInterval); //一旦飞到地面，清除定时器
        clearInterval(flyWing); //清除翅膀摆动定时器
        gameOver = false;
        replay.className = 'show';
        over.className = 'show';
        replay.addEventListener('click',replaying);
        replay.addEventListener('touchMove',replaying);
    }
    if (speed > 10) {
        speed = 10;  //鸟的最大下落速度控制在12
    }
}
//翅膀震动
function wing(){
    if (speed > 0) {
        bird.style.background = down[downL++];
        if (downL==2) {downL = 0}
    }if (speed < 0) {
        bird.style.background = up[upL++];
        if (upL==2) {upL = 0}
    }
}
//上飞
function flyUp(){
    speed = -8;
}
//鸟出来吧
function birdFly(){
    bird.style.top = 200 + 'px';
    bird.className = 'show';
}
//开始游戏
function play(e) {
    e.stopPropagation();
    gameTitle.style.display = 'none';
    stupidBird.style.display = 'none';
    start.style.display = 'none';
    gameMap();
    gameMap();
    gameMap();
    gameMap();
    birdFly();
    contain.addEventListener('click',flyUp);
    contain.addEventListener('touchMove',flyUp);
    if(gameOver){
        setInterval(pipeMove,20);
    }
    flyDownInterval = setInterval(fly,40);
    flyWing = setInterval(wing,140);
}
function replaying(){
    window.location.href = "flyBird.html"; 
}
start.addEventListener('click',play);
start.addEventListener('touchMove',play);
