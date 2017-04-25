function parseIntArray(s, base) {
    "use strict";

    base = base || 0;

    var _parseInt = null;
    if(typeof(base) == "number") {
        _parseInt = parseInt;
    } else if(typeof(base) == "function") {
        _parseInt = base;
        base = 0;
    } else {
        throw new Error("Invalid base type.");
    }
    var trimAndParseInt = function(s) {
        s = s.trim();
        var n = _parseInt(s, base);
        if(n == null && _parseInt !== parseInt) {
            n = parseInt(s, base);
        }
        return n;
    };

    var nums = [];
    s.split(",").forEach(function(numseq) {
        var range = numseq.split("..");
        if(range == null || range.length == 0 || range.length > 2) {
            throw new Error("parseIntArray: invalid spec of " + numseq);
        } else if(range.length == 1) {
            nums.push(trimAndParseInt(numseq));
        } else if(range.length == 2) {
            var begin = trimAndParseInt(range[0]);
            var end = trimAndParseInt(range[1]);
            if(begin <= end) {
                var n = begin;
                while(n <= end) {
                    nums.push(n);
                    n++;
                }
            } else {
                var n = begin;
                while(n >= end) {
                    nums.push(n);
                    n--;
                }
            }
        }
    });
    return nums;
}
try {
    module.exports = parseIntArray;
} catch(err) {
    (function(g){
        g["parseIntArray"] = parseIntArray;
    }(Function("return this;")()));
}
