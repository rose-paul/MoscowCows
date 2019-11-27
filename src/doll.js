const Util = require('./util')

function Doll(data) {
    this.pos = data.pos;
    this.radius = data.radius;
    let img = new Image();
    img.src = "./images/matryoshka.png";
    this.sprite = img;
}

Doll.prototype.draw = function (ctx, size) {
    ctx.beginPath();
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], size, size)
}


module.exports = Doll;