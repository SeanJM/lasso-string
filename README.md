[![Circle CI](https://circleci.com/gh/SeanJM/lasso.svg?circle-token=5c:41:84:31:63:be:5f:4e:c9:b9:bd:5b:a3:d2:55:e3)](https://circleci.com/gh/SeanJM/lasso/tree/master)
## Lasso
#### An interface for editing strings

## Methods

### .between

```javascript
lasso.between('(', ')', 'This) is (between)');
// -> {
        start : 9,
        end : 17,
        length : 7,
        value : 'between'
      }
```

```javascript
lasso.between(/[a-z]+\(/, ')', 'This) is function(between)');
// -> {
        start : 18,
        end : 25,
        length : 16,
        value : 'between'
      }
```

### .camelCase
```javascript
lasso.camelCase('Let\'s JavaScript case this thing');
// -> letsJavascriptCaseThisThing
```

### .capitalCase
```javascript
lasso.capitalCase('let\'s CapitalCase this thing');
// -> Let's CapitalCase This Thing
```

### .differentWords

```javascript
lasso.differentWords('a b c d', 'a d f b');
// -> ['c', 'f']
```

### .distance

Calculates the Levenshtein distance between two words.

Based on this [implementation](https://gist.github.com/andrei-m/982927) by Andrei Mackenzie

```javascript
lasso.distance('This distance', 'That distant');
// -> 4
```

### .ellipsis

#### `lasso.ellipsis(String, Limit)`

Adds '...' at the end of a string if it exceeds the length of the second argument

```javascript

lasso.ellipsis('This distance', 5);
// -> This...
```

### .fuzzy

Returns an object of character positions in a fuzzy search.

```javascript
  var match = lasso.fuzzy('this is being searched', 'tbs');
  // -> [{"index":0,"length":1,"match":"t"},{"index":8,"length":1,"match":"b"},{"index":14,"length":1,"match":"s"}]
```

#### Fuzzy search properties

- `.distance` is the distance between the first and last match
- `.closest` is the `index` of the closest match
- `.farthest` is the `index` of the farthest match
- `.difference` is the difference between the `closest` and `farthest` match

```javascript
  var match = lasso.fuzzy('this is being searched', 'tbs');
  // match.distance -> 14
  // match.closest -> 6
  // match.farthest -> 7
  // match.difference -> 1
```


### .group

#### `lasso.group(Number)`

Groups numbers together using a comma

```javascript
lasso.group(1000.49);
// -> 1,000.49
```


### .indexesOf
```javascript
lasso.indexesOf('Check out where the indexes of \'e\' are', 'e');
// -> [{ index : 3, length : 1, match : 'e'}, { index : 5, length : 1, match : 'e'}, { ... }]
```

Also works with a regular expression

```javascript
lasso.indexesOf('Check out where the indexes of \'e\' are', /e/);
```


### Match Type

Works a bit like a regular expression match in that in returns the string split up by character group types, alpha with alpha, numbers with numbers, punctuation with punctuation, etc.

```javascript
  var match = lasso.matchType('test10.scss');
  // -> ['test', '10', '.', 'scss'];
```


### .sameWords

```javascript
lasso.sameWords('a b c', 'a');
// -> ['a']
```


### .splice
```javascript
lasso.splice('string', 1, 0, 'INSERT');
// -> sINSERTtring
```


### .template
```javascript
lasso.template('Use %s to template a string', 'Rope');
// -> Use Rope to template a string
```

You can also reference indexes:

```javascript
lasso.template('indexed %0', 'values');
// -> indexed values
```

### .toChar
```javascript
lasso.toCharCode(82);
// -> R

lasso.toCharCode([82, 111, 112, 101]);
// -> Rope
```


### .toCharCode
```javascript
lasso.toCharCode('s');
// -> [115]

lasso.toCharCode('Rope');
// -> [82, 111, 112, 101]
```


### .toCurrency

```javascript
lasso.toCurrency(1000.49);
// -> $1,000.49
```

You can use a custom prefix, by including as the first argument

```javascript
lasso.toCurrency('¢', 1000.49);
// -> ¢1,000.49
```


### .toPercentage

```javascript
lasso.toPercentage(10);
// -> 10%
```


### Trim End

```javascript
var match = lasso.trimEnd('Love   ');
// -> 'Love'
```


### Trim Start

```javascript
  var match = lasso.trimStart('   Love');
  // -> 'Love'
```

### Trim Start Until

```javascript
  var match = lasso.trimStartUntil('Love this', 't');
  // -> 'this'
```

```javascript
  var match = lasso.trimStartUntil('Love this', /t/);
  // -> 'this'
```



### Chain methods together

```javascript
lasso('What is %0?')
.template('Rope')
.splice(1, 0, 'SPLICE')
.value;
// -> WSPLICEhat is Rope?
```



### Including the module with Node JS (CommonJS)

```javascript
var lasso = require('lasso');
```
