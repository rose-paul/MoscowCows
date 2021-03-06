const MovingCow = require("./moving_cow");
const Player = require("./player");
const Doll = require('./doll');

Game.DIM_X = 980;
Game.DIM_Y = 480;
Game.NUM_COWS = 12;

function Game() {
    this.cows = [];
    this.player;
    this.doll;
    this.collected = 0;
    this.size = 60;
    this.addCows();
    this.lost = false;
    this.won = false;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
}


Game.prototype.addCows = function() {
    let i = 0;
    while (i < Game.NUM_COWS) {
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [-2, 0], radius: 10, cowType: "brown-left" })
        )
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [2, 0], radius: 10, cowType: "brown-right" })
        )
        i++;
    }
}

Game.prototype.addPlayer = function() {
    let player = new Player({
        pos: [495, 240]
    })
    this.player = player;
    this.player.loop();
    return player;
}

Game.prototype.addDoll = function() {
    const doll = new Doll({
        pos: this.randomPosition(),
        radius: 20
    })

    this.doll = doll;
    return doll
}

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
    if ((x > 470 && x < 520) || (y > 220 && y < 260)) {
        return this.randomPosition()
    }
  return [x, y];
};

Game.prototype.draw = function(ctx) {
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.cows.forEach(cow => {
    cow.draw(ctx);
  });
  if (this.collected === 1) {
      this.size = 54;
  } else if (this.collected === 2) {
      this.size = 48;
  } else if (this.collected === 3) {
      this.size = 42;
  } else if (this.collected === 4) {
      this.size = 36;
  } else if (this.collected === 5) {
      this.size = 30;
  } else if (this.collected === 6) {
      this.size === 24;
  } else if (this.collected === 7) {
      this.size = 18;
  } else if (this.collected === 8) {
      this.size = 12
  } 
  this.doll.draw(this.ctx, this.size);

  this.ctx.fillStyle = "red"
  this.ctx.font = "bold 36px Comic Sans MS, cursive, sans-serif"
  this.ctx.fillText(`${this.collected}/8 dolls`, this.canvas.width * .01, this.canvas.height * .99)
};

Game.prototype.step = function() {
    this.moveAllCows();
    this.trampled();
    this.collect();
}

Game.prototype.moveAllCows = function() {
    this.cows.forEach(cow => {
        cow.move();
    })
}

Game.prototype.trampled = function() {
    this.cows.forEach( cow => {
        if (cow.tramples(this.player)) {
            this.lose();
            this.player.alive = false;
        }
    })
}

Game.prototype.collect = function() {
    if (this.player.collects(this.doll)) {
        this.collected++;
        this.doll.pos = this.randomPosition();
        if (this.collected === 8) {
            this.win();
            this.player.alive = false;
        }
    }
}

Game.prototype.lose = function() {
    this.ctx.fillStyle = "red"
    this.ctx.font = "bold 48px Arial"
    this.ctx.fillText("Moo. Trampled.", this.canvas.width * .34, this.canvas.height * .5)
    this.lost = true;
    let restart = document.getElementById('restart')
    restart.disabled = false;
    restart.addEventListener('click', () => {
        restart.disabled = true;
    })
   
}

Game.prototype.win = function() { 
    this.ctx.fillStyle = "blue"
    this.ctx.font = "bold 48px Arial"
    this.ctx.fillText("Молодец! You win!", this.canvas.width * .28, this.canvas.height * .5)
    this.won = true;
    let restart = document.getElementById('restart')
    restart.disabled = false;
    restart.addEventListener('click', () => {
        restart.disabled = true;
    })
}
module.exports = Game;