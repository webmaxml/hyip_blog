import Backbone from 'backbone';

class UserPopupController {

	constructor( popup, popupView ) {
		_.extend( this, Backbone.Events );

		this.popup = popup;
		this.popupView = popupView;
	}

	init() {
		this.popupView.init( this );

		this.listenTo( this.popup, 'change:active', this.setActive );
	}

	//------------------------------ View callbacks -------------------------------

	handleMouseEnter( event ) {
		this.popup.set({ active: true });
	}

	handleMouseLeave( event ) {
		this.popup.set({ active: false });
	}

	handleTap( event ) {
		event.preventDefault();
		this.popup.toggleActive();
	}

	//------------------------------ Model callbacks -------------------------------

	setActive( model, active ) {
		if ( active ) {
			this.popupView.show();
		} else {
			this.popupView.hide();
		}
	}

}

export default UserPopupController;