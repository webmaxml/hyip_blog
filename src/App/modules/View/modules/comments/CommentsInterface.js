import CommentsRespondView from './CommentsRespondView';
import CommentsRespondModel from './CommentsRespondModel';

class CommentsInterface {

	init() {
		let $container = $( document.getElementsByClassName( 'comments__box' )[0] );
		let $responds = $container.find( document.getElementsByClassName( 'commentsRespond' ) );

		$responds.each( function() {
			let model = new CommentsRespondModel();
			let view = new CommentsRespondView({ el: this, model });
		} );
	}

}

export default CommentsInterface