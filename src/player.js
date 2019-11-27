const Util = require('./util');
const MovingCow = require('./moving_cow')

function Player(data) {
    this.radius = 5;
    this.vel = data.vel || [0, 0];
    let img2 = new Image();
    img2.src = "./images/002-russia.png"
    this.sprite = img2;
    this.pos = data.pos
}

Player.prototype = Object.create(MovingCow.prototype);
Player.prototype.constructor = Player;

Player.prototype.movee = function(direction) {
    // this.vel[0] += direction[0];
    // this.vel[1] += direction[1];
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
    this.pos[0] = (this.pos[0] + direction[0]) % 1300;
    this.pos[1] = (this.pos[1] + direction[1]) % 800;
}

Player.prototype.collects = function(doll) {
    const xDist = Math.abs(this.pos[0] - doll.pos[0]);
    const yDist = Math.abs(this.pos[1] - doll.pos[1]);
    const rDist = this.radius + doll.radius;

    if (rDist > xDist && rDist > yDist) {
        return true;
    } else {
        return false;
    }
}

module.exports = Player;



