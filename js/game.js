import {SnakePiece} from './modules/gameClasses.js';

const resolution = 10;
const snakeCont = {
  canvas : document.getElementById('snake'),
  snakeArray : [],
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

  }
}

document.onload = snakeCont.setup();

function gameStart() {
  console.log('starting game');
}

function keyLogic(e) {
  if (e.preventDefaulted) {
    return;
  }

  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      snakeCont.snakeHead.move(0, 1);
      break;
    case 'KeyS':
    case 'ArrowDown':
      snakeCont.snakeHead.move(0, -1);
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
