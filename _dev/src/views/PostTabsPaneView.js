import Backbone from 'backbone';

let PostTabsPaneView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;
	},

	renderActive: function() {
		this.$el.addClass( 'tabs__pane-item--active' );
	},

	renderInactive: function() {
		this.$el.removeClass( 'tabs__pane-item--active' );
	}

});

export default PostTabsPaneView;