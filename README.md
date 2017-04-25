parseIntArray
=============

Parse a string and returns an integer array.

Prototype
---------

__parseIntArray(str, base = 0]);__

Parameter
---------

* str:string
* base:number/function=0:number

Returns
-------

an array of integer.

Example
-------

```javascript
var parseIntArray = require("parse-int-array");

// The comma separates the numbers.
parseIntArray("0,1,2"); // returns [0,1,2]
parseIntArray("2,0,1"); // returns [2,0,1]

// The delimitor '..' represents a range 
parseIntArray("0..2");  // returns [0,1,2]
parseIntArray("10..10000");  // ...

// Combination
parseIntArray(
    "1,5..3,6");        // returns [1,5,4,3,6]

// Usage of user parser
var animals = ["bird","cat","dog"];
function animal2index(animal, base) {
    return animals.indexOf(animal);
}
parseIntArray(
    "cat, bird, dog",
    animal2index);      // returns [1,0,2]
```

LICENSE
-------

This software is released under the MIT License, see [LICENSE](LICENSE)
