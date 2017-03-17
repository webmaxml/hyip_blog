import Backbone from 'backbone';

let Model = Backbone.Model.extend({

	defaults: {
		currentPage: 1,
		maxPages: +globalData.articlesNumPages,
		loading: false
	}

});

//-------------------------------------------------------

let ButtonView = Backbone.View.extend({

	events: {
		'click': 'submitHandler'
	},

	initialize: function( attrs ) {
		this.controller = attrs.controller;
		this.activeClass = 'loader__btn--active';
		this.loadingClass = 'loader__btn--loading';

		this.listenTo( this.model, 'change:loading', this.renderLoading );

		this.show();
	},

	submitHandler: function( e ) {
		e.preventDefault();

		this.controller.ajaxSend();
	},

	renderLoading: function( model, loading ) {
		if ( loading ) {
			this.$el.addClass( this.loadingClass );
		} else {
			this.$el.removeClass( this.loadingClass );
		}
	},

	show: function() {
		this.$el.addClass( this.activeClass );
	},

	hide: function() {
		this.$el.removeClass( this.activeClass );
	}

});

//-------------------------------------------------------

let PostContainerView = Backbone.View.extend({

	renderNewPosts: function( htmlString ) {
		$( htmlString ).hide()
					   .appendTo( this.$el )
					   .fadeIn( 'fast' );
	}

});

//-------------------------------------------------------

class PostLoaderController {

	constructor() {
		this.ajaxAction = 'post_loader';
		this.hasMultiplePages = +globalData.articlesNumPages > 1;

		this.ajaxSend = this.ajaxSend.bind( this );
		this.ajaxSuccess = this.ajaxSuccess.bind( this );
		this.ajaxError = this.ajaxError.bind( this );
	}

	init() {
		if ( this.hasMultiplePages ) {
			let button = document.getElementsByClassName( 'loader__btn' )[0];
			let postContainer = document.getElementsByClassName( 'post-box' )[0];

			let model = this.model = new Model();
			let buttonView = this.buttonView =  new ButtonView({ el: button, model, controller: this });
			let postContainerView = this.postContainerView = new PostContainerView({ el: postContainer, model });
		}
	}

	isLastPage() {
		let currentPage = this.model.get( 'currentPage' );
		let maxPages = this.model.get( 'maxPages' );

		return currentPage >= maxPages;
	}

	incrementPage() {
		let currentPage = this.model.get( 'currentPage' );
		this.model.set({ currentPage: ++currentPage });
	}

	ajaxSend() {
		if ( this.isLastPage() || this.model.get( 'loading') ) { 
			return; 
		}

		this.model.set({ loading: true });

		$.ajax({
			url: globalData.ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: {
				action: this.ajaxAction,
				currentPage: this.model.get( 'currentPage' )
			},
			success: this.ajaxSuccess,
			error: this.ajaxError
		});
	}

	ajaxSuccess( data ) {
		this.model.set({ loading: false });
		this.postContainerView.renderNewPosts( data.data );
		this.incrementPage();

		if ( this.isLastPage() ) {
			this.buttonView.hide();
		}
	}

	ajaxError( xhr, status, error ) {
		this.model.set({ loading: false });
		console.log( status );
		console.log( error );
	}

	
}

export default PostLoaderController;