module.exports.timeSort = function (entries) {
};

module.exports.categorySort = function (entries) {
    var sorted = {}
    for (var entry in entries) {
        if (sorted[entry.category] === undefined){
            sorted[entry.category] = [];
        }
        sorted[entry.category].push(entry);
    }
    return sorted;
};
