import {SnakePiece, Apple} from './modules/gameClasses.js';

const resolution = 10;
const frameRate = 30;
const perAppleScore = 100
const snakeCont = {
  gameStarted : false,
  gameOver : false,
  canvas : document.getElementById('snake'),
  snakeArray : [],
  currApple : null,
  score : 0,
  setup : function() {
    this.canvas.height = window.innerHeight / 2;
    this.canvas.width = window.innerHeight / 2;

    this.ctx = this.canvas.getContext('2d');

    let dim = 1 * resolution,
    posX = this.canvas.width / 2 - (resolution / 2),
    posY = this.canvas.height / 2 - (resolution / 2);
    this.snakeArray.push(new SnakePiece(dim, dim, posX, posY, 0, 0, true, null));
    this.snakeHead = this.snakeArray[0];

    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Press Space To Start', this.canvas.width / 2, this.canvas.height / 2);
    window.addEventListener('keydown', function(e){
      keyLogic(e);
    });
  },
  logic : function() {
    let head = this.snakeHead;
    let apple = this.currApple;

    let nextHeadL = head.pos.x + head.movX,
    nextHeadR = nextHeadL + resolution,
    nextHeadT = head.pos.y + head.movY,
    nextHeadB = nextHeadT + resolution;

    let appleL = apple.pos.x,
    appleR = appleL + resolution,
    appleT = apple.pos.y,
    appleB = appleT + resolution;
    if ((nextHeadL < 0) || (nextHeadR > this.canvas.width) ||
    (nextHeadT < 0) || (nextHeadB > this.canvas.height)) {
      gameOver();
    }

    if ((nextHeadR > appleL && nextHeadL < appleR && nextHeadT == appleT && nextHeadB == appleB) ||
    (nextHeadL < appleR && nextHeadR > appleL && nextHeadT == appleT && nextHeadB == appleB) ||
    (nextHeadT < appleB && nextHeadB > appleT && nextHeadL == appleL && nextHeadR == appleR) ||
    (nextHeadB > appleT && nextHeadT < appleB && nextHeadL == appleL && nextHeadR == appleR)) {
      this.score + apple.score;
      this.spawnApple();
    }
  },
  clear : function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  update : function() {
    for(let i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray[i].update(this.ctx, 'black');
    }
    this.currApple.update(this.ctx, 'red');
    setTimeout(() => {this.logic();
      if (!this.gameOver) {
        this.clear();
        this.update();
      }}, 1000 / frameRate);
  },
  spawnApple : function() {
    let x = RNG(0, Math.round(this.canvas.width - resolution)),
    y = RNG(0, Math.round(this.canvas.height - resolution));
    console.log(x, y);
    this.currApple = new Apple(1 * resolution, 1 * resolution, x, y, perAppleScore);
  }
}

document.onload = snakeCont.setup();

function gameStart() {
  if (!snakeCont.gameStarted) {
    snakeCont.clear();
    snakeCont.snakeHead.movX = 1;
    snakeCont.spawnApple();
    snakeCont.update();
    snakeCont.gameStarted = true;
  }
}

function gameOver() {
  snakeCont.gameOver = true;
  console.log('GAME OVER');
}

function keyLogic(e) {
  if (e.preventDefaulted) {
    return;
  }

  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      snakeCont.snakeHead.move(0, -1);
      break;
    case 'KeyS':
    case 'ArrowDown':
      snakeCont.snakeHead.move(0, 1);
      break;
    case 'KeyA':
    case 'ArrowLeft':
      snakeCont.snakeHead.move(-1, 0);
      break;
    case 'KeyD':
    case 'ArrowRight':
      snakeCont.snakeHead.move(1, 0);
      break;
    case 'Space':
      gameStart();
      break;
  }
}

function RNG(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
