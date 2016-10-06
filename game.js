function game(view_id) {
    var self = this;

    var INITIAL_SNAKE_LENGTH = 5;
    // Score - number of picked diamonds.
    self.score = 0;
    // Time in milliseconds between game iterations.
    self.intervals = 100;
    self.snake = new snake(INITIAL_SNAKE_LENGTH);
    self.renderer = new renderer();

    self.step = function() {
        self.snake.move();
        self.snake.draw(self.renderer);
        self.renderer.draw(view_id);
    };

    self.onkeydown = function(event) {
        switch (event.keyCode) {
          case 37: self.snake.set_direction('LEFT'); break;
          case 38: self.snake.set_direction('UP'); break;
          case 39: self.snake.set_direction('RIGHT'); break;
          case 40: self.snake.set_direction('DOWN'); break;
          default: break;
        }
    }

    self.start = function() {
        setInterval(self.step, self.intervals);
    };

}
