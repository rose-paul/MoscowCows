const MovingCow = require("./moving_cow");
const Player = require("./player");
const Doll = require('./doll');
// const Level = require('./level')

Game.DIM_X = 990;
Game.DIM_Y = 480;
Game.NUM_COWS = 15;

function Game() {
    this.cows = [];
    this.player;
    this.doll;
    this.collected = 0;
    this.size = 60;
    this.addCows();
    this.lost = false;
    this.won = false;
    // this.level = 0;
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
        pos: this.randomPosition()
    })
    this.player = player;
    while (this.trampled()) {
         player = new Player({
            pos: this.randomPosition()
        })
    }

    this.player = player;
    return player;
}

Game.prototype.addDoll = function() {
    const doll = new Doll({
        pos: this.randomPosition(),
        radius: 15
    })

    this.doll = doll;
    return doll
}

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
  return [x, y];
};

Game.prototype.all = function() {
    return [].concat(this.cows);
}


Game.prototype.draw = function(ctx) {
    const canvas = document.getElementById("game-canvas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.all().forEach(thing => {
    thing.draw(ctx);
  });
  this.player.looperino(ctx);
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
  } else if (this.collected === 9) {
      this.size = 6;
  }
  this.doll.draw(ctx, this.size);
};

Game.prototype.step = function(ctx) {
    this.moveAll(ctx);
    this.trampled();
    this.collect();
}

Game.prototype.moveAll = function(ctx) {
    this.all().forEach(thing => {
        thing.move();
    })
}

Game.prototype.trampled = function() {
    this.cows.forEach( cow => {
        if (cow.tramples(this.player)) {
            this.lose();
            this.activateRestart();
            this.player.alive = false;
        }
    })
}

Game.prototype.collect = function() {
    if (this.player.collects(this.doll)) {
        this.collected++;
        this.doll.pos = this.randomPosition();
        if (this.collected === 9) {
            this.win();
            this.activateRestart();
        }
    }
}

Game.prototype.lose = function() {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    ctx.fillStyle = "red"
    ctx.font = "bold 48px Arial"
    ctx.fillText("Moo. Trampled.", el.width * .34, el.height * .5)
    this.lost = true;
   
}

Game.prototype.win = function() {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    ctx.fillStyle = "blue"
    ctx.font = "bold 48px Arial"
    ctx.fillText("Молодец, все собрали", el.width * .24, el.height * .5)
    this.won = true;
}

Game.prototype.activateRestart = function() {
    let restart = document.getElementById('restart')
    restart.disabled = false;
    restart.addEventListener('click', () => {
        restart.disabled = true;
    })
}
module.exports = Game;