class DomainFacade {

	constructor( controller ) {
		this.controller = controller;
	}

	retrievePlans( cb ) {
		this.controller.retrievePlans( cb );
	}

}

export default DomainFacade;