const util = {

	checkInstance: function( instance, ClassName ) {
		if ( typeof instance !== 'object' ) {
			throw new TypeError( `checkInstance error: instance is ${typeof instance}, object expected (${ClassName.name} checking)` );
		}

		if ( typeof ClassName !== 'function' ) {
			throw new TypeError( `checkInstance error: class is ${typeof ClassName}, function expected (${instance.constructor.name} checking)` );
		}

		if ( !( instance instanceof ClassName) ) {
			throw new TypeError( `wrong type: ${instance.constructor.name} is not an instance of ${ClassName.name}` );
		}
	},

	throwError: function( instance ) {
		throw new TypeError( `unimplemented abstract method in ${instance.constructor.name}` );
	} 

}

export default util;