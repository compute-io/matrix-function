/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( 'dstructs-matrix' ),
	noop = require( './fixtures/noop.js' ),
	add1 = require( './fixtures/add1.js' ),
	add = require( './fixtures/add.js' ),
	create = require( './../lib/create.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'create apply', function tests() {

	it( 'should export a function', function test() {
		expect( create ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided the number of input matrices', function test() {
		var values = [
			'5',
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
				create( value );
			};
		}
	});

	it( 'should throw an error if an apply function argument which is not a function', function test() {
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
				create( value, 4 );
			};
		}
	});

	it( 'should return a function', function test() {
		var apply;

		apply = create( 4 );
		expect( apply ).to.be.a( 'function' );

		apply = create( noop, 4 );
		expect( apply ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided incompatible matrix-like arguments', function test() {
		var values,
			apply1,
			apply2;

		values = [
			matrix([4,4]),
			matrix([0,0]),
			matrix([5,4])
		];

		apply1 = create( 2 );
		apply2 = create( noop, 2 );

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( Error );
			expect( badValue2( values[i] ) ).to.throw( Error );
		}
		function badValue1( value ) {
			return function() {
				apply1( noop, matrix([5,5]), value );
			};
		}
		function badValue2( value ) {
			return function() {
				apply2( matrix([5,5]), value );
			};
		}
	});

	it( 'should apply a function to a single matrix', function test() {
		var apply,
			actual,
			mat,
			out,
			d, i;

		d = new Int8Array( 4 );
		for ( i = 0; i < d.length; i++ ) {
			d[ i ] = 1;
		}
		mat = matrix( d, [2,2], 'int8' );

		// General apply...
		out = matrix( [2,2] );

		apply = create( 2 );
		actual = apply( add1, out, mat );

		assert.strictEqual( actual, out );
		assert.strictEqual( out.toString(), '2,2;2,2' );

		// Apply a particular function...
		out = matrix( [2,2] );
		apply = create( add1, 2 );

		actual = apply( out, mat );
		assert.strictEqual( out.toString(), '2,2;2,2' );
	});

	it( 'should apply a function to multiple matrices', function test() {
		var apply,
			actual,
			mat1,
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

		// General apply...
		out = matrix( [2,2] );
		apply = create( 3 );

		actual = apply( add, out, mat1, mat2 );
		assert.strictEqual( actual, out );
		assert.strictEqual( out.toString(), '3,3;3,3' );

		// Apply a particular function...
		out = matrix( [2,2] );
		apply = create( add, 3 );

		actual = apply( out, mat1, mat2 );
		assert.strictEqual( actual, out );
		assert.strictEqual( out.toString(), '3,3;3,3' );
	});

});
