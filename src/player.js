const Util = require('./util');
const MovingCow = require('./moving_cow')

function Player(data) {
    this.radius = 5;
    this.vel = data.vel || [0, 0];
    let img2 = new Image();
    img2.src = "../images/002-russia.png"
    this.sprite = img2;
    this.pos = data.pos
}

Player.prototype = Object.create(MovingCow.prototype);
Player.prototype.constructor = Player;

module.exports = Player;



