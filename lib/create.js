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

	// Initialize the code string with a prefix:
	f = '(';

	// Code generation. Start with the function definition...
	f += 'function apply(';

	// Create the matrix arguments...
	// => function apply( out, m1, m2,...) {
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
	// => var M, N, i, j;
	f += 'var M,N,i,j;';

	// Perform shape validation (where we assume all input args are matrices)...
	f += 'M=out.shape[0];';
	f += 'N=out.shape[1];';
	for ( i = 1; i < nargs; i++ ) {
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
	for ( i = 1; i < nargs; i++ ) {
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

	// Add a suffix:
	f += ')';

	// Create the function in the local scope:
	return eval( f );
	/*
		function apply( out, m1, m2,...) {
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
