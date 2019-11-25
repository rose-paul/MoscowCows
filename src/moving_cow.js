const Util = require('./util')

function MovingCow(data) {
    this.pos = data.pos;
    this.vel = data.vel;
    this.radius = data.radius;
    this.color = data.color
    const img = new Image();
    img.src = '../images/cow.png';
    this.sprite = img;
    // this.vel = Util.randomVec(15);
}

MovingCow.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    this.sprite.addEventListener('load', e => {
        ctx.drawImage(this.sprite, 37, 71);
    })
}

MovingCow.prototype.move = function() {
  if (this.pos[0] > 1300) {
    this.pos[0] = 0;
  } else if (this.pos[0] < 0) {
    this.pos[0] = 1300;
  }
  if (this.pos[1] > 800) {
    this.pos[1] = 0;
  } else if (this.pos[1] < 0) {
    this.pos[1] = 800;
  }
  this.pos[0] = (this.pos[0] + this.vel[0]) % 1300;
  this.pos[1] = (this.pos[1] + this.vel[1]) % 800;
};



module.exports = MovingCow;