import Backbone from 'backbone';

let UpButtonView = Backbone.View.extend({

	initialize: function() {
		this.listenTo( this.model, 'change:visible', this.render );
	},

	events: {
		click: 'scrollToTop'
	},

	scrollToTop: function( e ) {
		$( "html, body" ).animate({ scrollTop: 0 }, "slow");
	},

	render: function( model, visible ) {
		if ( visible ) {
			this.$el.addClass( 'up--active' );
		} else {
			this.$el.removeClass( 'up--active' );
		}
	}

});

export default UpButtonView;