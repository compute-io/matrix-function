'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {String} [options.dtype] - output data type
* @param {Boolean} [options.output] - boolean indicating whether an output matrix has been provided
* @param {Function} [options.fcn] - function to apply
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'apply()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'apply()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'output' ) ) {
		opts.output = options.output;
		if ( !isBoolean( opts.output ) ) {
			return new TypeError( 'apply()::invalid option. Output option must be a boolean primitive. Option: `' + opts.output + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'fcn' ) ) {
		opts.fcn = options.fcn;
		if ( !isFunction( opts.fcn ) ) {
			return new TypeError( 'apply()::invalid option. Function option must be a function. Option: `' + opts.fcn + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
