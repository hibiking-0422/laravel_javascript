class Mole {
    constructor(mazeSize) {
        this.mazeSize = mazeSize;
        this.startY = this.getRandomOdd(mazeSize);
        this.startX = this.getRandomOdd(mazeSize);
        this.currentY = this.startY;
        this.currentX = this.startX;
    }

    getRandomOdd(mazeSize) { //ランダムな奇数の値を取得
        while(1) {
            let num = Math.floor(Math.random() * (mazeSize - 1));
            if( num % 2 != 0) return num;
        };
    }

    digMazeField(mazeField) { //穴を掘る
        let digDirection;
        mazeField[this.startY][this.startX] = 2;    //スタート配置

        let i = 0;
        while(i < 10000) {
            let digY;
            let digX;
            let preDigY = 0;
            let preDigX = 0;
            i++;
            switch(digDirection = Math.floor(Math.random() * 4)) {
                case 0:
                    digY = -2;
                    preDigY = -1;
                    digX = 0;
                    break;
                case 1:
                    digY = 0;
                    digX = 2;
                    preDigX = 1;
                    break;
                case 2:
                    digY = 2;
                    preDigY = 1;
                    digX = 0;
                    break;
                case 3:
                    digY = 0;
                    digX = -2;
                    preDigX = -1;
                    break;
            }

            if(this.currentY + digY > 0 && this.currentY + digY < mazeSize - 1 && this.currentX + digX > 0 && this.currentX + digX < mazeSize - 1) {
                if(mazeField[this.currentY + digY][this.currentX + digX] == 0) {
                    mazeField[this.currentY + digY][this.currentX + digX] = 1;
                    mazeField[this.currentY + preDigY][this.currentX + preDigX] = 1;
                    this.currentY += digY;
                    this.currentX += digX;
                }else {
                    do {
                        this.currentY = this.getRandomOdd(this.mazeSize);
                        this.currentX = this.getRandomOdd(this.mazeSize);
                    }while(mazeField[this.currentY][this.currentX] != 1)
                }
            }
        }
        return mazeField;
    }

}

let createMazeField = mazeSize => { //迷路の配列を全て0にして生成
    mazeField = new Array(mazeSize);
    for(let i = 0; i < mazeSize; i++) {
        mazeField[i] = new Array(mazeSize).fill(0);
    }
    return mazeField
}

let mazeSize = 21;
let mole = new Mole(mazeSize);
mazeField = createMazeField(mazeSize);

console.log(mole);
console.log(mazeField);
console.log(mole.digMazeField(mazeField));

//以下canvas描写

//heroオブジェクト生成
/*
var hero = new Object();
hero.img = new Image();
hero.img.src = './image/hero.jpg';
hero.move  = 0;
hero.moveDistance = 36;
hero.y = hero.moveDistance;
hero.x = hero.moveDistance;
hero.moveSpeed = 3;
*/

class Character {
    constructor(img){
        //キャラクターの移動設定
        this.move = 0;
        this.moveDistance = 36;
        this.y = this.moveDistance;
        this.x = this.moveDistance;
        this.moveSpeed = 3;
        //キャラクターの画像設定
        this.img = new Image();
        this.img.src = img;
        this.width = 30;
        this.height = 30;
    }
} 



//キーオブジェクト生成
var key = new Object;
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

//canvas生成

mazeBoxSize = 36;

/*
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = mazeSize * mazeBoxSize;
canvas.height = mazeSize * mazeBoxSize;
*/

//グローバル変数
let canvas;
let ctx;
var test = new Image();
test.src = "./image/hero.jpg";


class GameMain {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        canvas = document.getElementById('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx = canvas.getContext('2d');
    }
    
    add(character) {
        ctx.drawImage(character.img, 100,100);
        ctx.fillRect(30,30,60,60);
        console.log(character.img);
    }
}

let hero = new Character('./image/hero.jpg');
let gameMain = new GameMain(mazeSize * mazeBoxSize, mazeSize * mazeBoxSize);

function main() {
    gameMain.add(hero);
}
addEventListener('load', main(), false);

function  drawBall() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(let i = 0; i < mazeSize; i++) {
        for(let j = 0; j < mazeSize; j++){
            if(mazeField[i][j] == 0){
                ctx.fillStyle="black"; 
            }else if(mazeField[i][j] == 2){
                ctx.fillStyle="red";
            }else {
                ctx.fillStyle="white"; 
            }
            ctx.fillRect(j * mazeBoxSize, i * mazeBoxSize, (j * mazeBoxSize) + mazeBoxSize, (i * mazeBoxSize) + mazeBoxSize);
        }
    }


    addEventListener("keydown", keyDownFunc, false);
    addEventListener("keyup", keyUpFunc, false);

    if(hero.move === 0) { //キーが入力されているとき、移動。
        var y = hero.y / hero.moveDistance;
        var x = hero.x / hero.moveDistance;
            
            if(key.left === true) {
                if(x > 0) {　//当たり判定
                    x--;
                    if(mazeField[y][x] === 1) {
                        key.push = 'left';
                        hero.move = hero.moveDistance;
                    }
                }
            }

            if(key.up === true) {
                if(y > 0) {　//当たり判定
                    y--;
                    if(mazeField[y][x] === 1) {
                    key.push = 'up';
                    hero.move = hero.moveDistance;
                    }
                }
            }

            if(key.right === true) {
                if(x < (mazeSize - 1)) {　//当たり判定
                    x++;
                    if(mazeField[y][x] === 1) {
                        key.push = 'right';
                        hero.move = hero.moveDistance;
                    }
                }
            }

            if(key.down === true) {
                if(y < (mazeSize - 1)) {　//当たり判定
                    y++;
                    if(mazeField[y][x] === 1) {
                        key.push = 'down';
                        hero.move = hero.moveDistance;
                    }
                }
            }
    }

    if(hero.move > 0) { //hero.moveの値が0になるまで(次のマスに付くまで)移動を繰り返す。
        hero.move -= hero.moveSpeed;
        if(key.push === 'left') hero.x -= hero.moveSpeed;
        if(key.push === 'up') hero.y -= hero.moveSpeed;
        if(key.push === 'right') hero.x += hero.moveSpeed;
        if(key.push === 'down') hero.y += hero.moveSpeed;
    }

    ctx.drawImage( hero.img, hero.x, hero.y );
    window.requestAnimationFrame(drawBall);
}

function keyDownFunc(event) {
    var key_code = event.keyCode;
    if(key_code === 37) key.left = true;
    if(key_code === 38) key.up = true;
    if(key_code === 39) key.right = true;
    if(key_code === 40) key.down = true;
    event.preventDefault();
}

function keyUpFunc(event) {
    var key_code = event.keyCode;
	if(key_code === 37) key.left = false;
	if(key_code === 38) key.up = false;
	if(key_code === 39) key.right = false;
	if(key_code === 40) key.down = false;
}


// setIntervalを使う方法
function sleep(waitSec) {
 
    // 経過時間（秒）
    var spanedSec = 0;
 
    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {
 
        spanedSec++;
 
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {
 
            // タイマー停止
            clearInterval(id);
        }
    }, 1000);
 
}



//drawBall();