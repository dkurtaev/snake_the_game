function renderer() {
    this.symbols = [];

    this.addSymbol = function(character, x, y) {
        var symbol = {
            character: character,
            position: {x: x, y: y}
        };
        this.symbols.push(symbol);
    };

    this.draw = function(element_id) {
        // Sorting symbols by rows and each row inside by columns (from top to
        // buttom, from left to right).
        var comparator = function(first, second) {
            var diff_y = first.position.y - second.position.y;
            if (diff_y != 0) {
                return (diff_y < 0 ? -1 : 1);
            } else {
                var diff_x = first.position.x - second.position.x;
                if (diff_x != 0) {
                    return (diff_x < 0 ? -1 : 1);
                } else {
                    return 0;
                }
            }
        };
        this.symbols.sort(comparator);

        // Printing symbols. Printing whitespaces between symbols at the same
        // row and line breaks between different rows.
        var row = 0, col = 0;
        var rendered = "<pre>";
        var n_symbols = this.symbols.length;

        for (var i = 0; i < n_symbols; ++i) {
            var symbol = this.symbols[i];

            while (row != symbol.position.y) {
                rendered += "<br>";
                ++row;
                col = 0;
            }
            while (col != symbol.position.x) {
                rendered += " ";
                ++col;
            }
            rendered += symbol.character;
            ++col;
        }

        // Remove all points for next drawing.
        this.symbols = [];

        document.getElementById(element_id).innerHTML = rendered + "</pre>";
    };
}
