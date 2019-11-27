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
	const Player = __webpack_require__(4);
	const Doll = __webpack_require__(5);
	// const Level = require('./level')
	
	Game.DIM_X = 1300;
	Game.DIM_Y = 800;
	Game.NUM_COWS = 30;
	
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
	            new MovingCow({pos: this.randomPosition(), vel: [-1, 0], radius: 10 })
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
	    return [].concat(this.cows, this.players);
	}
	
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.all().forEach(thing => {
	    thing.draw(ctx);
	  });
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
	        }
	    })
	}
	
	Game.prototype.collect = function() {
	    if (this.players[0].collects(this.doll)) {
	        this.collected++;
	        console.log(this.collected)
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
	    ctx.fillText("Moo. Trampled.", el.width * .38, el.height * .5)
	    this.lost = true;
	}
	
	Game.prototype.win = function() {
	    const el = document.getElementById('game-canvas');
	    const ctx = el.getContext('2d');
	    ctx.fillStyle = "blue"
	    ctx.font = "bold 48px Arial"
	    ctx.fillText("Молодец, все собрали", el.width * .38, el.height * .5)
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
	    img.src = "./images/cow.png";
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
/***/ (function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingCow = __webpack_require__(2)
	
	function Player(data) {
	    this.radius = 5;
	    this.vel = data.vel || [0, 0];
	    let img2 = new Image();
	    img2.src = "./images/002-russia.png"
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
	    let intId = setInterval(function () {
	        that.game.draw(that.ctx);
	        that.game.step(that.ctx);
	        if (that.game.lost) clearInterval(intId);
	        if (that.game.won) clearInterval(intId);
	    }, 20);
	};
	
	module.exports = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map