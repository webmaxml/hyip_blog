import Backbone from 'backbone';

class PostLoaderController {

	constructor( postLoader, buttonView, containerView ) {
		_.extend( this, Backbone.Events );

		this.postLoader = postLoader;
		this.buttonView = buttonView;
		this.containerView = containerView;
	}

	init() {
		this.buttonView.init( this );
		this.containerView.init( this );

		this.listenTo( this.postLoader, 'change:isLastPage', this.setActive );
		this.listenTo( this.postLoader, 'change:loading', this.setLoading );
		this.listenTo( this.postLoader, 'change:posts', this.addPosts );
	}

	//------------------------------ View callbacks -------------------------------

	handleButtonClick( event ) {
		this.postLoader.loadPosts();
	}

	//------------------------------ Model callbacks -------------------------------

	setActive( model, isLastPage ) {
		if ( isLastPage ) {
			this.buttonView.hide();
		} else {
			this.buttonView.show();
		}
	}

	setLoading( model, loading ) {
		if ( loading ) {
			this.buttonView.showLoading();
		} else {
			this.buttonView.hideLoading();
		}
	}

	addPosts( model, posts ) {
		this.containerView.addPosts( posts );
	}

}

export default PostLoaderController;