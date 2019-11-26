function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();
}


GameView.MOVES = {
    w: [0, -7],
    a: [-7, 0],
    s: [0, 7],
    d: [7, 0],
};

GameView.prototype.bindKeyHandlers = function() {
    const player = this.player;
    Object.keys(GameView.MOVES).forEach(function (k) {
        const direction = GameView.MOVES[k];
        key(k, function () { player.move(direction); });
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