import Backbone from 'backbone';

let PostLoader = Backbone.Model.extend({

	defaults: {
		isLastPage: null,
		loading: false,
		posts: null
	},

	initialize: function( attrs ) {
		this.globalData = attrs._globalData;
		this.page = attrs._page;

		this.ajaxAction = 'post_loader';
	},

	init: function() {
		this.checkIfLastPage();
	},

	loadPosts: function() {
		if ( this.get( 'isLastPage' ) || this.get( 'loading' ) ) {
			return;
		}

		this.set({ 'loading': true });

		$.ajax({
			url: this.globalData.getAjaxUrl(),
			type: 'POST',
			dataType: 'json',
			data: {
				action: this.ajaxAction,
				currentPage: this.page.get( 'currentPage' ),
				category: this.page.get( 'category' )
			},
			success: this.ajaxSuccess.bind( this ),
			error: this.ajaxError.bind( this )
		});
	},

	checkIfLastPage: function() {
		let maxPages = this.globalData.getLocalData().maxPages;
		let currentPage = this.page.get( 'currentPage' );

		if ( typeof maxPages === 'undefined' ) {
			throw new Error( 'undefined maxPages for post loading proccessing' );
		}

		if ( currentPage >= maxPages ) {
			this.set({ isLastPage: true });
		} else {
			this.set({ isLastPage: false });
		}

	},

	ajaxSuccess: function( data ) {
		this.set({ loading: false });
		this.set({ posts: data.data.html });

		this.page.incrementPage();
		this.checkIfLastPage();

		console.log( data );
	},

	ajaxError: function( xhr, status, error ) {
		this.set({ loading: false });
		console.log( status );
		console.log( error );
	}

});

export default PostLoader;