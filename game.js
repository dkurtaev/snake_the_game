function game(view_id) {
    var self = this;

    var INITIAL_SNAKE_LENGTH = 5;
    // Score - number of picked diamonds.
    self.score = 0;
    // Time in milliseconds between game iterations.
    self.intervals = 0;
    self.snake = new snake(INITIAL_SNAKE_LENGTH);
    self.renderer = new renderer();

    self.step = function() {
        self.snake.draw(self.renderer);
        self.renderer.draw(view_id);
    };

    self.onkeydown = function(event) {
        switch (event.keyCode) {
          case 37: self.snake.move('LEFT'); break;
          case 38: self.snake.move('UP'); break;
          case 39: self.snake.move('RIGHT'); break;
          case 40: self.snake.move('DOWN'); break;
          default: break;
        }
    }

    self.start = function() {
        setInterval(self.step, self.intervals);
    };

}
