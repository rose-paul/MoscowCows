# Moscow Cows

In Moscow Cows, a game implemented in JavaScript using the HTML5 canvas tag, players must successfully collect full sets of Russian nesting dolls while avoiding being trampled by a herd of cows. 

[Live Link](https://rose-paul.github.io/MoscowCows/)

# Technologies and Languages

* JavaScript, HTML5, CSS3.

# Nesting Doll

The nesting doll gets its 'nesting' from the total amount the player has collected. Each time, the smaller inner doll appears (its size adjusts). There are a total of 9 to collect. 

```javascript
Game.prototype.draw = function(ctx) {
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.all().forEach(thing => {
    thing.draw(ctx);
  });
  this.player.loop(ctx);
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
  this.doll.draw(this.ctx, this.size);
};
```
# Game Steps
Each step in the game (on a set setInterval) the objects are moved and the game checks if the player has been trampled or collected a doll. Upon winning or losing, the restart button is enabled. 
```javascript 
Game.prototype.step = function() {
    this.moveAll(this.ctx);
    this.trampled();
    this.collect();
}
```

```javascript 
Game.prototype.trampled = function() {
    this.cows.forEach( cow => {
        if (cow.tramples(this.player)) {
            this.lose();
            this.activateRestart();
            this.player.alive = false;
        }
    })
}
```

```javascript
Game.prototype.collect = function() {
    if (this.player.collects(this.doll)) {
        this.collected++;
        this.doll.pos = this.randomPosition();
        if (this.collected === 9) {
            this.win();
            this.activateRestart();
        }
    }
}
```

```javascript
Game.prototype.activateRestart = function() {
    let restart = document.getElementById('restart')
    restart.disabled = false;
    restart.addEventListener('click', () => {
        restart.disabled = true;
    })
}
```
