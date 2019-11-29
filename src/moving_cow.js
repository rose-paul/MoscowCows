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

    ctx.beginPath();
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1])
    
}

MovingCow.prototype.move = function() {
  if (this.pos[0] > 999) {
    this.pos[0] = 0;
  } else if (this.pos[0] < 0) {
    this.pos[0] = 999;
  }
  if (this.pos[1] > 480) {
    this.pos[1] = 0;
  } else if (this.pos[1] < 0) {
    this.pos[1] = 480;
  }
  this.pos[0] = (this.pos[0] + this.vel[0]) % 999;
  this.pos[1] = (this.pos[1] + this.vel[1]) % 480;
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