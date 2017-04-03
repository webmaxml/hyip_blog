import Backbone from 'backbone';

let CommentsRespondView = Backbone.View.extend({

	events: {
		'click .commentsRespond__btn': 'handleClick'
	},

	handleClick: function( e ) { this.controller.handleClick( e ) },

	initialize: function( attrs ) {
		this.$form = this.$el.find( '.commentsForm__wrap' );
	},

	init: function( controller ) {
		this.controller = controller;
	},

	show: function() {
		this.$form.fadeIn( 'fast' );
	},

	hide: function() {
		this.$form.fadeOut( 'fast' );
	}

});

export default CommentsRespondView;