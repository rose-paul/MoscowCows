function Haybale(data) {
    this.pos = data.pos
    this.radius = data.radius;
    let hay = new Image()
    hay.src = "images/haybale.png"
    this.hayDisplay = hay;
}

Haybale.prototype.draw = function(ctx) {
    ctx.drawImage(this.hayDisplay, this.pos[0], this.pos[1], 50, 50)
}

Haybale.prototype.isEaten = function (cow) {
    const xDist = Math.abs(this.pos[0] - cow.pos[0]);
    const yDist = Math.abs(this.pos[1] - (cow.pos[1]));
    const rDist = this.radius + cow.radius;

    if (rDist > xDist && rDist > yDist) {
        return true;
    } else {
        return false;
    }
}

module.exports = Haybale;