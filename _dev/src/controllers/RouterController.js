import Backbone from 'backbone';

let devRoutes = {
	'': 'root',
	'post.html': 'postItem',
	'hyip_index.html': 'hyipIndex',
	'hyip.html': 'hyipItem',
	'user.html': 'user',
};

let prodRoutes = {
	'hyip/': 'root',
	'hyip/page/:pageNum/': 'rootPage',
	'hyip/category/:catSlug/': 'cats',
	'hyip/article/*slug': 'postItem',
	'hyip_index.html': 'hyipIndex',
	'hyip.html': 'hyipItem',
	'user.html': 'user',
};

let routes = process.env.NODE_ENV === 'development' ? devRoutes : prodRoutes;


let MainRouter = Backbone.Router.extend({

	routes,

	initialize: function( attrs ) {
		this.controller = attrs.controller;
	},

	execute: function( callback, args, name ) {
		this.controller.setQueryParams();

		if ( callback ) {
			callback.apply( this, args );
		}
	},

	root: function() {
		let params = {
			pageNum: 1,
			category: 'all' 
		};

		this.controller.root( params );
	},

	rootPage: function( pageNum ) {
		let params = {
			pageNum: +pageNum,
			category: 'all' 
		};

		this.controller.root( params );
	},

	cats: function( catSlug ) {
		let params = {
			pageNum: 1,
			category: catSlug 
		};

		this.controller.root( params );
	},

	postItem: function( slug ) {
		this.controller.postItem();
	},

	hyipIndex: function() {
		this.controller.hyipIndex();
	},

	hyipItem: function() {
		this.controller.hyipItem();
	},

	user: function() {
		this.controller.user();
	}

});

class RouterController {

	constructor( viewController, mediator ) {
		this.viewController = viewController;
		this.mediator = mediator;

		_.extend( this, Backbone.Events );

		this.router = new MainRouter({ controller: this });
		Backbone.history.start({ pushState: true });

		this.listenTo( this.mediator, 'changeUrl', this.changeUrl );
	}

	root( params ) {
		console.log( 'root init' );
		this.viewController.initRoot( params );
	}

	postItem() {
		this.viewController.initPostItem();
	}


	hyipIndex() {
		this.viewController.initHyipIndex();
	}


	hyipItem() {
		this.viewController.initHyipItem();
	}

	user() {
		this.viewController.initUser();
	}

	changeUrl( fragmet ) {
		let initFragment = Backbone.history.fragment.replace( /page\/\d+\//, '' );

		this.router.navigate( initFragment + fragmet );
		this.setQueryParams();
	}

	setQueryParams() {

	}

}

export default RouterController;
