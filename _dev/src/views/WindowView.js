import Backbone from 'backbone';

let WindowView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = window;
		this.$el = $( this.el );

		this.delegateEvents({
			scroll: 'handleScroll'
		});
	},

	handleScroll: _.throttle( function( e ) { this.controller.handleScroll( e ); }, 500 )

});

export default WindowView;