import Backbone from 'backbone';

class Mediator {

	constructor() {
		_.extend( this, Backbone.Events );
	}

}

export default Mediator;