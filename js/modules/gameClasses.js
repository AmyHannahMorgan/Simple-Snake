export class SnakePiece {
  constructor(width, height, posX, posY, movX, movY, head, neighbor) {
    this.width = width;
    this.height = height;
    this.pos = {
      x : posX,
      y : posY
    };
    this.movX = movX;
    this.movY = movY;
    this.head = head;
    this.neighbor = neighbor;
  }

  getNeighborMov() {
    if(!this.head) {

    }
  }

  move(movX, movY) {
    if (this.head) {
      if (movX === 0) {
        switch (movY) {
          case 1:
            console.log('moving on up');
            break;
          case -1:
            console.log('moving on down');
            break;
        }
      }
      else {
        switch (movX) {
          case 1:
            console.log('moving on right');
            break;
          case -1:
            console.log('moving on left');
            break;
        }
      }
    }
  }
}

export class Apple {
  constructor(width, height, posX, posY, score) {
    this.width = width;
    this.height = height;
    this.pos = {
      x : posX,
      y : posY
    };
    this.score = score;
  }
}
