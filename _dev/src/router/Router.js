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
	'hyip/page/:pageNum/': 'root',
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

	root: function( pageNum ) {
		this.controller.root( pageNum );
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

class Router {

	constructor( uiFacade, mediator ) {
		this.uiFacade = uiFacade;
		this.mediator = mediator;

		_.extend( this, Backbone.Events );

		this.router = new MainRouter({ controller: this });
		Backbone.history.start({ pushState: true });

		this.listenTo( this.mediator, 'changeArticleUrl', this.changeArticleUrl );
	}

	root( pageNum ) {
		if ( !pageNum ) { 
			pageNum = 1; 
		};

		this.uiFacade.initRoot( +pageNum );
	}

	postItem() {
		this.uiFacade.initPostItem();
	}


	hyipIndex() {
		this.uiFacade.initHyipIndex();
	}


	hyipItem() {
		this.uiFacade.initHyipItem();
	}

	user() {
		this.uiFacade.initUser();
	}

	changeArticleUrl( url ) {
		this.router.navigate( 'hyip/' + url );
	}

}

export default Router;
