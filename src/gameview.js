function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();
    this.doll = this.game.addDoll();
}


GameView.MOVES = {
    w: [0, -10],
    a: [-10, 0],
    s: [0, 10],
    d: [10, 0],
    "s+d": [10, 10],
    "s+a": [-10, 10],
    "w+d": [10, -10],
    "w+a": [-10, -10]
};
// 
GameView.prototype.bindKeyHandlers = function() {
    const player = this.player;
    Object.keys(GameView.MOVES).forEach(function (k) {
        const direction = GameView.MOVES[k];
        key(k, function () { player.movee(direction); });
    });
};

const gameTimer = (gameView) => setInterval( function() {
    gameView.game.draw(gameView.ctx);
    gameView.game.step(gameView.ctx);
    if (gameView.game.lost) {
        gameView.end();
    }
}, 20);

GameView.prototype.start = function () {
    this.bindKeyHandlers();
    gameTimer(this);
};

GameView.prototype.end = function() {
    clearInterval(gameTimer);
}

module.exports = GameView;