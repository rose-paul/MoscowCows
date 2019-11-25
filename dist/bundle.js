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

	const MovingCow = __webpack_require__(1)
	const Game = __webpack_require__(3)
	
	
	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}
	
	GameView.prototype.start = function() {
	  let that = this;
	  setInterval(function() {
	    that.game.draw(that.ctx);
	    that.game.step(that.ctx);
	  }, 20);
	};
	
	
	
	window.MovingCow = MovingCow;
	
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

	const Util = __webpack_require__(2)
	
	function MovingCow(data) {
	    this.pos = data.pos;
	    this.vel = data.vel;
	    this.radius = data.radius;
	    this.color = data.color
	    const img = new Image();
	    img.src = "../images/cow.png";
	    this.sprite = img;
	}
	
	MovingCow.prototype.draw = function(ctx) {
	    ctx.fillStyle = this.color;
	    this.sprite.onload = function() {
	        ctx.drawImage(this.sprite, this.pos[0], this.pos[1]);
	    }
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const MovingCow = __webpack_require__(1);
	
	Game.DIM_X = 1300;
	Game.DIM_Y = 800;
	Game.NUM_COWS = 10;
	
	function Game() {
	    this.cows = [];
	    this.addCows();
	}
	
	Game.prototype.addCows = function() {
	    let i = 0;
	    while (i < Game.NUM_COWS) {
	        this.cows.push( 
	            new MovingCow({pos: this.randomPosition(), vel: [1, 0], radius: 5, color: 'white' })
	        )
	        i++;
	    }
	}
	
	Game.prototype.randomPosition = function() {
	  let x = Math.floor(Math.random() * Math.floor(Game.DIM_X));
	  let y = Math.floor(Math.random() * Math.floor(Game.DIM_Y));
	  return [x, y];
	};
	
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.cows.forEach(cow => {
	    cow.draw(ctx);
	  });
	};
	
	Game.prototype.step = function(ctx) {
	    this.moveCows(ctx);
	}
	
	Game.prototype.moveCows = function() {
	    this.cows.forEach(cow => {
	        cow.move();
	    })
	}
	
	module.exports = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map