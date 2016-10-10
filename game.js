function game(view_id) {
    var self = this;

    var INITIAL_SNAKE_LENGTH = 5;
    var VIEW_WIDTH = 78;
    var VIEW_HEIGHT = 22;
    // Score - number of picked diamonds.
    self.score = 0;
    // Time in milliseconds between game iterations.
    self.delay = 100;
    self.snake = new snake(INITIAL_SNAKE_LENGTH);
    self.renderer = new renderer();
    self.diamond = {x: 1 + Math.floor(Math.random() * (VIEW_WIDTH - 2)),
                    y: 1 + Math.floor(Math.random() * (VIEW_HEIGHT - 2))};
    self.renderer.draw(view_id);

    self.step = function() {
        var VIEW_HEIGHT = 22;
        var VIEW_WIDTH = 78;

        var dir = self.snake.last_direction;
        var head_x = self.snake.head.x;
        var head_y = self.snake.head.y;
        if (dir == 'UP' && head_y == 0 ||
            dir == 'LEFT' && head_x == 0 ||
            dir == 'DOWN' && head_y == VIEW_HEIGHT - 1 ||
            dir == 'RIGHT' && head_x == VIEW_WIDTH - 1) {
            self.gameEnd();
            return;
        }

        self.snake.move();
        if (self.snake.isBody(self.snake.head.x, self.snake.head.y)) {
            self.gameEnd();
            return;
        }

        if (self.snake.head.x == self.diamond.x &&
            self.snake.head.y == self.diamond.y) {
            self.score += 1;
            self.snake.eatDiamond();
            var x, y;
            do {
                x = 1 + Math.floor(Math.random() * (VIEW_WIDTH - 2));
                y = 1 + Math.floor(Math.random() * (VIEW_HEIGHT - 2));
            } while (self.snake.hasPoint(x, y));
            self.diamond = {x: x, y: y};
        }

        self.snake.draw(self.renderer);
        self.renderer.addSymbol('*', self.diamond.x, self.diamond.y);
        self.renderer.draw(view_id);
    };

    self.onkeydown = function(event) {
        switch (event.keyCode) {
          case 37: self.snake.setDirection('LEFT'); break;
          case 38: self.snake.setDirection('UP'); break;
          case 39: self.snake.setDirection('RIGHT'); break;
          case 40: self.snake.setDirection('DOWN'); break;
          default: break;
        }
    }

    self.start = function() {
        self.interval = setInterval(self.step, self.delay);
    };

    self.gameEnd = function() {
        clearInterval(self.interval);

        var records_table = new recordsTable();

        var new_record_process = function(records) {
            var n_records = records.length;
            if (self.score > records[n_records - 1].score) {
                // Receive player's name.
                var name = undefined;
                do {
                  name = prompt("New record! Please enter your name:");
                } while (name == null || name.length < 2 ||
                         name.length > 20);
                records_table.add(name, self.score);
            } else {
                window.alert("Game is over. Smile and try again!");
            }
        };

        records_table.process(new_record_process);
    }
};
