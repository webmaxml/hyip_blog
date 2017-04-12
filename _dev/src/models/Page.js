import Backbone from 'backbone';

let Page = Backbone.Model.extend({

	defaults: {
		query: null,
		currentPage: null,
		category: null
	},

	initialize: function( attrs ) {
		this.mediator = attrs._mediator;
	},

	parseUrl: function() {
		this.parseQuery();
		this.parseCurrentPage();
		this.parseCategory();

		console.log( '--Query--' );
		console.log( this.get( 'query' ) );
		console.log( 'current page = ' + this.get( 'currentPage' ) );
		console.log( 'category = ' + this.get( 'category' ) );
	},

	parseQuery: function() {
		let queryExist = /\?.+/.test( location.href );

		if ( queryExist ) {
			let query = {};

			location.href.substring( location.href.search( /\?/ ) + 1 )
					     .split( '&' )
					     .forEach( pair => {
					   		  let key = pair.split( '=' )[0];
					   		  let value = pair.split( '=' )[1];

					   		  query[ key ] = value;
					     } );

			this.set({ query });
		} else {
			this.set({ query: {} });
		}
	},

	parseCurrentPage: function() {
		let pageQueryExist = !isNaN( +this.get( 'query' ).page );
		let pageUriExist = /\/page\/\d+\//.test( location.href );

		if ( pageQueryExist ) { 
			this.set({ currentPage: +this.get( 'query' ).page }); 
		} else if ( pageUriExist ) {
			let currentPageString = location.href.substring( location.href.search( /\/page\/\d+\// ) + 6 )
			let currentPage = +currentPageString.slice( 0, currentPageString.search(/\//) );

			if ( isNaN( currentPage ) ) {
				throw new Error( 'page number is not a number' );
			}

			this.set({ currentPage }); 
		} else {
			this.set({ currentPage: 1 }); 
		}
	},

	parseCategory: function() {
		let categoryExist = /\/category\/\w+\//.test( location.href );

		if ( categoryExist ) {
			let categoryString = location.href.substring( location.href.search( /\/category\/\w+\// ) + 10 )
			let category = categoryString.slice( 0, categoryString.search(/\//) );

			this.set({ category });
		} else {
			this.set({ category: '' });
		}
	},

	incrementPage: function() {
		let currentPage = this.get( 'currentPage' );
		this.set({ currentPage: ++currentPage });

		this.setNextPageUrl();
	},

	setNextPageUrl: function() {
		let pageUriExist = /\/page\/\d+\//.test( Backbone.history.fragment );
		let pageQueryExist = /page=\d+/.test( Backbone.history.fragment );
		let queryExist = /\?.+/.test( Backbone.history.fragment );
		let currentPage = this.get( 'currentPage' );
		let path = '';
		
		if ( pageQueryExist ) {
			path = Backbone.history.fragment.replace( /page=\d+/, `page=${currentPage}` );
		} else if ( pageUriExist ) {
			path = Backbone.history.fragment.replace( /\/page\/\d+\//, `/page/${currentPage}/` );
		} else  {
			path = Backbone.history.fragment + ( queryExist ? `&page=${currentPage}` : `?page=${currentPage}` );
		}

		this.mediator.trigger( 'navigate', path );
	}

});

export default Page;