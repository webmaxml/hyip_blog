import Backbone from 'backbone';

class ModalWindowController {

	constructor( modal, windowView ) {
		_.extend( this, Backbone.Events );

		this.modal = modal;
		this.windowView = windowView;
	}

	init() {
		this.windowView.init( this );

		this.listenTo( this.modal, 'change:active', this.setActive );
	}

	//------------------------------ View callbacks -------------------------------

	handleClick( event ) {
		this.modal.set({ active: false });
	}

	//------------------------------ Model callbacks -------------------------------

	setActive( model, active ) {
		if ( active ) {
			this.windowView.show();
		} else {
			this.windowView.hide();
		}
	}
}

export default ModalWindowController;