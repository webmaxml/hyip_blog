import Backbone from 'backbone';

class PostLoaderController {

	constructor( postLoader, buttonView, containerView, globalData ) {
		_.extend( this, Backbone.Events );

		this.postLoader = postLoader;
		this.buttonView = buttonView;
		this.containerView = containerView;
		this.globalData = globalData;
	}

	init() {
		this.buttonView.init( this );
		this.containerView.init( this );

		_.each( this.globalData.get( 'localData' ).social, ( buttonHtml, key ) => {
			let postId = +key.substring( 3 );

			if ( isNaN( postId ) ) {
				console.warn( 'VK value in localData.social must be "vk-%number%" instead of ' + key );
			}

			this.containerView.addSocialVKButton( postId, buttonHtml );
		} );

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

		let postIds = [];

		$( posts ).map( ( i, elem ) => {
			let id = +$( elem ).data( 'itemId' );

			if ( isNaN( id ) ) {
				console.warn( 'post doesnt have data-item-id attribute' );
			}

	   		postIds.push( id );
	    } );

		postIds.forEach( id => {
			let buttonHtml = this.globalData.get( 'localData' ).social[ 'vk-' + id ];

			if ( typeof buttonHtml === 'undefined' ) {
				console.warn( 'localData.social doesnt have the vk-' + id + ' key' );
			}

			this.containerView.addSocialVKButton( id, buttonHtml );
		} );
	}

}

export default PostLoaderController;