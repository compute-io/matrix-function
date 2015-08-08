'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number-primitive' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	create = require( './create.js' );


// FACTORY //

/**
* FUNCTION: factory( num[, options] )
*	Returns a function for applying a function to each matrix element.
*
* @param {Number} num - number matrix arguments
* @param {Object} [options] - function options
* @param {String} [options.dtype="float64"] - output data type
* @param {Function} [options.fcn] - function to apply
* @returns {Function} apply function
*/
function factory( num, options ) {
	var opts = {},
		matrixFcn,
		err,
		flg,
		dt;

	if ( !isNumber( num ) ) {
		throw new TypeError( 'apply()::invalid input argument. First argument must be a number primitive. Value: `' + num + '`.' );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dt = opts.dtype || 'float64';
	flg = !!opts.fcn;
	if ( flg ) {
		matrixFcn = create( opts.fcn, num );
	} else {
		matrixFcn = create( num );
	}
	/**
	* FUNCTION: apply( [fcn,]...matrix )
	*	Applies a function to each matrix element.
	*
	* @private
	* @param {Function} [fcn] - function to apply
	* @param {...Matrix} matrix - input matrices
	* @returns {Matrix} output matrix
	*/
	return function apply() {
		var nargs = arguments.length,
			args = new Array( nargs ),
			k = 0,
			fcn,
			out,
			i;

		for ( i = 0; i < nargs; i++ ) {
			args[ i ] = arguments[ i ];
		}
		if ( flg ) {
			fcn = args[ 0 ];
			k = 1;
			if ( !isFunction( fcn ) ) {
				throw new TypeError( 'apply()::invalid input argument. First argument must be a function. Value: `' + fcn + '`.' );
			}
		}
		for ( i = k; i < nargs; i++ ) {
			if ( !isMatrixLike( args[ i ] ) ) {
				throw new TypeError( 'apply()::invalid input argument. Input data structures must be matrices. Value: `' + args[ i ] + '`.' );
			}
		}
		out = matrix( args[ k ].shape, dt );
		if ( flg ) {
			// Make sure that the output matrix comes after the function to apply...
			args.unshift( null );
			args[ 0 ] = fcn;
			args[ 1 ] = out;
		} else {
			args.unshift( out );
		}
		return matrixFcn.apply( null, args );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
