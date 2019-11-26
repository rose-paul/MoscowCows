const MovingCow = require("./moving_cow");

Game.DIM_X = 1300;
Game.DIM_Y = 800;
Game.NUM_COWS = 3;

function Game() {
    this.cows = [];
    this.addCows();
}

Game.prototype.addCows = function() {
    let i = 0;
    while (i < Game.NUM_COWS) {
        this.cows.push( 
            new MovingCow({pos: this.randomPosition(), vel: [-1, 0], radius: 5, color: 'white' })
        )
        i++;
    }
}

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
  return [x, y];
};


Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.cows.forEach(cow => {
    cow.draw(ctx);
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