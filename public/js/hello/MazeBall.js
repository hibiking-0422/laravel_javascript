class Maze { //迷路
    constructor(mazeSize) {
        this.mazeSize = mazeSize;
        this.startY = this.getRandomOdd(this.mazeSize);
        this.startX = this.getRandomOdd(this.mazeSize);
        this.currentY = this.startY;
        this.currentX = this.startX;
        this.initializeMazeField(this.mazeSize);
        this.digMazeField(this.mazeField);
    }

    getRandomOdd(mazeSize) { //ランダムな奇数の値を取得
        while(1) {
            let num = Math.floor(Math.random() * (mazeSize - 1));
            if( num % 2 != 0) return num;
        };
    }

    initializeMazeField(mazeSize) {
        var mazeField = new Array(mazeSize);
        for(let i = 0; i < mazeSize; i++) {
            mazeField[i] = new Array(mazeSize).fill(0);
        }
        this.mazeField = mazeField;
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
        this.mazeField = mazeField;
    }
}

class Character { //キャラクター系のスーパークラス
    constructor(img, mazeBoxSize, xPosition, yPosotion){
        //キャラクターの移動設定
        this.move = 0;
        this.moveDistance = mazeBoxSize;
        this.y = this.moveDistance * yPosotion;
        this.x = this.moveDistance * xPosition;
        this.moveSpeed = mazeBoxSize / 10;
        //キャラクターの画像設定
        this.img = new Image();
        this.img.src = img;
        this.width = mazeBoxSize;
        this.height = mazeBoxSize;
    }
} 

class Player extends Character { //操作キャラクター
    constructor(img,mazeBoxSize, xPosition, yPosotion, palyerName) {
        super(img,mazeBoxSize, xPosition, yPosotion);
        this.palyerName = palyerName;
    }

    movePlayer(mazeField) {
        input.push_key();
        if(this.move === 0) {
            var x = this.x / this.moveDistance;
            var y = this.y / this.moveDistance;

            if(input.left === true) {
                    x--;
                    if(mazeField[y][x] === 1) {
                        this.move = this.moveDistance;
                        input.push = 'left';
                }
            }

            if(input.up === true) {
                    y--;
                    if(mazeField[y][x] === 1) {
                        this.move = this.moveDistance;
                        input.push = 'up';
                    }
            }

            if(input.right === true) {
                    x++;
                    if(mazeField[y][x] === 1) {
                        this.move = this.moveDistance;
                        input.push = 'right';
                    }
            }

            if(input.down === true) {
                    y++;
                    if(mazeField[y][x] === 1) {
                        this.move = this.moveDistance;
                        input.push = 'down';
                    }
            }
        }

        if(this.move > 0) {
            this.move -= this.moveSpeed;
            if(input.push === 'left') this.x -= this.moveSpeed;
            if(input.push === 'up')  this.y -= this.moveSpeed;
            if(input.push === 'right') this.x += this.moveSpeed;
            if(input.push === 'down') this.y += this.moveSpeed;
        }
    }
}

class GameMain { //ゲームのメイン処理
    constructor(width, height) {
        this.width = width;
        this.height = height;

        canvas = document.getElementById('canvas');
        canvas.width = this.width;
        canvas.height = this.height * 1.5;
        ctx = canvas.getContext('2d');
    }
    
    add(character) {
        ctx.drawImage(character.img, character.x, character.y, character.width, character.height);
    }

    drawMazeField(mazeField) {
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
    }
}

class Input { //キー入力処理
    constructor() {
        this.up = false;
        this.left= false;
        this.down = false;
        this.right = false;
        this.push = "";
    }

    push_key() {
        addEventListener("keydown", () => {
            const key_code = event.keyCode;
            if(key_code === 37) this.left = true;
            if(key_code === 38) this.up = true;
            if(key_code === 39) this.right = true;
            if(key_code === 40) this.down = true;
            event.preventDefault(); //方向キーでブラウザのスクロールを止められる(みたい)
        }, false);

        addEventListener("keyup", () => {
            const key_code = event.keyCode;
            if(key_code === 37) this.left = false;
            if(key_code === 38) this.up = false;
            if(key_code === 39) this.right = false;
            if(key_code === 40) this.down = false;
        }, false);
    }
}

function main() { //メイン関数
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    game.drawMazeField(maze.mazeField);

    game.add(player);
    player.movePlayer(maze.mazeField);
    
    ctx.fillStyle = "white";
    ctx.fillRect(mazeBoxSize, mazeBoxSize * mazeSize,mazeBoxSize * (mazeSize - 2), canvas.height - (mazeBoxSize * (mazeSize + 1)));
    
    
    ctx.fillStyle="black";
    ctx.font = "20px serif";

    let p = 0;
    for(let i = num - 10; i < num; i++) {
        
        ctx.fillText(text[i], mazeBoxSize, mazeBoxSize * (mazeSize + 1) + p * 23);
        p++;
    }
    //text.push(num++);

    requestAnimationFrame(main);
}

//canvas
let canvas;
let ctx;
//迷路
let mazeSize = 21;
let mazeBoxSize = 25; //2,5,10の倍数
let maze = new Maze(mazeSize);
console.log(maze);
//ゲーム
let player = new Player('./image/hero.jpg', mazeBoxSize,1, 1, "hibiking");
let game = new GameMain(mazeSize * mazeBoxSize, mazeSize * mazeBoxSize);
let input = new Input();

let num = 100;
let text = new Array(num);

for(let i = 0; i < num; i++) {
    text[i] = i;
}
addEventListener('load', main(), false);