import {SnakePiece, Apple, PossiblePos} from './modules/gameClasses.js';

const resolution = 10;
const frameRate = 15;
const perAppleScore = 100
const snakeCont = {
  gameStarted : false,
  gameOver : false,
  canvas : document.getElementById('snake'),
  snakeArray : [],
  currApple : null,
  score : 0,
  scoreElem : document.getElementById('score'),
  setup : function() {
    this.canvas.height = resolution * Math.round((window.innerHeight / 2) / resolution);
    this.canvas.width = resolution * Math.round((window.innerHeight / 2) / resolution);
    console.log(this.canvas.width, this.canvas.height);

    this.possiblePositions = [];
    console.log(this.canvas.height / resolution, this.canvas.width / resolution);
    for(let y = 0; y < this.canvas.height / resolution; y++) {
      for(let x = 0; x < this.canvas.width / resolution; x++) {
        this.possiblePositions.push(new PossiblePos(x*resolution, y*resolution))
      }
    }
    console.log(this.possiblePositions);

    this.ctx = this.canvas.getContext('2d');

    let dim = 1 * resolution,
    posX = this.canvas.width / 2 - (resolution / 2),
    posY = this.canvas.height / 2 - (resolution / 2);
    this.snakeArray.push(new SnakePiece(dim, dim, posX, posY, 0, 0, true, null, resolution));
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
    for(let i = this.snakeArray.length - 1; i > 0; i--) {
      this.snakeArray[i].getNeighborMov();
    }

    let head = this.snakeHead;
    let apple = this.currApple;

    let nextHeadL = head.pos.x + (head.movX*resolution),
    nextHeadR = nextHeadL + resolution,
    nextHeadT = head.pos.y + (head.movY*resolution),
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
      this.score += apple.score;
      this.spawnApple();
      this.addPiece();
    }

    for(let i = 1; i < this.snakeArray.length; i++) {
      let segment = this.snakeArray[i];
      let segmentL = segment.pos.x,
      segmentR = segmentL + resolution,
      segmentT = segment.pos.y,
      segmentB = segmentT + resolution;

      if ((nextHeadR > segmentL && nextHeadL < segmentR && nextHeadT == segmentT && nextHeadB == segmentB) ||
      (nextHeadL < segmentR && nextHeadR > segmentL && nextHeadT == segmentT && nextHeadB == segmentB) ||
      (nextHeadT < segmentB && nextHeadB > segmentT && nextHeadL == segmentL && nextHeadR == segmentR) ||
      (nextHeadB > segmentT && nextHeadT < segmentB && nextHeadL == segmentL && nextHeadR == segmentR)) {
        gameOver();
      }
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
    this.scoreElem.innerHTML = `Score: ${this.score}`;
    setTimeout(() => {this.logic();
      if (!this.gameOver) {
        this.clear();
        this.update();
      }}, 1000 / frameRate);
  },
  spawnApple : function() {
    let pos = this.possiblePositions[RNG(0, this.possiblePositions.length - 1)];
    console.log(pos);
    console.log(pos.x, pos.y);
    this.currApple = new Apple(1 * resolution, 1 * resolution, pos.x, pos.y, perAppleScore);
  },
  addPiece : function() {
    let lastPiece = this.snakeArray[this.snakeArray.length - 1];
    console.log(lastPiece);
    let y = lastPiece.pos.y,
    x = lastPiece.pos.x;
    switch (lastPiece.movX) {
      case 1:
        x = lastPiece.pos.x - resolution;
        break;
      case -1:
        x = lastPiece.pos.x + resolution;
        break;
    }
    switch (lastPiece.movY) {
      case 1:
        y = lastPiece.pos.y - resolution;
        break;
      case -1:
        y = lastPiece.pos.y + resolution
        break;
    }
    let dim = 1 * resolution;
    let newPiece = new SnakePiece(dim, dim, x, y, 0, 0, false, lastPiece, resolution);
    this.snakeArray.push(newPiece);
    console.log(this.snakeArray);
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
