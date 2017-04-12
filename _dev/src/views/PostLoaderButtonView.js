import Backbone from 'backbone';

let PostLoaderButtonView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'loader__btn' )[0];
		this.$el = $( this.el );

		this.delegateEvents({
			'click': 'handleClick'
		});
	},

	handleClick: function( e ) { this.controller.handleButtonClick( e ); },

	showLoading: function() {
		this.$el.addClass( 'loader__btn--loading' );
	},

	hideLoading: function() {
		this.$el.removeClass( 'loader__btn--loading' );
	},

	show: function() {
		this.$el.addClass( 'loader__btn--active' );
	},

	hide: function() {
		this.$el.removeClass( 'loader__btn--active' );
	}

});

export default PostLoaderButtonView;


