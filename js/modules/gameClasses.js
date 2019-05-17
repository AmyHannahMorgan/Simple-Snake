export class SnakePiece {
  constructor(width, height, posX, posY, movX, movY, head, neighbor, resolution) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
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
      this.pos.x = this.neighbor.pos.x;
      this.pos.y = this.neighbor.pos.y;
    }
  }

  move(movX, movY) {
    if (this.head) {
      switch (movY) {
        case 1:
          if (this.movY != -1) {
            this.movY = 1;
          }
          break;
        case -1:
          if (this.movY != 1) {
            this.movY = -1
          }
          break;
        case 0:
          this.movY = 0
          break;
      }
      switch (movX) {
        case 1:
          if (this.movX != -1) {
            this.movX = 1
          }
          break;
        case -1:
          if (this.movX != 1) {
            this.movX = -1;
          }
          break;
        case 0:
          this.movX = 0
          break;
      }
    }
  }

  update(ctx, color, tail) {
    if (this.head) {
      this.pos.x += this.movX * this.resolution;
      this.pos.y += this.movY * this.resolution;
      // ctx.fillStyle = color;
      // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
      let rads = this.getRads([this.movX, this.movY]);
      let x = this.pos.x + (this.resolution / 2);
      let y = this.pos.y + (this.resolution / 2);

      ctx.translate(x, y);
      ctx.rotate(rads);
      ctx.drawImage(color, 0 - (this.resolution / 2), 0 -(this.resolution / 2), this.width, this.height);
      ctx.rotate(-rads);
      ctx.translate(-x, -y);
    }
    else if (tail) {
      let x = this.pos.x + (this.resolution / 2);
      let y = this.pos.y + (this.resolution / 2);
      let relX = (this.neighbor.pos.x - this.pos.x) / this.resolution;
      let relY = (this.neighbor.pos.y - this.pos.y) / this.resolution;
      let rads = this.getRads([relX, relY]);
      console.log({relX, relY});
      console.log(rads);

      ctx.translate(x, y);
      ctx.rotate(rads);
      ctx.drawImage(color, 0 - (this.resolution / 2), 0 -(this.resolution / 2), this.width, this.height);
      ctx.rotate(-rads);
      ctx.translate(-x, -y);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  getRads(mov) {
    switch (mov.join(' ')) {
      case '0 -1':
        return 0;
        break;
      case '1 0':
        return 90 * Math.PI / 180;
        break;
      case '0 1':
        return 180 * Math.PI / 180;
        break;
      case '-1 0':
        return 270 * Math.PI / 180;
        break;
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

  update(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

export class PossiblePos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
