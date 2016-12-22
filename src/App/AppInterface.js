import { Test } from './Test';

class AppInterface {

	constructor( service ) {
		this.service = service;
	}

	init() {
		let test = new Test();
		test.init();

		this.service.get( 'view' ).init();
	}
}

export default AppInterface;
