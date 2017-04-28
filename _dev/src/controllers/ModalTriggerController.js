import Backbone from 'backbone';

class ModalTriggerController {

	constructor( modal, triggerView ) {
		_.extend( this, Backbone.Events );

		this.modal = modal;
		this.triggerView = triggerView;
	}

	init() {
		this.triggerView.init( this );
	}

	//------------------------------ View callbacks -------------------------------

	handleClick( event ) {
		event.preventDefault();
		this.modal.set({ active: true });
	}

}

export default ModalTriggerController;