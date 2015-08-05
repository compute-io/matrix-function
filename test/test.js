/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrixfun = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-matrix-function', function tests() {

	it( 'should export a function', function test() {
		expect( matrixfun ).to.be.a( 'function' );
	});

});
