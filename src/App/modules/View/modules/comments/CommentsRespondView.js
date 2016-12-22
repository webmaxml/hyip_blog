import Backbone from 'backbone';

let CommentsRespondView = Backbone.View.extend({

	events: {
		'click': 'switchForm'
	},

	initialize: function() {
		this.$btn = this.$el.find( '.commentsRespond__btn' );
		this.$form = this.$el.find( '.commentsForm__wrap' );

		this.active = false;
	},

	switchForm: function( e ) {
		let target = e.target;

		if ( target !== this.$btn.get(0) ) { return; }

		if ( this.active ) {
			this.$form.fadeOut( 'fast' );
			this.active = !this.active;
		} else {
			this.$form.fadeIn( 'fast' );
			this.active = !this.active;
		}
	}

});

export default CommentsRespondView;