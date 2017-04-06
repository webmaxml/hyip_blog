import Backbone from 'backbone';

let UpButtonView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller

		this.el = document.getElementsByClassName( 'up' )[0];
		this.$el = $( this.el );

		this.delegateEvents({
			click: 'handleClick'
		});
	},

	handleClick: function( e ) { this.controller.handleClick( e ); },

	show: function() {
		this.$el.addClass( 'up--active' );
	},

	hide: function() {
		this.$el.removeClass( 'up--active' );
	}

});

export default UpButtonView;
