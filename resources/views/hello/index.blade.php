<script>

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
        let digY;
        let digX;
        let preDigY = 0;
        let preDigX = 0;

        mazeField[this.startY][this.startX] = 2;    //スタート配置

        while(1) {
            switch(digDirection = Math.floor(Math.random() * 4)) {
                case 0:
                    digY = -2;
                    digX = 0;
                    break;
                case 1:
                    digY = 0;
                    digX = 2;
                    break;
                case 2:
                    digY = 2;
                    digX = 0;
                    break;
                case 3:
                    digY = 0;
                    digX = -2;
                    break;
            }

            if(this.currentY + digY > 0 && this.currentY + digY < mazeSize - 1 && this.currentX + digX > 0 && this.currentX + digX < mazeSize - 1) {
                if(mazeField[this.currentY + digY][this.currentX + digX] == 0) {
                    mazeField[this.currentY + digY][this.currentX + digX] = 1;
                    this.currentY += digY;
                    this.currentX += digX;
                    break;
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

let mazeSize = 9;
let mole = new Mole(mazeSize);
mazeField = createMazeField(mazeSize);

console.log(mole);
console.log(mazeField);
console.log(mole.digMazeField(mazeField));
</script>