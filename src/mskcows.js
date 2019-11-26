const MovingCow = require('./moving_cow')
const Game = require('./game')


function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

window.MovingCow = MovingCow;

GameView.prototype.start = function() {
  let that = this;
  setInterval(function() {
    that.game.draw(that.ctx);
    that.game.step(that.ctx);
  }, 20);
};

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    let game = new Game();
    let gv = new GameView(game, ctx);
    gv.start();
    

    console.log('in add event listener')

})