// deps
import util from '../utilities';
// interfaces
import { ServiceLocator } from './ServiceContainer';
import { IDomainFacade } from '../domain/classes/DomainFacade';
import { IUIFacade } from '../ui/classes/UIFacade';

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
			case 'domainFacade':
				dep = this._service.get( 'domainFacade' );
				util.checkInstance( dep, IDomainFacade );
				break;
			case 'uiFacade':
				dep = this._service.get( 'uiFacade' );
				util.checkInstance( dep, IUIFacade );
				break;
			default:
				throw new ReferenceError( `'${depName}' dependency is not found in ${this.constructor.name}` );
		}

		return dep;
	}

	init() {
		this._getDep( 'domainFacade' ).init();
		this._getDep( 'uiFacade' ).init();
	}
}

