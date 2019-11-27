const Game = require("./game")
const GameView = require("./gameview")

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    let game = new Game();
    let gv = new GameView(game, ctx);
    let start = document.getElementById('start')
    start.addEventListener('click', () => {
        gv.start();
    })
    

    console.log('in add event listener')

})