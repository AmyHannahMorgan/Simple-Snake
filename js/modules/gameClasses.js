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
