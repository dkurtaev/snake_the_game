function snake(start_length) {
    // Initial snake position - top left of view. Snake oriented horizontally.
    // Head in direction of free space.
    // +------------+
    // |======>     |
    // |            |
    // +------------+
    this.head = {x: start_length - 1, y: 0};
    this.body = [];
    for (var i = 1; i < start_length; ++i) {
      this.body.push({x: i - 1, y: 0});
    }
}

snake.prototype.draw = function(renderer) {
    var length = this.body.length;
    renderer.addSymbol('@', this.head.x, this.head.y);
    for (var i = 0; i < length; ++i) {
      renderer.addSymbol('o', this.body[i].x, this.body[i].y);
    }
};

snake.prototype.move = function(direction) {
    if (direction != 'UP' && direction != 'LEFT' && direction != 'DOWN' &&
        direction != 'RIGHT') {
        return;
    }

    this.body.push({x: this.head.x, y: this.head.y});

    switch (direction) {
      case 'UP':    this.head.y -= 1; break;
      case 'LEFT':  this.head.x -= 1; break;
      case 'DOWN':  this.head.y += 1; break;
      case 'RIGHT': this.head.x += 1; break;
      default: break;
    }

    this.body.shift();
};
