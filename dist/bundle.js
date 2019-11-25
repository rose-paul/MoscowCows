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
	
	window.MovingCow = MovingCow;
	
	document.addEventListener('DOMContentLoaded', () => {
	    const el = document.getElementById('game-canvas');
	    const ctx = el.getContext('2d');
	
	    let cow1 = new MovingCow({ pos: [50, 50], vel: [10, 10], radius: 5, color: 'brown' })
	    cow1.draw(ctx)
	    console.log('in add event listener')
	
	})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	function MovingCow(data) {
	    this.pos = data.pos;
	    this.vel = data.vel;
	    this.radius = data.radius;
	    this.color = data.color
	    const img = new Image();
	    img.src = '../images/cow.png';
	    this.sprite = img;
	}
	
	MovingCow.prototype.draw = function(ctx) {
	    ctx.fillStyle = this.color;
	    this.sprite.addEventListener('load', e => {
	        ctx.drawImage(this.sprite, 37, 71);
	    })
	}
	
	MovingObject.prototype.move = function() {
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map