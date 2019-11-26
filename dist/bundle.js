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
	const GameView = __webpack_require__(5)
	
	document.addEventListener('DOMContentLoaded', () => {
	    const el = document.getElementById('game-canvas');
	    const ctx = el.getContext('2d');
	    let game = new Game();
	    let gv = new GameView(game, ctx);
	    gv.start();
	    
	
	    console.log('in add event listener')
	
	})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const MovingCow = __webpack_require__(2);
	const Player = __webpack_require__(4)
	
	Game.DIM_X = 1300;
	Game.DIM_Y = 800;
	Game.NUM_COWS = 25;
	
	function Game() {
	    this.cows = [];
	    this.players = [];
	    this.addCows();
	}
	
	Game.prototype.addCows = function() {
	    let i = 0;
	    while (i < Game.NUM_COWS) {
	        this.cows.push( 
	            new MovingCow({pos: this.randomPosition(), vel: [-1, 0], radius: 5 })
	        )
	        i++;
	    }
	}
	
	Game.prototype.addPlayer = function() {
	    const player = new Player({
	        pos: this.randomPosition()
	    })
	
	    this.players.push(player);
	    debugger
	    return player;
	}
	
	Game.prototype.randomPosition = function() {
	  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
	  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
	  return [x, y];
	};
	
	Game.prototype.all = function() {
	    return [].concat(this.cows, this.players);
	}
	
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.all().forEach(thing => {
	    thing.draw(ctx);
	  });
	};
	
	Game.prototype.step = function(ctx) {
	    this.moveAll(ctx);
	}
	
	Game.prototype.moveAll = function(ctx) {
	    this.all().forEach(thing => {
	        thing.move();
	    })
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
	    img.src = "../images/cow.png";
	    this.sprite = img;
	}
	
	MovingCow.prototype.draw = function(ctx) {
	
	    ctx.beginPath();
	    ctx.drawImage(this.sprite, this.pos[0], this.pos[1])
	    
	}
	
	MovingCow.prototype.move = function() {
	  if (this.pos[0] > 1300) {
	    this.pos[0] = 0;
	  } else if (this.pos[0] < 0) {
	    this.pos[0] = 1300;
	  }
	  if (this.pos[1] > 800) {
	    this.pos[1] = 0;
	  } else if (this.pos[1] < 0) {
	    this.pos[1] = 800;
	  }
	  this.pos[0] = (this.pos[0] + this.vel[0]) % 1300;
	  this.pos[1] = (this.pos[1] + this.vel[1]) % 800;
	};
	
	
	
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
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingCow = __webpack_require__(2)
	
	function Player(data) {
	    this.radius = 5;
	    this.vel = data.vel || [0, 0];
	    let img2 = new Image();
	    img2.src = "../images/002-russia.png"
	    this.sprite = img2;
	    this.pos = data.pos
	}
	
	Player.prototype = Object.create(MovingCow.prototype);
	Player.prototype.constructor = Player;
	
	Player.prototype.movee = function(direction) {
	    // this.vel[0] += direction[0];
	    // this.vel[1] += direction[1];
	    if (this.pos[0] > 1300) {
	        this.pos[0] = 0;
	    } else if (this.pos[0] < 0) {
	        this.pos[0] = 1300;
	    }
	    if (this.pos[1] > 800) {
	        this.pos[1] = 0;
	    } else if (this.pos[1] < 0) {
	        this.pos[1] = 800;
	    }
	    this.pos[0] = (this.pos[0] + direction[0]) % 1300;
	    this.pos[1] = (this.pos[1] + direction[1]) % 800;
	}
	
	module.exports = Player;
	
	
	


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map