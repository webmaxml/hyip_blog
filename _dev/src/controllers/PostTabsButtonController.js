import Backbone from 'backbone';

class PostTabsButtonController {

	constructor( tabs, button, buttonView ) {
		_.extend( this, Backbone.Events );

		this.tabs = tabs;
		this.button = button;
		this.buttonView = buttonView;
	}

	init() {
		this.buttonView.init( this );

		this.listenTo( this.button, 'change:active', this.setActive );
	}

	//------------------------------ View callbacks -------------------------------

	clickHandle( event ) {
		let activeIndex = +$( event.target ).data( 'index' );
		this.tabs.set({ activeIndex });
	}

	//------------------------------ Model callbacks -------------------------------
	
	setActive( model, active ) {
		if ( active ) {
			this.buttonView.renderActive();
		} else {
			this.buttonView.renderInactive();
		}
	}

}

export default PostTabsButtonController;