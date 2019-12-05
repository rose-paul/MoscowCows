# Moscow Cows

In Moscow Cows, a game implemented in JavaScript using the HTML5 canvas tag, players must successfully collect full sets of Russian nesting dolls while avoiding being trampled by a herd of cows. 

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
