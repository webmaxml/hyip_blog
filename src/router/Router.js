import Backbone from 'backbone';

let MainRouter = Backbone.Router.extend({

	routes: {
		'/': 'root',
		'post.html': 'postItem',
		'hyip_index.html': 'hyipIndex',
		'hyip.html': 'hyipItem',
		'user.html': 'user',

	},

	initialize: function( attrs ) {
		console.log( 'router init' );
		this.controller = attrs.controller;
	},

	root: function() {
		console.log( 'root init' );
		this.controller.root();
	},

	postItem: function() {
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

	constructor( uiFacade ) {
		this.uiFacade = uiFacade;

		this.router = new MainRouter({ controller: this });
		Backbone.history.start({ pushState: true });
	}

	root() {
		this.uiFacade.initRoot();
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

}

export default Router;
