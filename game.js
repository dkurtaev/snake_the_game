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

    self.step = function() {
        var VIEW_HEIGHT = 22;
        var VIEW_WIDTH = 78;

        var dir = self.snake.last_direction;
        var head_x = self.snake.head.x;
        var head_y = self.snake.head.y;
        if (dir == 'UP' && head_y == 0 ||
            dir == 'LEFT' && head_x == 0 ||
            dir == 'ROWN' && head_y == VIEW_HEIGHT - 1 ||
            dir == 'RIGHT' && head_x == VIEW_WIDTH - 1) {
            self.gameEnd();
            return;
        }

        self.snake.move();

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

        // Receive records table.
        var url = "https://www.friendpaste.com/1xoaeSRMPIyZWHc7ob7Vjo";
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Parsing records table.
                var records = JSON.parse(this.responseText).snippet;
                records = records.split('\n');
                var n_records = records.length;
                for (var i = 0; i < n_records; ++i) {
                    records[i] = JSON.parse(records[i]);
                }

                // Check new record.
                if (self.score > records[n_records - 1].score) {
                    records.push({name: "player", score: self.score});

                    // Sorting records in ascending order.
                    var comparator = function(first, second) {
                        if (first.score != second.score) {
                            return (first.score < second.score ? 1 : -1);
                        } else {
                            return 0;
                        }
                    };
                    records.sort(comparator);

                    // Update remote table.
                    var data = {
                        "title": "Records table",
                        "snippet": JSON.stringify(records[0]),
                        "language": "text"
                    };

                    for (var i = 1; i < n_records; ++i) {
                        data.snippet += "\n" + JSON.stringify(records[i]);
                    }

                    xhr.open("PUT", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(data));
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
    };

}
