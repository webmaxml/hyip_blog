import Backbone from 'backbone';

class PostTabsPaneController {

	constructor( tabs, pane, paneView ) {
		_.extend( this, Backbone.Events );

		this.tabs = tabs;
		this.pane = pane;
		this.paneView = paneView;
	}

	init() {
		this.paneView.init( this );

		this.listenTo( this.pane, 'change:active', this.setActive );
	}

	//------------------------------ Model callbacks -------------------------------
	
	setActive( model, active ) {
		if ( active ) {
			this.paneView.renderActive();
		} else {
			this.paneView.renderInactive();
		}
	}

}

export default PostTabsPaneController;