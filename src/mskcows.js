const Game = require("./game")
const GameView = require("./gameview")
const Modal = require("./modal")

document.addEventListener('DOMContentLoaded', () => {
    //MUSIC
    browser = window.navigator.userAgent.toLowerCase();
    const audio = document.getElementById('audio')
    const moos = document.getElementById('moos')
    muteUnmute = document.getElementById('music')
    muteUnmute.src = 'images/icons8-mute-100.png'
 
                audio.loop = true;
                audio.muted = true;
                moos.loop = true;
                moos.muted = true;
                audio.load();
                moos.load();
                document.getElementById('musicToggle').addEventListener('click', function() {
                    
                    if (audio.muted) {
                        audio.play()
                        audio.muted = false;
                        moos.muted = false;

                        var intervalId = setInterval(function () {
                            moos.play();
                        }, 10000)

                        muteUnmute.setAttribute('src', 'images/icons8-audio-100.png')
                    } else {
                        audio.pause();
                        moos.pause();
                        clearInterval(intervalId)
                        audio.muted = true;
                        moos.muted = true;
                        muteUnmute.src = 'images/icons8-mute-100.png'
                    }

                   
                })


    //GAME
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    Modal();
    let game = new Game();
    let gv = new GameView(game, ctx);
    ctx.fillStyle = "rgb(214, 29, 29)"
    ctx.font = "bold 48px Arial"
    ctx.fillText("Welcome!", el.width * .40, el.height * .4)
    let start = document.getElementById('start')
    start.className = 'shown'
    start.addEventListener('click', () => {
        gv.start();
        start.disabled = 'true'
    })
    let restart = document.getElementById('restart')
    restart.disabled = true;
    restart.addEventListener('click', () => {
        ctx.clearRect(0, 0, 1000, 500);
        let newGame = new Game();
        let newGv = new GameView(newGame, ctx);
        newGv.start();
    })

})