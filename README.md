## Rope
#### An interface for editing strings

## Methods

### .splice
```javascript
rope.splice('string', 1, 0, 'INSERT');
// -> sINSERTtring
```

### .template
```javascript
rope.template('Use %s to template a string', 'Rope');
// -> Use Rope to template a string
```

You can also reference indexes:

```javascript
rope.template('indexed %0', 'values');
// -> indexed values
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
rope('What is %0?')
.template('Rope')
.splice(1, 0, 'SPLICE')
.value;
// -> WSPLICEhat is Rope?
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
