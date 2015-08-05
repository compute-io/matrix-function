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

#### matrixfcn( fcn, ...matrix[, options] )

Applies a `function` to each [`matrix`](https://github.com/dstructs/matrix) element.

``` javascript

```


## Examples

``` javascript

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
