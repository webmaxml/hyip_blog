import Backbone from 'backbone';

let PostTabsButtonView = Backbone.View.extend({

	events: {
		click: 'clickHandle'
	},

	clickHandle: function( e ) { this.controller.clickHandle( e ); },

	init: function( controller ) {
		this.controller = controller;
		this.$btn = this.$el.find( 'button' );
	},

	renderActive: function() {
		this.$btn.addClass( 'tabs__btn--active' );
	},

	renderInactive: function() {
		this.$btn.removeClass( 'tabs__btn--active' );
	}

});

export default PostTabsButtonView;