import Backbone from 'backbone';

class WindowController {

	constructor( windowModel, windowView ) {
		_.extend( this, Backbone.Events );

		this.windowModel = windowModel;
		this.windowView = windowView;
	}

	init() {
		this.windowView.init( this );
	}

	//------------------------------ View callbacks -------------------------------

	handleScroll( event ) {
		this.windowModel.set({ vCoord: window.pageYOffset });
	}

}

export default WindowController;