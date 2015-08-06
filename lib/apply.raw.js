'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' );


// APPLY //

/**
* FUNCTION: apply( fcn, ...matrix[, opts] )
*	Applies a function to each matrix element.
*
* @param {Function} fcn - function to apply
* @param {...Matrix} matrix - input matrices
* @param {Object} [opts] - function options
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Matrix} output matrix
*/
function apply() {
	var nargs = arguments.length,
		args = new Array( nargs ),
		opts = {},
		fcn,
		out,
		arr,
		dt,
		M, N,
		x,
		i, j, k;

	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}
	if ( !isMatrixLike( args[ nargs-1 ] ) ) {
		opts = args[ nargs-1 ];
		nargs -= 1;
	}
	dt = opts.dtype || 'float64';
	fcn = args[ 0 ];
	arr = new Array( nargs-1 );
	out = matrix( x.shape, dt );
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			for ( k = 1; k < nargs; k++ ) {
				arr[ k ] = args[ k ].get( i, j );
			}
			out.set( i, j, fcn.apply( null, arr ) );
		}
	}
	return out;
} // end FUNCTION apply()


// EXPORTS //

module.exports = apply;
