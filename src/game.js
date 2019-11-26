const MovingCow = require("./moving_cow");
const Player = require("./player")

Game.DIM_X = 1300;
Game.DIM_Y = 800;
Game.NUM_COWS = 25;

function Game() {
    this.cows = [];
    this.players = [];
    this.addCows();
    this.addPlayer();
}

Game.prototype.addCows = function() {
    let i = 0;
    while (i < Game.NUM_COWS) {
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [-1, 0], radius: 5 })
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
    this.moveCows(ctx);
}

Game.prototype.moveCows = function(ctx) {
    this.cows.forEach(cow => {
        cow.move();
    })
}

module.exports = Game;