function renderer() {
    this.symbols = [];
}

renderer.prototype.addSymbol = function(character, x, y) {
    var symbol = { character: character, x: x, y: y };
    this.symbols.push(symbol);
};

renderer.prototype.draw = function(element_id) {
    // Number of symbols exclude borders.
    var VIEW_HEIGHT = 22;

    // Sorting symbols by rows and each row inside by columns (from top to
    // buttom, from left to right).
    var comparator = function(first, second) {
        var diff_y = first.y - second.y;
        if (diff_y != 0) {
            return (diff_y < 0 ? -1 : 1);
        } else {
            var diff_x = first.x - second.x;
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
    var rendered = "";
    var n_symbols = this.symbols.length;

    for (var i = 0; i < n_symbols; ++i) {
        var symbol = this.symbols[i];
        if (row != symbol.y) {
            rendered += "<br>".repeat(symbol.y - row);
            row = symbol.y;
            col = 0;
        }
        rendered += " ".repeat(symbol.x - col) + symbol.character;
        col = symbol.x + 1;
    }

    // Remove all points for next drawing.
    this.symbols = [];

    // Add empty lines.
    rendered += "<br>".repeat(VIEW_HEIGHT - row);

    document.getElementById(element_id).innerHTML = rendered;
};
