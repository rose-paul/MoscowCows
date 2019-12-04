const Game = require("./game")
const GameView = require("./gameview")
const Modal = require("./modal")

document.addEventListener('DOMContentLoaded', () => {
    //MUSIC
    browser = window.navigator.userAgent.toLowerCase();
    const musicSource = './music/midnight.m4a';
    const audio = document.createElement('audio')
    audio.setAttribute('src', musicSource);
    audio.autoplay = true;
    audio.loop = true;
    audio.muted = true;
    audio.load();
    audio.addEventListener('load', function() {
        audio.play();
    }, true);
    muteUnmute = document.getElementById('music')
    muteUnmute.src = 'images/icons8-audio-100.png'
    document.getElementById('musicToggle').addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            muteUnmute.setAttribute('src', 'images/icons8-mute-100.png')
        } else {
            audio.muted = true;
            muteUnmute.src = 'images/icons8-audio-100.png'
        }
    })
    if (browser.indexOf('firefox') === -1) {
        const audio = document.createElement('embed');
        audio.className = "audio"
        audio.setAttribute('src', musicSource);
        audio.autostart = true;
        audio.loop = true;
        audio.muted = true;
        audio.controls = true;
    } 


    //GAME
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');
    Modal();
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
        ctx.clearRect(0, 0, 1000, 500);
        let newGame = new Game();
        let newGv = new GameView(newGame, ctx);
        newGv.start();
    })

})