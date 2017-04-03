import Backbone from 'backbone';

class CommentsRespondController {

	constructor( commentsRespond, commentsRespondView ) {
		_.extend( this, Backbone.Events );

		this.commentsRespond = commentsRespond;
		this.commentsRespondView = commentsRespondView;
	}

	init() {
		this.commentsRespondView.init( this );

		this.listenTo( this.commentsRespond, 'change:active', this.setActive );
	}

	//------------------------------ View callbacks -------------------------------

	handleClick( event ) {
		this.commentsRespond.toggleActive();
	}

	//------------------------------ Model callbacks -------------------------------

	setActive( model, active ) {
		if ( active ) {
			this.commentsRespondView.show();
		} else {
			this.commentsRespondView.hide();
		}
	}

}

export default CommentsRespondController;