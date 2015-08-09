Matrix Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Applies a function to each [matrix](https://github.com/dstructs/matrix) element.


## Installation

``` bash
$ npm install compute-matrix-function
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var matrixfun = require( 'compute-matrix-function' );
```

#### matrixfun( fcn, ...matrix[, options] )

Applies a `function` to each [`matrix`](https://github.com/dstructs/matrix) element.

``` javascript
var matrix = require( 'dstructs-matrix' );

var mat = matrix( [5,5], 'int8' );
/*
    [ 0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0 ]
*/

function add5( val ) {
	return val + 5;
}

var out = matrixfun( add5, mat );
/*
    [ 5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5 ]
*/
```

The function accepts the following `options`:

*	__dtype__: output data type. Default: `float64`.
*	__output__: `boolean` indicating whether an output [`matrix`](https://github.com/dstructs/matrix) has been provided. Default: `false`.

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var out = matrixfun( add, mat, {
	'dtype': 'int8';
});
/*
    [ 5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5 ]
*/
var dtype = out.dtype;
// returns 'int8'
```

By default, the `function` returns a new [`matrix`](https://github.com/dstructs/matrix). To mutate a [`matrix`](https://github.com/dstructs/matrix) (e.g., when input values can be discarded or when optimizing memory usage), set the `output` option to `true` to indicate that an output [`matrix`](https://github.com/dstructs/matrix) has been provided as the __first__ [`matrix`](https://github.com/dstructs/matrix) argument.

``` javascript
var out = matrix( [5,5], 'int8' );
/*
    [ 0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0
      0 0 0 0 0 ]
*/

matrixfun( add, out, mat, {
	'output': 'true';
});
/*
      [ 5 5 5 5 5
        5 5 5 5 5
out =   5 5 5 5 5
        5 5 5 5 5
        5 5 5 5 5 ]
*/
```

===
### Factory

The main exported `function` does __not__ make any assumptions regarding the number of input [`matrices`](https://github.com/dstructs/matrix). To create a reusable [`matrix`](https://github.com/dstructs/matrix) function where the number of input [`matrices`](https://github.com/dstructs/matrix) is known, a factory method is provided.


#### matrixfun.factory( [fcn,] num[, options] )

Creates an apply `function` to apply a `function` to each [`matrix`](https://github.com/dstructs/matrix) element.

``` javascript
var mfun = matrixfun.factory( 2 );

function add( x, y ) {
	return x + y;
}

var mat1 = matrix( [5,5], 'int8' ),
	mat2 = matrix( [5,5], 'int8' );

for ( var i = 0; i < 5; i++ ) {
	for ( var j = 0; j < 5; j++ ) {
		mat1.set( i, j, 5 );
		mat2.set( i, j, i*5 + j );
	}
}
/*
       [ 5 5 5 5 5
         5 5 5 5 5
mat1 =   5 5 5 5 5
         5 5 5 5 5
         5 5 5 5 5 ]

       [  0  1  2  3  4
          5  6  7  8  9
mat2 =   10 11 12 13 14
         15 16 17 18 19
         20 21 22 23 24 ]
*/

var out = mfun( add, mat1, mat2 );
/*
    [  5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
      25 26 27 28 29 ]
*/
```

The function accepts the following `options`:

*	__dtype__: output data type. Default: `float64`.

An apply `function` may be provided during `function` creation.

``` javascript
var madd = matrixfun.factory( add, 2 );

var out = madd( mat1, mat2 );
/*
    [  5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
      25 26 27 28 29 ]
*/
```

__Note__: a factory `function` __always__ returns a new [`matrix`](https://github.com/dstructs/matrix).


===
### Create

To facilitate using [`matrix`](https://github.com/dstructs/matrix) functions within a larger library where input arguments are of known types and where memory management occurs externally, a method to create minimal [`matrix`](https://github.com/dstructs/matrix) functions is provided.

#### matrixfun.create( [fcn,] num )

Creates an apply `function` to apply a `function` to each [`matrix`](https://github.com/dstructs/matrix) element.

``` javascript
var mfcn = matrixfun.create( 2 );

var out = mfcn( add, out, mat1, mat2 );
/*
    [  5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
      25 26 27 28 29 ]
*/

function subtract( x, y ) {
	return x - y;
}

out = mfcn( subtract, out, mat2, mat1 );
/*
    [ -5 -4 -3 -2 -1
       0  1  2  3  4
       5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19 ]
*/
```

An apply `function` may be provided during `function` creation.

``` javascript
var madd = matrixfun.create( add, 2 );

var out = madd( out, mat1, mat2 );
/*
    [  5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
      25 26 27 28 29 ]
*/
```



===
### Raw

Lower-level APIs are provided which forgo some of the guarantees of the aboves APIs, such as input argument validation. While use of the above APIs are encouraged in REPL environments, use of the lower-level interfaces may be warranted when arguments are of a known type or when performance is paramount.

#### matrixfun.raw( fcn, ...matrix[, options] )




## Notes

*	Both exported factory methods, as well as the `.create()` method use `eval()`. Beware when using these methods in the browser as they may violate your [content security policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP) (CSP). 



## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	matrixfun = require( 'compute-matrix-function' );

var mat1,
	mat2,
	out,
	d, i;

d = new Int32Array( 25 );
for ( i = 0; i < d.length; i++ ) {
	d[ i ] = i;
}
mat1 = matrix( d, [5,5], 'int32' );
/*
    [  0  1  2  3  4
       5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24 ]
*/

d = new Int8Array( 25 );
for ( i = 0; i < d.length; i++ ) {
	d[ i ] = 5;
}
mat2 = matrix( d, [5,5], 'int8' );
/*
    [ 5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5
      5 5 5 5 5 ]
*/

function add( x, y ) {
	return x + y;
}

out = matrixfun( add, mat1, mat2 );
/*
    [  5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
      25 26 27 28 29 ]
*/
console.log( out.toString() );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-matrix-function.svg
[npm-url]: https://npmjs.org/package/compute-matrix-function

[travis-image]: http://img.shields.io/travis/compute-io/matrix-function/master.svg
[travis-url]: https://travis-ci.org/compute-io/matrix-function

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/matrix-function/master.svg
[codecov-url]: https://codecov.io/github/compute-io/matrix-function?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/matrix-function.svg
[dependencies-url]: https://david-dm.org/compute-io/matrix-function

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/matrix-function.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/matrix-function

[github-issues-image]: http://img.shields.io/github/issues/compute-io/matrix-function.svg
[github-issues-url]: https://github.com/compute-io/matrix-function/issues
