[![Circle CI](https://circleci.com/gh/SeanJM/lasso.svg?circle-token=5c:41:84:31:63:be:5f:4e:c9:b9:bd:5b:a3:d2:55:e3)](https://circleci.com/gh/SeanJM/lasso/tree/master)
## Lasso
#### An interface for editing strings

## Methods

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

### .toCharCode
```javascript
lasso.toCharCode('s');
// -> [115]

lasso.toCharCode('Rope');
// -> [82, 111, 112, 101]
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

### .camelCase
```javascript
lasso.camelCase('Let\'s JavaScript case this thing');
// -> letsJavascriptCaseThisThing
```

### .between

Basic usage

```javascript
lasso.between('This) is (between)', '(', ')');
// -> [ { length: 7, index: 10, capture: { index: 9, length: 9, value: '(between)' }, value: 'between' } ]
```

Smart capturing

```javascript
lasso.between('*** Part: $nick %if($value, ($value))', '%if(', ')');
// -> [ { length: 16, index: 42, capture: { index: 38, length: 21, value: '%if($value, ($value))' }, value: '$value, ($value)' } ]
```

Using Regular Expressions

```javascript
lasso.between('*** Part: $nick %if($value, ($value))', /%if\(/, ')');
// -> [ { length: 16, index: 42, capture: { index: 38, length: 21, value: '%if($value, ($value))' }, value: '$value, ($value)' } ]
```

### .group

```javascript
lasso.group(1000.49);
// -> 1,000.49
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

*Smart capturing will work forwards or backwards*

### Same words

```javascript
lasso.sameWords('a b c', 'a');
// -> ['a']
```
### Different words

```javascript
lasso.differentWords('a b c d', 'a d f b');
// -> ['c', 'f']
```

### Chain methods together

```javascript
lasso('What is %0?')
.template('Rope')
.splice(1, 0, 'SPLICE')
.value;
// -> WSPLICEhat is Rope?
```

### Contributing methods to `lasso`

To contribute a method create a file named `lasso.methodName.js` and put that in the `src` folder.

In this example, I am creating a method called `kebabCase`.

```javascript
lasso.kebabCase = function (string) {
  return string.split(/ |_|-/).join('-').split('').map(function (a) {
    if (a.toUpperCase() === a && a !== '-') {
      return '-' + a.toLowerCase();
    }
    return a;
  }).join('').toLowerCase();
};
```

### Including the module with Node JS (CommonJS)

```javascript
var lasso = require('lasso');
```
