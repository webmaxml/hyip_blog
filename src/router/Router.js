import Backbone from 'backbone';

let MainRouter = Backbone.Router.extend({

	routes: {
		'': 'root',
		'post.html': 'postItem',
		'hyip_index.html': 'hyipIndex',
		'hyip.html': 'hyipItem',

	},

	initialize: function( attrs ) {
		this.controller = attrs.controller;
	},

	root: function() {
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

}

export default Router;
