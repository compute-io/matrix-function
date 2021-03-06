/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( 'dstructs-matrix' ),
	noop = require( './fixtures/noop.js' ),
	add1 = require( './fixtures/add1.js' ),
	add = require( './fixtures/add.js' ),
	apply = require( './../lib/apply.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'apply', function tests() {

	it( 'should export a function', function test() {
		expect( apply ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a function', function test() {
		var values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				apply( value, matrix([5,5]) );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				apply( noop, matrix([5,5]), value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				apply( noop, matrix([5,5]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if not provided input matrices', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			apply( noop, {
				'out': true
			});
		}
	});

	it( 'should throw an error if not provided matrix-like arguments', function test() {
		var values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( TypeError );
			expect( badValue2( values[i] ) ).to.throw( TypeError );
			expect( badValue3( values[i] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				apply( noop, value );
			};
		}
		function badValue2( value ) {
			return function() {
				apply( noop, matrix([5,5]), value, {} );
			};
		}
		function badValue3( value ) {
			return function() {
				apply( noop, matrix([5,5]), matrix([5,5]), value, {} );
			};
		}
	});

	it( 'should throw an error if provided incompatible matrix-like arguments', function test() {
		var values = [
			matrix([4,4]),
			matrix([0,0]),
			matrix([5,4])
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				apply( noop, matrix([5,5]), value );
			};
		}
	});

	it( 'should apply a function to a single matrix', function test() {
		var mat,
			out,
			d, i;

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 1;
		}
		mat = matrix( d, [2,2], 'int8' );

		out = apply( add1, mat );
		assert.strictEqual( out.toString(), '2,2;2,2' );
	});

	it( 'should apply a function to multiple matrices', function test() {
		var mat1,
			mat2,
			out,
			d, i;

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 1;
		}
		mat1 = matrix( d, [2,2], 'int8' );

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 2;
		}
		mat2 = matrix( d, [2,2], 'int8' );

		out = apply( add, mat1, mat2 );
		assert.strictEqual( out.toString(), '3,3;3,3' );
	});

	it( 'should apply a function and return a matrix having a specified type', function test() {
		var mat,
			out,
			d, i;

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 1;
		}
		mat = matrix( d, [2,2], 'int8' );

		out = apply( add1, mat, {
			'dtype': 'float32'
		});
		assert.strictEqual( out.dtype, 'float32' );
		assert.strictEqual( out.toString(), '2,2;2,2' );
	});

	it( 'should apply a function to a single matrix and use a provided output matrix', function test() {
		var mat,
			out,
			actual,
			d, i;

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 1;
		}
		mat = matrix( d, [2,2], 'int8' );

		out = matrix( [2,2] );
		actual = apply( add1, out, mat, {
			'out': true
		});
		assert.strictEqual( out, actual );
		assert.strictEqual( out.toString(), '2,2;2,2' );
	});

});
