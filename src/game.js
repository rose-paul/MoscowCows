const MovingCow = require("./moving_cow");
const Player = require("./player");
const Doll = require('./doll');
// const Level = require('./level')

Game.DIM_X = 990;
Game.DIM_Y = 480;
Game.NUM_COWS = 20;

function Game() {
    this.cows = [];
    this.players = [];
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
            new MovingCow({pos: this.randomPosition(), vel: [-1.5, 0], radius: 10, cowType: "brown-left" })
        )
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [1.5, 0], radius: 10, cowType: "brown-right" })
        )
        i++;
    }
}

Game.prototype.addPlayer = function() {
    const player = new Player({
        pos: this.randomPosition()
    })

    this.players.push(player);
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
    return [].concat(this.cows, this.players);
}


Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 1000, 500);
  this.all().forEach(thing => {
    thing.draw(ctx);
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
        if (cow.tramples(this.players[0])) {
            this.lose();
        }
    })
}

Game.prototype.collect = function() {
    if (this.players[0].collects(this.doll)) {
        this.collected++;
        console.log(this.collected)
        this.doll.pos = this.randomPosition();
        if (this.collected === 9) {
            this.win();
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
    let restart = document.getElementById('restart')
    restart.disabled = false;
    restart.addEventListener('click', () => {
        restart.disabled = true;
    })
}

Game.prototype.win = function() {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    ctx.fillStyle = "blue"
    ctx.font = "bold 48px Arial"
    ctx.fillText("Молодец, все собрали", el.width * .3, el.height * .5)
    this.won = true;
}

module.exports = Game;