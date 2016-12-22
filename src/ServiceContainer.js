import util from './utilities';

/**
 * Contains all app services
 */

export class ServiceContainer {

	constructor() {
		this._locator = null;
		this._serviceMap = {};
		this._instanceCache = {};
	}

	/**
	 * @param {Object} locator - object to implement as a dependency to all services;
	 */

	setLocator( locator ) {
		util.checkInstance( locator, ServiceLocator );
		this._locator = locator;
	}

	/**
	 * @param {string} key - the name of the service
	 * @param {Class} value - service Class
	 */

	add( key, ClassName ) {
		if ( this._locator === null ) {
			throw new Error( 'You must set the locator before registering a service' );
		}

		if ( typeof ClassName !== 'function' ) {
			throw new TypeError( `cannot register service '${key}': its not a function` );
		}

		if ( typeof key !== 'string' ) {
			throw new TypeError( `the name of a service should be string, not ${typeof key}` );
		}

		if ( typeof this._serviceMap[ key ] !== 'undefined' ) {
			throw new ReferenceError( `the name '${key}' is already used by a service` );
		}

		this._serviceMap[ key ] = () => new ClassName( this._locator );
	}

	/**
	 * @param {string} key - the name of the service
	 * @return {Object} - service instance
	 */

	_retreiveNew( key ) {
		if ( typeof this._instanceCache[ key ] !== 'undefined' ) {
			console.warn( 'Warning: you are trying to create new instance of the service, ' +  
						  'which was used as a singleton. The old instance is now deleted.' );
			delete this._instanceCache[ key ];
		}

		return this._serviceMap[ key ]();
	}

	/**
	 * @param {string} key - the name of the service
	 * @return {Object} - service instance
	 */

	_retreiveSingleton( key ) {
		if ( typeof this._instanceCache[ key ] === 'undefined' ) {
			this._instanceCache[ key ] = this._serviceMap[ key ]();
		}

		return this._instanceCache[ key ];
	}

	/**
	 * @param {string} key - the name of the service
	 * @param {boolean} [ singleton=false ] - return singleton or create new
	 * @return {Object} - service instance
	 */

	get( key, singleton=false ) {
		if ( typeof this._serviceMap[ key ] !== 'function' ) { 
			throw new ReferenceError( `cannot find service named '${key}'` );
		}

		if ( typeof singleton !== 'boolean' ) { 
			throw new TypeError( `the second parameter of 'get' method should be boolean` );
		}

		if ( singleton ) {
			return this._retreiveSingleton( key );
		}

		return this._retreiveNew( key );
	}

}

/**
 * Implements as an only dependency into services,
 * retrieves the needed service by delegating to ServiceContainer
 */

export class ServiceLocator {

	/**
	 * @param {Object} container - instance of ServiceContainer
	 */

	constructor( container ) {
		util.checkInstance( container, ServiceContainer );
		this._container = container;
	}

	/**
	 * @param {string} key - the name of the service
	 * @param {boolean} [ singleton=false ] - return singleton or create new
	 * @return {Object} - service instance
	 */

	get( key, singleton=false ) {
		return this._container.get( key, singleton );
	}

}
