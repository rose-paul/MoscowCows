function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();
    this.doll = this.game.addDoll();
}


GameView.MOVES = {
    w: [0, -12],
    a: [-12, 0],
    s: [0, 12],
    d: [12, 0],
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
    let intId = setInterval(
        function () {
        that.game.draw(that.ctx);
        that.game.step(that.ctx);
        if (that.game.lost) {
            clearInterval(intId);
        } else if (that.game.won) {
            clearInterval(intId);
        }
    }, 20);
};

module.exports = GameView;