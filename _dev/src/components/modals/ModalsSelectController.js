import Backbone from 'backbone';

let Model = Backbone.Model.extend({

	defaults: {
		open: false,
		value: null
	}

});

//-------------------------------------------------------

let View = Backbone.View.extend({

	events: {
		'click .refbackModal__pseudo-select': 'toggleOptions',
		'click .refbackModal__pseudo-option-box': 'setActiveValue'
	},

	initialize: function() {
		this.$select = this.$el.find( '.refbackModal__select' );
		this.$pseudoSelectValue = this.$el.find( '.refbackModal__pseudo-select-value' );
		this.$optionBox = this.$el.find( '.refbackModal__pseudo-option-box' );

		this.listenTo( this.model, 'change:open', this.renderOptions );
		this.listenTo( this.model, 'change:value', this.renderValue );

		this.model.set({ value: this.$select.val() });
	},

	toggleOptions: function( e ) {
		let open = this.model.get( 'open' );
		this.model.set({ open: !open });
	},

	setActiveValue: function( e ) {
		let value = $( e.target ).data( 'value' );
		this.model.set({ value });
	},

	renderOptions: function( model, open ) {
		if ( open ) {
			this.$optionBox.addClass( 'refbackModal__pseudo-option-box--open' );
		} else {
			this.$optionBox.removeClass( 'refbackModal__pseudo-option-box--open' );
		}
	},

	renderValue: function( model, value ) {
		let text = this.$optionBox.find( `[data-value=${value}]` ).html();

		this.$select.val( value );
		this.$pseudoSelectValue.html( text );
	}

});


//-------------------------------------------------------

class ModalsSelectController {

	init() {
		let el = document.getElementsByClassName( 'refbackModal__select-wrap' )[0];

		let model = new Model();
		let view = new View({ el, model });
	}

}

export default ModalsSelectController;