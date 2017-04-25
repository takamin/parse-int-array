(function() {
    "use strict";
    var chai = require("chai");
    var assert = chai.assert;
    var parseIntArray = require("../parse-int-array");
    describe("string including one number", function() {
        it("should returns array one number", function() {
            assert.equal(parseIntArray("0").length, 1);
        });
        it("should convert decimal number", function() {
            assert.equal(parseIntArray("10")[0], 10);
        });
        it("should convert negative decimal number", function() {
            assert.equal(parseIntArray("-10")[0], -10);
        });
        it("should convert hexa-decimal number", function() {
            assert.equal(parseIntArray("0x10")[0], 0x10);
        });
        it("should convert negative hexa-decimal number", function() {
            assert.equal(parseIntArray("-0x10")[0], -0x10);
        });
    });
    describe("string including two numbers", function() {
        it("should returns array one number", function() {
            assert.equal(parseIntArray("0,0").length, 2);
        });
        it("should convert decimal number", function() {
            assert.deepEqual(parseIntArray("1,2"), [1,2]);
        });
        it("should convert negative decimal number", function() {
            assert.deepEqual(parseIntArray("-100,-10"), [-100,-10]);
        });
        it("should convert hexa-decimal number", function() {
            assert.deepEqual(parseIntArray("0x10,0x123"), [0x10,0x123]);
        });
        it("should convert negative hexa-decimal number", function() {
            assert.deepEqual(parseIntArray("0x123,-0x10"), [0x123,-0x10]);
        });
    });
    describe("string represents a range", function() {
        it("should returns array one number", function() {
            assert.equal(
                parseIntArray("0,1..10,11").length, 12);
        });
        it("should convert decimal number", function() {
            assert.deepEqual(
                parseIntArray("100..102"),
                [100,101,102]);
        });
        it("should convert negative decimal number", function() {
            assert.deepEqual(parseIntArray("-100..-98"),
                [-100,-99,-98]);
        });
        it("should convert hexa-decimal number", function() {
            assert.deepEqual(
                parseIntArray("0x100..0x102"),
                [0x100,0x101,0x102]);
        });
        it("should convert negative hexa-decimal number", function() {
            assert.deepEqual(
                parseIntArray("-0x100 .. -0x102"),
                [-0x100,-0x101,-0x102]);
        });
    });
    describe("user parser", function() {
        var animals = ["bird", "cat", "dog"];
        it("should convert to index", function() {
            assert.deepEqual(
                parseIntArray("cat,dog,bird", function(name) {
                    return animals.indexOf(name);
                }), [1,2,0]);
        });
        it("should convert a range", function() {
            assert.deepEqual(
                parseIntArray("dog..bird", function(name) {
                    return animals.indexOf(name);
                }), [2,1,0]);
        });
    });
}());
