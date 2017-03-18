import Backbone from 'backbone';

let Model = Backbone.Model.extend({

	defaults: {
		currentPage: null,
		maxPages: null,
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

	constructor( mediator ) {
		this.mediator = mediator;

		this.ajaxAction = 'post_loader';
		this.initAjaxAction = 'init_post_loader';
		this.ajaxSuccess = this.ajaxSuccess.bind( this );
		this.ajaxError = this.ajaxError.bind( this );
	}

	init( pageNum ) {
		let button = document.getElementsByClassName( 'loader__btn' )[0];
		let postContainer = document.getElementsByClassName( 'post-box' )[0];

		let model = this.model = new Model({ 
			currentPage: pageNum,
			maxPages: +globalData.articlesMaxPages
		});

		let buttonView = this.buttonView =  new ButtonView({ el: button, model, controller: this });
		let postContainerView = this.postContainerView = new PostContainerView({ el: postContainer, model });

		if ( !this.isLastPage() ) {
			this.buttonView.show();
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

	changeUrl() {
		let currentPage = this.model.get( 'currentPage' );
		let url = 'page/' + currentPage + '/';

		this.mediator.trigger( 'changeArticleUrl', url );
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

		this.postContainerView.renderNewPosts( data.data.html );
		this.incrementPage();
		this.changeUrl();
		
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