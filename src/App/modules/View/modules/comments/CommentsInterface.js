import CommentsRespondView from './CommentsRespondView';

class CommentsInterface {

	init() {
		let $container = $( document.getElementsByClassName( 'comments__box' )[0] );
		let $responds = $container.find( document.getElementsByClassName( 'commentsRespond' ) );

		$responds.each( function() {
			let view = new CommentsRespondView({ el: this });
		} );
	}

}

export default CommentsInterface