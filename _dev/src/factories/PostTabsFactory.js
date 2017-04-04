import PostTabsButtonController from '../controllers/PostTabsButtonController';
import PostTabsPaneController from '../controllers/PostTabsPaneController';
import PostTabsButtonView from '../views/PostTabsButtonView';
import PostTabsPaneView from '../views/PostTabsPaneView';

class PostTabsFactory {

	createButtonView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'PostTabsButtonView element is not an HTML element' );
		}

		return new PostTabsButtonView({ el });
	}

	createButtonController( tabs, button, buttonView ) {
		if ( typeof tabs === 'undefined' || 
			 typeof button === 'undefined' || 
			 typeof buttonView === 'undefined' ) {
			throw new Error( 'tabs, button and buttonView must be provided to PostTabsButtonController' );
		}

		return new PostTabsButtonController( tabs, button, buttonView );
	}

	createPaneView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'PostTabsPaneView element is not an HTML element' );
		}

		return new PostTabsPaneView({ el });
	}

	createPaneController( tabs, pane, paneView ) {
		if ( typeof tabs === 'undefined' || 
			 typeof pane === 'undefined' || 
			 typeof paneView === 'undefined' ) {
			throw new Error( 'tabs, pane and paneView must be provided to PostTabsPaneController' );
		}

		return new PostTabsPaneController( tabs, pane, paneView );
	}

}

export default PostTabsFactory;