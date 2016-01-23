var should = require('chai').should();
var lasso = require('./lasso.min.js');

describe('Testing the string functions', function () {
  it('lasso.camelCase: Converts invalid JavaScript names to valid names', function () {
    lasso.camelCase('Let\'s convert this').should.equal('letsConvertThis');
  });
  it('lasso.camelCase (dashes): Converts invalid JavaScript names to valid names', function () {
    lasso.camelCase('camel-case-this').should.equal('camelCaseThis');
  });
  it('lasso.camelCase (double dashes): Converts invalid JavaScript names to valid names', function () {
    lasso.camelCase('-js-qiktracker-button--close').should.equal('jsQiktrackerButtonClose');
  });
  it('lasso.splice: Splices a string into another string', function () {
    lasso.splice('AB', 1, 0, '-text-').should.equal('A-text-B');
  });
  it('lasso.template: Templates a string with indexes or non indexed values', function () {
    lasso.template('This %s equal some value %1', 'should', 'like this').should.equal('This should equal some value like this');
  });
  it('lasso.toCharCode: Returns an array of mapped character values', function () {
    lasso.toCharCode('Lasso').should.eql([76, 97, 115, 115, 111]);
  });
  it('lasso.indexesOf (regExp): Returns an Array of objects', function () {
    lasso.indexesOf('This will index the i', /i/).should.eql([{
      index : 2, length : 1, match : 'i'
    }, {
      index : 6, length : 1, match : 'i'
    }, {
      index : 10, length : 1, match : 'i'
    }, {
      index : 20, length : 1, match : 'i'
    }]);
  });
  it('lasso.indexesOf (string): Returns an Array of objects', function () {
    lasso.indexesOf('This will index the i', 'i').should.eql([{
      index : 2, length : 1, match : 'i'
    }, {
      index : 6, length : 1, match : 'i'
    }, {
      index : 10, length : 1, match : 'i'
    }, {
      index : 20, length : 1, match : 'i'
    }]);
  });
  it('lasso.between (basic): Returns an Array of objects', function () {
    lasso.between('This) is (between)', '(', ')').should.eql([ { length: 7,
    index: 10,
    capture: { index: 9, length: 9, value: '(between)' },
    value: 'between' } ]);
  });
  it('lasso.between (smart open): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick %if($value, ($value)) %if($value, ($value))', '%if(', ')').should.eql([ { length: 16,
    index: 42,
    capture: { index: 38, length: 21, value: '%if($value, ($value))' },
    value: '$value, ($value)' },
  { length: 16,
    index: 20,
    capture: { index: 16, length: 21, value: '%if($value, ($value))' },
    value: '$value, ($value)' } ]);
  });
  it('lasso.between (smart open RegExp): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick %if($value, ($value)) %if($value, ($value))', /%if\(/, ')').should.eql([ { length: 16,
    index: 42,
    capture: { index: 38, length: 21, value: '%if($value, ($value))' },
    value: '$value, ($value)' },
  { length: 16,
    index: 20,
    capture: { index: 16, length: 21, value: '%if($value, ($value))' },
    value: '$value, ($value)' } ]);
  });
  it('lasso.between (smart closed): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick ($value, ($value))%if ($value, ($value))%if', '(', ')%if').should.eql([ { length: 16,
    index: 39,
    capture: { index: 38, length: 21, value: '($value, ($value))%if' },
    value: '$value, ($value)' },
  { length: 16,
    index: 17,
    capture: { index: 16, length: 21, value: '($value, ($value))%if' },
    value: '$value, ($value)' } ]);
  });
  it('lasso.between (smart closed RegExp): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick ($value, ($value))%if ($value, ($value))%if', '(', /\)%if/).should.eql([ { length: 16,
    index: 39,
    capture: { index: 38, length: 21, value: '($value, ($value))%if' },
    value: '$value, ($value)' },
  { length: 16,
    index: 17,
    capture: { index: 16, length: 21, value: '($value, ($value))%if' },
    value: '$value, ($value)' } ]);
  });
  it('lasso.between (smart closed RegExp non matching open and closed): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick ($value, ($value)%if', '(', /\)%if/).should.eql([ { length: 6,
    index: 26,
    capture: { index: 25, length: 11, value: '($value)%if' },
    value: '$value' } ]);
  });
  it('lasso.between (smart closed no matches): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick ($value, ($value%if', '(', ')%if').should.eql([]);
  });
  it('lasso.between (smart closed RegExp no matches): Returns an Array of objects', function () {
    lasso.between('*** Part: $nick ($value, ($value%if', '(', /\)%if/).should.eql([]);
  });
  it('lasso chain: Chain lasso functions together', function () {
    lasso('this string').camelCase().toCharCode().value.should.eql([116, 104, 105, 115, 83, 116, 114, 105, 110, 103]);
  });
  it('lasso group: Group numbers small number', function () {
    lasso.group(100).should.equal('100');
  });
  it('lasso group: Group numbers', function () {
    lasso.group(1000).should.equal('1,000');
  });
  it('lasso group: Group larger numbers', function () {
    lasso.group(1234567).should.equal('1,234,567');
  });
  it('lasso group: Group larger numbers with decimal', function () {
    lasso.group(234567.598).should.equal('234,567.598');
  });
  it('lasso group: Group larger numbers with decimal', function () {
    lasso.group(1234567.598).should.equal('1,234,567.598');
  });
  it('lasso toCurrency: An argument without a prefix', function () {
    lasso.toCurrency(59.99).should.equal('$59.99');
  });
  it('lasso toCurrency: An argument without a prefix that is negative', function () {
    lasso.toCurrency(-59.99).should.equal('-$59.99');
  });
  it('lasso toCurrency: An argument with a prefix', function () {
    lasso.toCurrency('$', 59.99).should.equal('$59.99');
  });
  it('lasso toCurrency: An argument with a prefix that is negative', function () {
    lasso.toCurrency('$', -59.99).should.equal('-$59.99');
  });
  it('lasso toCurrency: An argument with a prefix and a number as a string', function () {
    lasso.toCurrency('$', '59.99').should.equal('$59.99');
  });
  it('lasso toCurrency: An argument with a prefix and a number as a string that is negative', function () {
    lasso.toCurrency('$', '-59.99').should.equal('-$59.99');
  });
  it('lasso same words: Find the same words in a string', function () {
    lasso.sameWords('a a b c', 'a a').should.eql(['a']);
  });
  it('lasso same words: Find the same words in a string', function () {
    lasso.differentWords('a b c d', 'a d f b').should.eql(['c', 'f']);
  });
  it('lasso distance: Find the distance between two strings', function () {
    lasso.distance('This distance', 'That distant').should.equal(4);
  });
  it('lasso toChar: Convert an integer value to a Character', function () {
    lasso.toChar(76).should.equal('L');
  });
  it('lasso toChar: Convert an integer value to a Character (chained)', function () {
    lasso('Love').toCharCode().toChar().value.should.equal('Love');
  });
});
