class ViewInterface {

	constructor( service ) {
		this.service = service;
	}

	init() {
		$( () => {
			this.service.get( 'slider' ).init();
			this.service.get( 'tabs' ).init();
			this.service.get( 'upButton' ).init();
		});
	}

}

export default ViewInterface;