import { Test } from './Test';

export class App {

	constructor( service ) {
		this.service = service;
	}

	init() {
		let test = new Test();
		test.init();

		this.service.get( 'view' ).init();
	}
}

