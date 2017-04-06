import Backbone from 'backbone';

class UpButtonController {

	constructor( upButton, upButtonView ) {
		_.extend( this, Backbone.Events );

		this.upButton = upButton;
		this.upButtonView = upButtonView;
	}

	init() {
		this.upButtonView.init( this );

		this.listenTo( this.upButton, 'change:visible', this.setVisibility );
	}

	//------------------------------ View callbacks -------------------------------

	handleClick( event ) {
		$( "html, body" ).animate({ scrollTop: 0 }, "slow");
	}

	//------------------------------ Model callbacks -------------------------------

	setVisibility( model, visible ) {
		if ( visible ) {
			this.upButtonView.show();
		} else {
			this.upButtonView.hide();
		}
	}
}

export default UpButtonController;