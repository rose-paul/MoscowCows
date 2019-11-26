function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();
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

GameView.prototype.start = function () {
    let that = this;
    this.bindKeyHandlers();
    setInterval(function () {
        that.game.draw(that.ctx);
        that.game.step(that.ctx);
    }, 20);
};

module.exports = GameView;