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
			url: this.globalData.get( 'ajaxUrl' ),
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
		let maxPages = this.globalData.get( 'localData' ).maxPages;
		let currentPage = this.page.get( 'currentPage' );

		if ( typeof maxPages === 'undefined' ) {
			console.warn( 'undefined maxPages for post loading proccessing' );
		}

		if ( currentPage >= maxPages ) {
			this.set({ isLastPage: true });
		} else {
			this.set({ isLastPage: false });
		}

	},

	ajaxSuccess: function( data ) {
		if ( typeof data.data.html !== 'string' || 
			 typeof data.success !== 'boolean' ) {
			console.warn( 'post loader must receive { success: bool, data: { html: string } }' );
		}

		this.set({ loading: false });
		this.set({ posts: data.data.html });

		this.page.incrementPage();
		this.checkIfLastPage();
	},

	ajaxError: function( xhr, status, error ) {
		this.set({ loading: false });
		console.warn( error );
	}

});

export default PostLoader;