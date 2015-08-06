/* jshint evil:true */
'use strict';

/**
* FUNCTION: apply( fcn, nargs )
*	Returns a function for applying a function to each matrix element.
*
* @param {Function} fcn - function to applying
* @param {Number} nargs - number of matrix arguments (including the output matrix)
* @returns {Function} apply function
*/
function apply( fcn, nargs ) {
	var n = nargs - 1,
		f,
		i;

	// Code generation. Start with the function definition...
	f = 'return function apply(';

	// Create the matrix arguments...
	// => function apply( out, m0, m1,...) {
	f += 'out,';
	for ( i = 1; i < nargs; i++ ) {
		f += 'm' + i;
		if ( i < n ) {
			f += ',';
		}
	}
	f += '){';

	// Create the function body...

	// Create internal variables...
	// => var len=nargs, M, N, i, j;
	f += 'var len=' + nargs + ',';
	f += 'M,N,i,j;';

	// Perform shape validation (where we assume all input args are matrices)...
	f += 'M=out.shape[0];';
	f += 'N=out.shape[1];';
	for ( i = 1; i < nargs; i++ ) {
		f += 'if(m'+i+'.shape[0]!==M||m'+i+'.shape[1]!==N){';
		f += 'throw new Error(\'apply()::invalid input argument. All matrices must have the same dimensions.\');';
		f += '}';
	}
} // end FUNCTION apply()


// EXPORTS //

module.exports = apply;
