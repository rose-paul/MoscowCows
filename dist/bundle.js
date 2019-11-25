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
	
	    let cow1 = new MovingCow({ pos: [50, 50], vel: [15, 15], radius: 5, color: 'brown' })
	    let cow2 = new MovingCow({ pos: [100, 100], vel: [20, 100], radius: 5, color: 'brown' })
	    let cow3 = new MovingCow({ pos: [200, 200], vel: [300, 500], radius: 5, color: 'brown' })
	    let cow4 = new MovingCow({ pos: [1000, 400], vel: [150, 200], radius: 5, color: 'brown' })
	    cow1.draw(ctx)
	    cow2.draw(ctx)
	    cow3.draw(ctx)
	    cow4.draw(ctx)
	    
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
	    img.src = '../images/cow.png';
	    this.sprite = img;
	    // this.vel = Util.randomVec(15);
	}
	
	MovingCow.prototype.draw = function(ctx) {
	    ctx.fillStyle = this.color;
	    this.sprite.addEventListener('load', e => {
	        ctx.drawImage(this.sprite, 37, 71);
	    })
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map