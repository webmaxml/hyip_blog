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
	'hyip/category/:catSlug/': 'root',
	'hyip/article/*slug': 'postItem',
	'hyip_index.html': 'hyipIndex',
	'hyip.html': 'hyipItem',
	'user.html': 'user',
};

let routes = process.env.NODE_ENV === 'development' ? devRoutes : prodRoutes;


let RouterController = Backbone.Router.extend({

	routes,

	initialize: function( attrs ) {
		this.viewMapper = attrs._viewMapper;
		this.modelMapper = attrs._modelMapper;
		this.mediator = attrs._mediator;
		this.page = attrs._page;

		this.listenTo( this.mediator, 'navigate', this.changeUrl );

		Backbone.history.start({ pushState: true });
	},

	execute: function( callback, args, name ) {
		if ( callback ) {
			this.page.parseUrl();
			callback.apply( this, args );
		}
	},

	root: function() {
		this.viewMapper.initRoot();
		this.modelMapper.initRoot();
	},

	postItem: function() {
		this.viewMapper.initPostItem();
		this.modelMapper.initPostItem();
	},

	hyipIndex: function() {
		this.viewMapper.initHyipIndex();
		this.modelMapper.initHyipIndex();
	},

	hyipItem: function() {
		this.viewMapper.initHyipItem();
		this.modelMapper.initHyipItem();
	},

	user: function() {
		this.viewMapper.initUser();
		this.modelMapper.initUser();
	},

	changeUrl: function( path ) {
		console.log( 'changing url - ' + path );
		this.navigate( path );
	}

});

export default RouterController;
