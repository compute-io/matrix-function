'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// APPLY //

/**
* FUNCTION: apply( fcn, ...matrix[, opts] )
*	Applies a function to each matrix element.
*
* @param {Function} fcn - function to apply
* @param {...Matrix} matrix - input matrices
* @param {Object} [opts] - function options
* @param {String} [opts.dtype="float64"] - output data type
* @param {Boolean} [opts.output=false] - boolean indicating whether an output matrix has been provided
* @returns {Matrix} output matrix
*/
function apply() {
	var nargs = arguments.length,
		args = new Array( nargs ),
		opts = {},
		err,
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
		err = validate( opts, args[ nargs-1 ] );
		if ( err ) {
			throw err;
		}
		nargs -= 1;
		args.length = nargs;
	}
	fcn = args.shift();
	nargs -= 1;
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'apply()::invalid input argument. First argument must be a function. Value: `' + fcn + '`.' );
	}
	for ( i = 0; i < nargs; i++ ) {
		x = args[ i ];
		if ( !isMatrixLike( x ) ) {
			throw new TypeError( 'apply()::invalid input argument. Input data structures must be matrices. Value: `' + x + '`.' );
		}
		if ( i === 0 ) {
			M = x.shape[ 0 ];
			N = x.shape[ 1 ];
		}
		else if (
			x.shape[ 0 ] !== M ||
			x.shape[ 1 ] !== N
		) {
			throw new Error( 'apply()::invalid input argument. All input matrices must have the same dimensions.' );
		}
	}
	if ( opts.output ) {
		out = args.shift();
		nargs -= 1;
	} else {
		dt = opts.dtype || 'float64';
		out = matrix( x.shape, dt );
	}
	if ( nargs <= 0 ) {
		throw new TypeError( 'apply()::insufficient input arguments. Must provide input matrices.' );
	}
	arr = new Array( nargs );
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			for ( k = 0; k < nargs; k++ ) {
				arr[ k ] = args[ k ].get( i, j );
			}
			out.set( i, j, fcn.apply( null, arr ) );
		}
	}
	return out;
} // end FUNCTION apply()


// EXPORTS //

module.exports = apply;
