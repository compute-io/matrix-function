/* jshint evil:true */
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isFunction = require( 'validate.io-function' );


// APPLY //

/**
* FUNCTION: apply( [fcn,] num )
*	Returns a function for applying a function to each matrix element.
*
* @param {Function} [fcn] - function to apply. If not provided, a function must be provided at runtime.
* @param {Number} num - number of matrix arguments (including the output matrix)
* @returns {Function} apply function
*/
function apply() {
	var nargs = arguments.length,
		flg,
		num,
		fcn,
		n,
		f,
		i;

	if ( nargs === 1 ) {
		num = arguments[ 0 ];
		flg = true;
	}
	else if ( isFunction( arguments[ 0 ] ) ) {
		fcn = arguments[ 0 ];
		num = arguments[ 1 ];
		flg = false;
	}
	else {
		throw new TypeError( 'apply()::invalid input arguments. Must provide a function to apply and the number of matrix arguments. Values: `' + arguments + '`.' );
	}
	if ( !isNumber( num ) ) {
		throw new TypeError( 'apply()::invalid input arguments. Parameter specifying the number of matrix arguments must be a number primitive. Value: `' + num + '`.' );
	}
	n = num - 1;

	// Initialize the code string with a prefix based on whether a function will be created in the local or global scope...
	if ( flg ) {
		f = 'return ';
	} else {
		f = '(';
	}
	// Code generation. Start with the function definition...
	f += 'function apply(';

	// Check if a function will be provided at runtime...
	if ( flg ) {
		f += 'fcn,';
	}
	// Create the matrix arguments...
	// => function apply( [fcn,] out, m1, m2,...) {
	f += 'out,';
	for ( i = 1; i < num; i++ ) {
		f += 'm' + i;
		if ( i < n ) {
			f += ',';
		}
	}
	f += '){';

	// Create the function body...

	// Create internal variables...
	// => var M, N, i, j;
	f += 'var M,N,i,j;';

	// Perform shape validation (where we assume all input args are matrices)...
	f += 'M=out.shape[0];';
	f += 'N=out.shape[1];';
	for ( i = 1; i < num; i++ ) {
		f += 'if(m'+i+'.shape[0]!==M||m'+i+'.shape[1]!==N){';
		f += 'throw new Error(\'apply()::invalid input argument. All matrices must have the same dimensions.\');';
		f += '}';
	}
	/*
		var M, N,
			i, j;

		M = out.shape[ 0 ];
		N = out.shape[ 1 ];
		if ( m1.shape[0] !== M || m1.shape[1] !== N ) {
			throw new Error(...);
		}
		...
	*/

	// Apply the function to each matrix element...
	f += 'for(i=0;i<M;i++){';
	f += 'for(j=0;j<N;j++){';
	f += 'out.set(i,j,fcn(';
	for ( i = 1; i < num; i++ ) {
		f += 'm' + i + '.get(i,j)';
		if ( i < n ) {
			f += ',';
		}
	}
	f += '));';
	f += '}}';
	/*
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, fcn( m1.get(i,j), m2.get(i,j),...) );
			}
		}
	*/

	// Return the output matrix...
	f += 'return out;';

	// Close the function:
	f += '}';

	// Create the function in either the local or global scope...
	if ( flg ) {
		// Global...
		f += ';';
		return ( new Function ( f ) )();
	}
	// Local...
	f += ')';
	return eval( f );
	/*
		function apply( [fcn,] out, m1, m2,...) {
			var M, N,
				i, j;

			M = out.shape[ 0 ];
			N = out.shape[ 1 ];
			if ( m1.shape[0] !== M ||
				m1.shape[1] !== N
			) {
				throw new Error(...);
			}
			...
			for ( i = 0; i < M; i++ ) {
				for ( j = 0; j < N; j++ ) {
					out.set( i, j, fcn( m1.get(i,j), m2.get(i,j),...) );
				}
			}
			return out;
		}
	*/
} // end FUNCTION apply()


// EXPORTS //

module.exports = apply;