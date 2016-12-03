// entries
import '../pug/index.pug';
import '../sass/index.scss';
// deps
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import util from '../../utilities';
// interfaces
import { ServiceLocator } from '../../classes/ServiceContainer';

export class IUIFacade {

	init() {
		util.throwError( this );
	}

}

export class UIFacade extends IUIFacade {

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
		console.log( 'ui init' );
	}

};

