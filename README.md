## Rope
#### What lodash is to Arrays, Rope is to Strings

## Methods

### .splice
```javascript
rope.splice('string', 1, 0, 'INSERT');
// -> sINSERTtring
```

### .template
```javascript
rope.template('What %s is to %s, Rope is to %s', 'lodash', 'Arrays', 'Strings');
// -> What lodash is to Arrays, Rope is to Strings
```

You can also reference indexes:

```javascript
rope.template('What %0 is to %1, %2 is to %3. This is what makes %2 so powerful', 'lodash', 'Arrays', 'Rope', 'Strings');
// -> What lodash is to Arrays, Rope is to Strings. This is what makes Rope so powerful
```

### .toCharCode
```javascript
rope.toCharCode('s');
// -> [115]

rope.toCharCode('Rope');
// -> [82, 111, 112, 101]
```

### .indexesOf
```javascript
rope.indexesOf('Check out where the indexes of \'e\' are', 'e');
// -> [{ index : 3, length : 1, match : 'e'}, { index : 5, length : 1, match : 'e'}, { ... }]
```

Also works with a regular expression

```javascript
rope.indexesOf('Check out where the indexes of \'e\' are', /e/);
```

### Chain methods together

```javascript
rope('What %0 is to %1, %2 is to %3. This is what makes %2 so powerful')
.template('lodash', 'Arrays', 'Rope', 'Strings')
.splice(4, 0, 'SPLICE')
.value;
// -> WhatSPLICE lodash is to Arrays, Rope is to Strings. This is what makes Rope so powerful
```

### Adding your own methods to `rope`

In the `strung` object you have access to all the other `rope` methods. The value you have to mutate to the be compatible to the other methods is `strung.value`

```javascript
rope.fn.kebabCase = function (strung) {
  strung.value = strung.value.split(/ |_|-/).join('-').split('').map(function (a) {
    if (a.toUpperCase() === a && a !== '-') {
      return '-' + a.toLowerCase();
    }
    return a;
  }).join('').toLowerCase();
  return strung;
};
```
