class CommentsController {
	
	constructor( commentsRespondFactory ) {
		this.commentsRespondFactory = commentsRespondFactory;

		this.responds = [];
	}

	init() {
		this.createResponds();

		this.responds.forEach( function( set ) {
			set.controller.init();
		} );
	}

	createResponds() {
		let $responds = $( document.getElementsByClassName( 'comments__box' )[0] ).find( '.commentsRespond' );

		$responds.each( function( i, elem ) {
			this.responds.push( this.commentsRespondFactory.createRespond( elem ) );
		}.bind( this ) );
	}
}

export default CommentsController;