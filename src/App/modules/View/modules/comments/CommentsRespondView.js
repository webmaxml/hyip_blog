import Backbone from 'backbone';

let CommentsRespondView = Backbone.View.extend({

	events: {
		'click': 'switchForm'
	},

	initialize: function() {
		this.$btn = this.$el.find( '.commentsRespond__btn' );
		this.$form = this.$el.find( '.commentsForm__wrap' );

		this.listenTo( this.model, 'change:active', this.render );
		this.listenTo( this.model, 'change:obj', this.test );
	},

	switchForm: function( e ) {
		let target = e.target;

		if ( target !== this.$btn.get(0) ) { return; }

		let active = this.model.get( 'active' );
		this.model.set({ active: !active });
	},

	render: function( model, active ) {
		if ( active ) {
			this.$form.fadeIn( 'fast' );
		} else {
			this.$form.fadeOut( 'fast' );
		}

		return this;
	},

	test: function( model, value ) {
		console.log( 'callback - ' + value.name );
	}

});

export default CommentsRespondView;