const Util = require('./util');
const MovingCow = require('./moving_cow')

const CYCLELOOP = [0, 1, 0, 2];
let CURRENTLOOPINDEX = 0;
let FRAMECOUNT = 0;

const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;

function Player(data) {
    this.radius = 5;
    this.vel = data.vel || [0, 0];
    let img2 = new Image();
    img2.src = "./images/playersprite.png"
    this.sprite = img2;
    this.pos = data.pos;
    this.scale = 2.5;
    this.width = 16;
    this.height = 18;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    this.alive = true;
    this.currentDirection = FACING_DOWN;
    }

// Player.prototype.draw = function (ctx) {
//     window.requestAnimationFrame(() => this.(ctx))
// }

Player.prototype.drawFrame = function (frameX, frameY, canvasX, canvasY, ctx) {
    ctx.drawImage(
        this.sprite,
        frameX * this.width,
        frameY * this.height,
        this.width,
        this.height,
        canvasX,
        canvasY,
        this.scaledWidth,
        this.scaledHeight
    );
}

Player.prototype.looperino = function(ctx) {
    // const canvas = document.getElementById("game-canvas");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawFrame(0, this.currentDirection, this.pos[0], this.pos[1], ctx)
    let animationId = window.requestAnimationFrame(() => this.looperino(ctx))
    if (!this.alive) {
        window.cancelAnimationFrame(animationId);
    }
}

// Player.prototype.step = function (ctx) {
//     FRAMECOUNT++;
//     debugger
//     if (FRAMECOUNT < 15) {
//         window.requestAnimationFrame(() => this.step(ctx));
//         return;
//     }
//     FRAMECOUNT = 0;
//     const canvas = document.getElementById("game-canvas");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     this.drawFrame(CYCLELOOP[CURRENTLOOPINDEX], CURRENTDIRECTION, 0, 0, ctx);
//     CURRENTLOOPINDEX++;
//     if (CURRENTLOOPINDEX >= CYCLELOOP.length) {
//         CURRENTLOOPINDEX = 0;
//         CURRENTDIRECTION ++
//     }

//     if (CURRENTDIRECTION >= 4) {
//         CURRENTDIRECTION = 0;
//     }
//     window.requestAnimationFrame(() => this.step(ctx))

// }

// Player.prototype = Object.create(MovingCow.prototype);
// Player.prototype.constructor = Player;

Player.prototype.move = function(direction) {
    // this.vel[0] += direction[0];
    // this.vel[1] += direction[1];
    if (direction[1] < 0) {
        this.currentDirection = FACING_UP;
    } else if (direction[0] < 0) {
        this.currentDirection = FACING_LEFT;
    } else if (direction[1] > 0) {
        this.currentDirection = FACING_DOWN
    } else {
        this.currentDirection = FACING_RIGHT;
    }

    if (this.pos[0] > 1500) {
        this.pos[0] = 0;
    } else if (this.pos[0] < 0) {
        this.pos[0] = 1500;
    }
    if (this.pos[1] > 500) {
        this.pos[1] = 0;
    } else if (this.pos[1] < 0) {
        this.pos[1] = 500;
    }
    this.pos[0] = (this.pos[0] + direction[0]) % 1000;
    this.pos[1] = (this.pos[1] + direction[1]) % 500;
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



