import CommentsRespondController from '../controllers/CommentsRespondController';
import CommentsRespondView from '../views/CommentsRespondView';

class CommentsRespondFactory {

	createView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'CommentsRespondView element is not an HTML element' );
		}

		return new CommentsRespondView({ el });
	}

	createController( model, view ) {
		if ( typeof model === 'undefined' || typeof view === 'undefined' ) {
			throw new Error( 'model and a view must be provided to CommentsRespondController' );
		}

		return new CommentsRespondController( model, view );
	}

}

export default CommentsRespondFactory;