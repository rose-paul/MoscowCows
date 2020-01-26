const Util = require('./util')

function MovingCow(data) {
    this.pos = data.pos;
    this.vel = data.vel;
    this.radius = data.radius;
    let img = new Image();
    data.cowType === "brown-left" ? img.src = "./images/cow.png" : img.src = "./images/001-cow.png"
    this.sprite = img;
}

MovingCow.prototype.draw = function(ctx) {

    ctx.drawImage(this.sprite, this.pos[0], this.pos[1])
    
}

MovingCow.prototype.move = function() {
  if (this.pos[0] > 990) {
    this.pos[0] = 0;
  } else if (this.pos[0] < 0) {
    this.pos[0] = 990;
  }
  if (this.pos[1] > 490) {
    this.pos[1] = 0;
  } else if (this.pos[1] < 0) {
    this.pos[1] = 490;
  }
  this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
  this.pos[1] = (this.pos[1] + this.vel[1]) % 500;
};

MovingCow.prototype.tramples = function(player) {
  const xDist = Math.abs(this.pos[0] - player.pos[0]);
  const yDist = Math.abs(this.pos[1] - player.pos[1]);
  const rDist = this.radius + player.radius;

  if (rDist > xDist && rDist > yDist) {
    return true;
  } else {
    return false;
  }
}



module.exports = MovingCow;