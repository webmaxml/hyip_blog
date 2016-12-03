// deps
import util from '../../utilities';
// interfaces
import { ServiceLocator } from '../../classes/ServiceContainer';

export class IDomainFacade {

	init() {
		util.throwError( this );
	}

}

export class DomainFacade extends IDomainFacade {

	constructor( service ) {
		super();
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
		console.log( 'domain init' );
	}

};

