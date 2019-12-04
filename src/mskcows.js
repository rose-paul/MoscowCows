const Game = require("./game")
const GameView = require("./gameview")
const Modal = require("./modal")

document.addEventListener('DOMContentLoaded', () => {
    //MUSIC
    browser = window.navigator.userAgent.toLowerCase();
    const audio = document.getElementById('audio')
    muteUnmute = document.getElementById('music')
    muteUnmute.src = 'images/icons8-audio-100.png'
    if (browser.indexOf('firefox') === -1) {

        AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const track = audioCtx.createMediaElementSource(audio);
        track.connect(audioCtx.destination);
        audioCtx.onstatechange = () => { console.log( audioCtx.state )}
        document.getElementById('musicToggle').addEventListener('click', function () {
            
            if (audioCtx.state === "suspended") {
                this.dataset.playing = "true"
                audioCtx.resume().then( () => audio.play() )
            }  
            console.log(this.dataset.playing);
            if (this.dataset.playing === 'false') {
                audio.play();
                this.dataset.playing = "true";
                muteUnmute.src = 'images/icons8-audio-100.png'
            } else if (this.dataset.playing === 'true') {
                audio.pause();
                this.dataset.playing = "false";
                muteUnmute.setAttribute('src', 'images/icons8-mute-100.png')
            }
        }, false)

    } else {
        
                audio.autoplay = true;
                audio.loop = true;
                audio.muted = true;
                audio.load();
                audio.addEventListener('load', function() {
                    audio.play();
                }, true);
                document.getElementById('musicToggle').addEventListener('click', function() {
                    if (audio.muted) {
                        audio.muted = false;
                        muteUnmute.setAttribute('src', 'images/icons8-mute-100.png')
                    } else {
                        audio.muted = true;
                        muteUnmute.src = 'images/icons8-audio-100.png'
                    }
                })
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