import Backbone from 'backbone';

let CommentsRespondModel = Backbone.Model.extend({

	defaults: {
		active: false,
	}

});

//-------------------------------------------------------------------

let CommentsRespondView = Backbone.View.extend({

	events: {
		'click': 'switchForm'
	},

	initialize: function() {
		this.$btn = this.$el.find( '.commentsRespond__btn' );
		this.$form = this.$el.find( '.commentsForm__wrap' );

		this.listenTo( this.model, 'change:active', this.render );
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

});

//-------------------------------------------------------------------

class CommentsController {

	init() {
		let $container = $( document.getElementsByClassName( 'comments__box' )[0] );
		let $responds = $container.find( document.getElementsByClassName( 'commentsRespond' ) );

		$responds.each( function() {
			let model = new CommentsRespondModel();
			let view = new CommentsRespondView({ el: this, model });
		} );
	}

}

export default CommentsController;