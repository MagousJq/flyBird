let gameMap = () => {
    let topMod = document.createElement('div');
    let topPipe = document.createElement('div');
    let bottomPipe = document.createElement('div');
    let bottomMod = document.createElement('div');
    topMod.className = 'down-mod';
    topPipe.className = 'down-pipe';
    bottomPipe.className = 'down-pipe';
    bottomMod.className = 'down-mod';
    topMod.style.height = Math.random()*10 + 'px';
    bottomMod.style.height = Math.random()*10 + 'px';
}