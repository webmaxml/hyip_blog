import Backbone from 'backbone';

let Router = Backbone.Router.extend({

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

class RouterController {

	constructor( uiController ) {
		this.uiController = uiController;

		this.router = new Router({ controller: this });
		Backbone.history.start({ pushState: true });
	}

	root() {
		this.uiController.initRoot();
	}

	postItem() {
		this.uiController.initPostItem();
	}


	hyipIndex() {
		this.uiController.initHyipIndex();
	}


	hyipItem() {
		this.uiController.initHyipItem();
	}

}

export default RouterController;
