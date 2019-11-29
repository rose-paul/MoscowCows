const Game = require("./game")
const GameView = require("./gameview")

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    let game = new Game();
    let gv = new GameView(game, ctx);
    let start = document.getElementById('start')
    start.className = 'shown'
    start.addEventListener('click', () => {
        gv.start();
        start.disabled = 'true'
    })
    let restart = document.getElementById('restart')
    restart.disabled = true;
    restart.addEventListener('click', () => {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        let newGame = new Game();
        let newGv = new GameView(newGame, ctx);
        newGv.start();
    })
    

    console.log('in add event listener')

})