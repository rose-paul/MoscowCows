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

	const MovingCow = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./moving_cow\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	const Game = __webpack_require__(3)
	
	
	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}
	
	GameView.prototype.start = function() {
	  let that = this;
	  setInterval(function() {
	    that.game.step(that.ctx);
	    that.game.draw(that.ctx);
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
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const MovingCow = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./moving_cow\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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