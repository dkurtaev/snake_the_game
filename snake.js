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
    this.last_direction = 'RIGHT';
};

snake.prototype.draw = function(renderer) {
    var length = this.body.length;
    renderer.addSymbol('@', this.head.x, this.head.y);
    for (var i = 0; i < length; ++i) {
      renderer.addSymbol('o', this.body[i].x, this.body[i].y);
    }
};

snake.prototype.move = function() {
    this.body.push({x: this.head.x, y: this.head.y});

    switch (this.last_direction) {
      case 'UP':    this.head.y -= 1; break;
      case 'LEFT':  this.head.x -= 1; break;
      case 'DOWN':  this.head.y += 1; break;
      case 'RIGHT': this.head.x += 1; break;
      default: break;
    }

    this.body.shift();
};

snake.prototype.setDirection = function(direction) {
    var change_direction = false;

    // We need to compute last direction due head position because this
    // function might be called not once per iteration.
    var before_head = this.body[this.body.length - 1];
    var diff_y = this.head.y - before_head.y;
    if (diff_y != 0) {
        this.last_direction = (diff_y > 0 ? 'DOWN' : 'UP');
    } else {
      this.last_direction = (this.head.x > before_head.x ? 'RIGHT' : 'LEFT');
    }

    switch (direction) {
      case 'UP':    change_direction = this.last_direction != 'DOWN'; break;
      case 'LEFT':  change_direction = this.last_direction != 'RIGHT'; break;
      case 'DOWN':  change_direction = this.last_direction != 'UP'; break;
      case 'RIGHT': change_direction = this.last_direction != 'LEFT'; break;
      default: break;
    }
    if (change_direction) {
        this.last_direction = direction;
    }
};

snake.prototype.eatDiamond = function(diamond_x, diamond_y) {

}

// Returns true is point (x, y) is a snake body or head.
snake.prototype.hasPoint = function(x, y) {
    if (this.head.x != x || this.head.y != y) {
        for (var i = 0, l = this.body.length; i < l; ++i) {
            if (this.body[i].x == x && this.body[i].y == y) {
                return true;
            }
        }
    } else {
        return true;
    }
    return false;
}
