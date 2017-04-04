class CommentsController {
	
	constructor( comments, commentsRespondFactory ) {
		this.comments = comments;
		this.commentsRespondFactory = commentsRespondFactory;

		this.respondControllers = [];
	}

	init() {
		this.createResponds();
		this.respondControllers.forEach( controller => controller.init() );
	}

	createResponds() {
		let $responds = $( document.getElementsByClassName( 'comments__box' )[0] ).find( '.commentsRespond' );

		$responds.each( function( i, elem ) {
			let model = this.comments.add({});
			let view = this.commentsRespondFactory.createView( elem );
			let controller = this.commentsRespondFactory.createController( model, view );

			this.respondControllers.push( controller );
		}.bind( this ) );
	}
}

export default CommentsController;