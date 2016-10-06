function game(view_id) {
    var self = this;

    var INITIAL_SNAKE_LENGTH = 5;
    // Score - number of picked diamonds.
    self.score = 0;
    // Time in milliseconds between game iterations.
    self.delay = 100;
    self.snake = new snake(INITIAL_SNAKE_LENGTH);
    self.renderer = new renderer();

    self.step = function() {
        var VIEW_HEIGHT = 22;
        var VIEW_WIDTH = 78;

        switch (self.snake.last_direction) {
          case 'UP':
              if (self.snake.head.y == 0) {
                  window.alert('end');
                  clearInterval(self.interval);
                  return;
              }
              break;
          case 'LEFT':
              if (self.snake.head.x == 0) {
                  window.alert('end');
                  clearInterval(self.interval);
                  return;
              }
              break;
          case 'DOWN':
              if (self.snake.head.y == VIEW_HEIGHT - 1) {
                  window.alert('end');
                  clearInterval(self.interval);
                  return;
              }
              break;
          case 'RIGHT':
              if (self.snake.head.x == VIEW_WIDTH - 1) {
                  window.alert('end');
                  clearInterval(self.interval);
                  return;
              }
              break;
          default: break;
        }

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
        self.interval = setInterval(self.step, self.delay);
    };

}