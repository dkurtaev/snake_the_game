function recordsTable() {
    this.url = "https://www.friendpaste.com/1xoaeSRMPIyZWHc7ob7Vjo";
    this.xhr = new XMLHttpRequest();
};

recordsTable.prototype.process = function(table_processor) {
    this.xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var records = JSON.parse(this.responseText).snippet;
            records = records.split('\n');
            var n_records = records.length;
            for (var i = 0; i < n_records; ++i) {
                records[i] = JSON.parse(records[i]);
            }
            table_processor(records);
        }
    }

    this.xhr.open("GET", this.url, true);
    this.xhr.setRequestHeader("Accept", "application/json");
    this.xhr.send();
};

recordsTable.prototype.add = function(player_name, score) {
    var self = this;

    var add_record_process = function(records) {
        // Add new record.
        records.push({
            "name": player_name,
            "score": score
        });

        // Sorting records in ascending order.
        var comparator = function(first, second) {
            return second.score - first.score;
        };
        records.sort(comparator);

        // Update remote table.
        var data = {
            "title": "Records table",
            "snippet": JSON.stringify(records[0]),
            "language": "text"
        };

        var n_records = records.length;
        for (var i = 1; i < n_records; ++i) {
            data.snippet += "\n" + JSON.stringify(records[i]);
        }

        self.xhr.onreadystatechange = null;
        self.xhr.open("PUT", self.url, true);
        self.xhr.setRequestHeader("Content-Type", "application/json");
        self.xhr.send(JSON.stringify(data));
    };

    this.process(add_record_process);
};
