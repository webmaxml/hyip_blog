// deps
import util from '../utilities';
// interfaces
import { ServiceLocator } from './ServiceContainer';
import { Test } from './Test';

/**
 * Instantiate main app objects
 */

export class App {

	constructor( service ) {
		util.checkInstance( service, ServiceLocator );
		this._service = service;
	}

	_getDep( depName ) {
		let dep;
		switch ( depName ) {
			default:
				throw new ReferenceError( `'${depName}' dependency is not found in ${this.constructor.name}` );
		}

		return dep;
	}

	init() {
		let test = new Test();
		test.init();
	}
}

