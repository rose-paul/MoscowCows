/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1)
	const GameView = __webpack_require__(6)
	const Modal = __webpack_require__(7)
	
	document.addEventListener('DOMContentLoaded', () => {
	    //MUSIC
	    browser = window.navigator.userAgent.toLowerCase();
	    const audio = document.getElementById('audio')
	    const moos = document.getElementById('moos')
	    muteUnmute = document.getElementById('music')
	    muteUnmute.src = 'images/icons8-audio-100.png'
	 
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
	
	                        muteUnmute.setAttribute('src', 'images/icons8-mute-100.png')
	                    } else {
	                        audio.pause();
	                        moos.pause();
	                        clearInterval(intervalId)
	                        audio.muted = true;
	                        moos.muted = true;
	                        muteUnmute.src = 'images/icons8-audio-100.png'
	                    }
	
	                   
	                })
	
	
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const MovingCow = __webpack_require__(2);
	const Player = __webpack_require__(4);
	const Doll = __webpack_require__(5);
	// const Level = require('./level')
	
	Game.DIM_X = 990;
	Game.DIM_Y = 480;
	Game.NUM_COWS = 20;
	
	function Game() {
	    this.cows = [];
	    this.players = [];
	    this.doll;
	    this.collected = 0;
	    this.size = 60;
	    this.addCows();
	    this.lost = false;
	    this.won = false;
	    // this.level = 0;
	}
	
	
	Game.prototype.addCows = function() {
	    let i = 0;
	    while (i < Game.NUM_COWS) {
	        this.cows.push( 
	            new MovingCow({pos: this.randomPosition(), vel: [-2, 0], radius: 10, cowType: "brown-left" })
	        )
	        this.cows.push( 
	            new MovingCow({pos: this.randomPosition(), vel: [2, 0], radius: 10, cowType: "brown-right" })
	        )
	        i++;
	    }
	}
	
	Game.prototype.addPlayer = function() {
	    const player = new Player({
	        pos: this.randomPosition()
	    })
	
	    this.players.push(player);
	    return player;
	}
	
	Game.prototype.addDoll = function() {
	    const doll = new Doll({
	        pos: this.randomPosition(),
	        radius: 15
	    })
	
	    this.doll = doll;
	    return doll
	}
	
	Game.prototype.randomPosition = function() {
	  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
	  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
	  return [x, y];
	};
	
	Game.prototype.all = function() {
	    return [].concat(this.cows);
	}
	
	
	Game.prototype.draw = function(ctx) {
	    const canvas = document.getElementById("game-canvas");
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	  this.all().forEach(thing => {
	    thing.draw(ctx);
	  });
	  this.players[0].looperino(ctx);
	  if (this.collected === 1) {
	      this.size = 54;
	  } else if (this.collected === 2) {
	      this.size = 48;
	  } else if (this.collected === 3) {
	      this.size = 42;
	  } else if (this.collected === 4) {
	      this.size = 36;
	  } else if (this.collected === 5) {
	      this.size = 30;
	  } else if (this.collected === 6) {
	      this.size === 24;
	  } else if (this.collected === 7) {
	      this.size = 18;
	  } else if (this.collected === 8) {
	      this.size = 12
	  } else if (this.collected === 9) {
	      this.size = 6;
	  }
	  this.doll.draw(ctx, this.size);
	};
	
	Game.prototype.step = function(ctx) {
	    this.moveAll(ctx);
	    this.trampled();
	    this.collect();
	}
	
	Game.prototype.moveAll = function(ctx) {
	    this.all().forEach(thing => {
	        thing.move();
	    })
	}
	
	Game.prototype.trampled = function() {
	    this.cows.forEach( cow => {
	        if (cow.tramples(this.players[0])) {
	            this.lose();
	            this.players[0].alive = false;
	        }
	    })
	}
	
	Game.prototype.collect = function() {
	    if (this.players[0].collects(this.doll)) {
	        this.collected++;
	        this.doll.pos = this.randomPosition();
	        if (this.collected === 9) {
	            this.win();
	        }
	    }
	}
	
	Game.prototype.lose = function() {
	    const el = document.getElementById('game-canvas');
	    const ctx = el.getContext('2d');
	    ctx.fillStyle = "red"
	    ctx.font = "bold 48px Arial"
	    ctx.fillText("Moo. Trampled.", el.width * .34, el.height * .5)
	    this.lost = true;
	    let restart = document.getElementById('restart')
	    restart.disabled = false;
	    restart.addEventListener('click', () => {
	        restart.disabled = true;
	    })
	}
	
	Game.prototype.win = function() {
	    const el = document.getElementById('game-canvas');
	    const ctx = el.getContext('2d');
	    ctx.fillStyle = "blue"
	    ctx.font = "bold 48px Arial"
	    ctx.fillText("Молодец, все собрали", el.width * .3, el.height * .5)
	    this.won = true;
	}
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3)
	
	function MovingCow(data) {
	    this.pos = data.pos;
	    this.vel = data.vel;
	    this.radius = data.radius;
	    let img = new Image();
	    data.cowType === "brown-left" ? img.src = "./images/cow.png" : img.src = "./images/001-cow.png"
	    this.sprite = img;
	}
	
	MovingCow.prototype.draw = function(ctx) {
	
	    ctx.beginPath();
	    ctx.drawImage(this.sprite, this.pos[0], this.pos[1])
	    
	}
	
	MovingCow.prototype.move = function() {
	  if (this.pos[0] > 990) {
	    this.pos[0] = 0;
	  } else if (this.pos[0] < 0) {
	    this.pos[0] = 990;
	  }
	  if (this.pos[1] > 490) {
	    this.pos[1] = 0;
	  } else if (this.pos[1] < 0) {
	    this.pos[1] = 490;
	  }
	  this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
	  this.pos[1] = (this.pos[1] + this.vel[1]) % 500;
	};
	
	MovingCow.prototype.tramples = function(player) {
	  const xDist = Math.abs(this.pos[0] - player.pos[0]);
	  const yDist = Math.abs(this.pos[1] - player.pos[1]);
	  const rDist = this.radius + player.radius;
	
	  if (rDist > xDist && rDist > yDist) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	
	
	module.exports = MovingCow;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	const Util = {
	  randomVec(length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};
	
	module.exports = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	const CYCLELOOP = [0, 1, 0, 2];
	let CURRENTLOOPINDEX = 0;
	
	const FACING_DOWN = 0;
	const FACING_UP = 1;
	const FACING_LEFT = 2;
	const FACING_RIGHT = 3;
	
	function Player(data) {
	    this.radius = 5;
	    this.vel = data.vel || [0, 0];
	    let img2 = new Image();
	    img2.src = "./images/playersprite.png"
	    this.sprite = img2;
	    this.pos = data.pos;
	    this.scale = 1.5;
	    this.width = 16;
	    this.height = 18;
	    this.scaledWidth = this.scale * this.width;
	    this.scaledHeight = this.scale * this.height;
	    this.alive = true;
	    this.currentDirection = FACING_DOWN;
	    this.frameCount = 0;
	    }
	
	Player.prototype.drawFrame = function (frameX, frameY, canvasX, canvasY, ctx) {
	    ctx.drawImage(
	        this.sprite,
	        frameX * this.width,
	        frameY * this.height,
	        this.width,
	        this.height,
	        canvasX,
	        canvasY,
	        this.scaledWidth,
	        this.scaledHeight
	    );
	}
	
	Player.prototype.looperino = function(ctx) {
	    
	    this.drawFrame(CYCLELOOP[CURRENTLOOPINDEX], this.currentDirection, this.pos[0], this.pos[1], ctx)
	    let animationId = window.requestAnimationFrame(() => this.looperino(ctx))
	    if (!this.alive) {
	        window.cancelAnimationFrame(animationId);
	    }
	}
	
	Player.prototype.move = function(direction) {
	
	    if (direction[1] < 0) {
	        this.currentDirection = FACING_UP;
	    } else if (direction[0] < 0) {
	        this.currentDirection = FACING_LEFT;
	    } else if (direction[1] > 0) {
	        this.currentDirection = FACING_DOWN
	    } else {
	        this.currentDirection = FACING_RIGHT;
	    }
	
	    // if (this.vel[1] < 0 && direction[1] > 0) {
	    //     this.vel[1] = 0;
	    // } else if (this.vel[1] > 0 && direction[1] < 0) {
	    //     this.vel[1] = 0;
	    // } else if (this.vel[0] < 0 && direction[0] > 0) {
	    //     this.vel[0] = 0;
	    // } else if (this.vel[0] > 0 && direction[0] < 0) {
	    //     this.vel[0] = 0;
	    // } else {
	    //     this.vel[0] += direction[0];
	    //     this.vel[1] += direction[1];
	    // }
	    
	    CURRENTLOOPINDEX++
	    if (CURRENTLOOPINDEX >= 3) {
	        CURRENTLOOPINDEX = 0;
	    }
	
	    if (this.pos[0] > 1500) {
	        this.pos[0] = 0;
	    } else if (this.pos[0] < 0) {
	        this.pos[0] = 1500;
	    }
	    if (this.pos[1] > 500) {
	        this.pos[1] = 0;
	    } else if (this.pos[1] < 0) {
	        this.pos[1] = 500;
	    }
	    // this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
	    // this.pos[1] = (this.pos[1] + this.vel[1]) % 500;
	    this.pos[0] = (this.pos[0] + direction[0]) % 1000;
	    this.pos[1] = (this.pos[1] + direction[1]) % 500;
	}
	
	Player.prototype.collects = function(doll) {
	    const xDist = Math.abs(this.pos[0] - doll.pos[0]);
	    const yDist = Math.abs(this.pos[1] - doll.pos[1]);
	    const rDist = this.radius + doll.radius;
	
	    if (rDist > xDist && rDist > yDist) {
	        return true;
	    } else {
	        return false;
	    }
	}
	
	module.exports = Player;
	
	
	


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3)
	
	function Doll(data) {
	    this.pos = data.pos;
	    this.radius = data.radius;
	    let img = new Image();
	    img.src = "./images/matryoshka.png";
	    this.sprite = img;
	}
	
	Doll.prototype.draw = function (ctx, size) {
	    ctx.beginPath();
	    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], size, size)
	}
	
	
	module.exports = Doll;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	function GameView(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	    this.player = this.game.addPlayer();
	    this.doll = this.game.addDoll();
	}
	
	
	GameView.MOVES = {
	    w: [0, -5],
	    a: [-5, 0],
	    s: [0, 5],
	    d: [5, 0],
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
	    let intId = setInterval(function () {
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	function Modal() {
	    let modal = document.querySelector(".modal");
	    let trigger = document.querySelector(".trigger");
	    let closeButton = document.querySelector(".close-button");
	    
	    function toggleModal() {
	        modal.classList.toggle("show-modal");
	    }
	    
	    function windowOnClick(event) {
	        if (event.target === modal) {
	            toggleModal();
	        }
	    }
	    trigger.addEventListener("click", toggleModal);
	    closeButton.addEventListener("click", toggleModal);
	    window.addEventListener("click", windowOnClick)
	}
	
	module.exports = Modal;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map