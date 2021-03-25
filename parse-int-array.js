"use strict";
/**
 * Parse the source text and convert to an array of integer.
 * @param {string} str Source text like '1,2,3..5,
 * @param {(number|(str:string, radix:number)=>number)?} radix
 *  (Optional) radix for the numbers or user parseInt function.
 * @returns {number[]} A result of parsing.
 */
function parseIntArray(str, radix) {
    radix = radix || 0;

    let _parseInt = null;
    if(typeof(radix) == "number") {
        _parseInt = parseInt;
    } else if(typeof(radix) == "function") {
        _parseInt = radix;
        radix = 0;
    } else {
        throw new Error("Invalid radix type.");
    }
    const trimAndParseInt = function(str) {
        str = str.trim();
        const n = _parseInt(str, radix);
        if(n == null && _parseInt !== parseInt) {
            n = parseInt(str, radix);
        }
        return n;
    };

    const nums = [];
    str.split(",").forEach(function(numseq) {
        const range = numseq.split("..");
        if(range == null || range.length == 0 || range.length > 2) {
            throw new Error("parseIntArray: invalid spec of " + numseq);
        } else if(range.length == 1) {
            nums.push(trimAndParseInt(numseq));
        } else if(range.length == 2) {
            const begin = trimAndParseInt(range[0]);
            const end = trimAndParseInt(range[1]);
            if(begin <= end) {
                let n = begin;
                while(n <= end) {
                    nums.push(n);
                    n++;
                }
            } else {
                let n = begin;
                while(n >= end) {
                    nums.push(n);
                    n--;
                }
            }
        }
    });
    return nums;
}
module.exports = parseIntArray;
