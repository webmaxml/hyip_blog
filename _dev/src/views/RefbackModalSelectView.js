import Backbone from 'backbone';

let RefbackModalSelectView = Backbone.View.extend({

	init( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'refbackModal__select-wrap' )[0];
		this.$el = $( this.el );

		this.$realSelect = this.$el.find( '.refbackModal__select' );
		this.$fakeSelectValue = this.$el.find( '.refbackModal__pseudo-select-value' );
		this.$fakeSelectOptions = this.$el.find( '.refbackModal__pseudo-option-box' );

		this.delegateEvents({
			'click .refbackModal__pseudo-select': 'handleSelectClick',
			'click .refbackModal__pseudo-option-box': 'handleOptionClick'
		});
	},

	handleSelectClick: function( e ) { this.controller.handleSelectClick( e ); },
	handleOptionClick: function( e ) { this.controller.handleOptionClick( e ); },

	openOptions: function() {
		this.$fakeSelectOptions.addClass( 'refbackModal__pseudo-option-box--open' );
	},

	hideOptions: function() {
		this.$fakeSelectOptions.removeClass( 'refbackModal__pseudo-option-box--open' );
	},

	renderActiveValue: function( value ) {
		let text = this.$fakeSelectOptions.find( `[data-value=${value}]` ).html();

		this.$realSelect.val( value );
		this.$fakeSelectValue.html( text );
	},

	getRealSelectValue: function() {
		return this.$realSelect.val();
	}

});

export default RefbackModalSelectView;