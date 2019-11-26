const MovingCow = require("./moving_cow");
const Player = require("./player")

Game.DIM_X = 1300;
Game.DIM_Y = 800;
Game.NUM_COWS = 25;

function Game() {
    this.cows = [];
    this.players = [];
    this.addCows();
}

Game.prototype.addCows = function() {
    let i = 0;
    while (i < Game.NUM_COWS) {
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [-1, 0], radius: 10 })
        )
        i++;
    }
}

Game.prototype.addPlayer = function() {
    const player = new Player({
        pos: this.randomPosition()
    })

    this.players.push(player);
    debugger
    return player;
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
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.all().forEach(thing => {
    thing.draw(ctx);
  });
};

Game.prototype.step = function(ctx) {
    this.moveAll(ctx);
    this.trampled();
}

Game.prototype.moveAll = function(ctx) {
    this.all().forEach(thing => {
        thing.move();
    })
}

Game.prototype.trampled = function() {
    this.cows.forEach( cow => {
        if (cow.tramples(this.players[0])) {
            this.players[0].pos = this.randomPosition();
        }
    })
}

module.exports = Game;