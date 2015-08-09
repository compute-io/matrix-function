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
* @param {Boolean} [opts.out=false] - boolean indicating whether an output matrix has been provided
* @returns {Matrix} output matrix
*/
function apply() {
	var nargs = arguments.length,
		args = new Array( nargs ),
		opts,
		fcn,
		out,
		arr,
		dt,
		M, N,
		idx, end, // start/end indices
		i, j, k, l;

	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}
	nargs -= 1;
	if ( !isMatrixLike( args[ nargs ] ) ) {
		opts = args[ nargs ];
		nargs -= 1;
	} else {
		opts = {};
	}
	end = nargs;
	fcn = args[ 0 ];
	if ( opts.out ) {
		out = args[ 1 ];
		idx = 2;
		nargs -= 1;
	} else {
		dt = opts.dtype || 'float64';
		out = matrix( args[ 1 ].shape, dt );
		idx = 1;
	}
	M = args[ 1 ].shape[ 0 ];
	N = args[ 1 ].shape[ 1 ];
	arr = new Array( nargs );
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			for ( l = 0, k = idx; k <= end; l++, k++ ) {
				arr[ l ] = args[ k ].get( i, j );
			}
			out.set( i, j, fcn.apply( null, arr ) );
		}
	}
	return out;
} // end FUNCTION apply()


// EXPORTS //

module.exports = apply;
