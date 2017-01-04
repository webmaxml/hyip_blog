import Backbone from 'backbone';

let Model = Backbone.Model.extend({

	defaults: {
		disabled: null,
		value: null
	},				

});

//--------------------------------------------------------------------

let View = Backbone.View.extend({

	events: {
		change: 'changeHandler'
	},

	initialize: function( options ) {
		this.listenTo( this.model, 'change:disabled', this.toggle );
		this.listenTo( this.model, 'change:value', this.render );
	},

	changeHandler: function( e ) {
		let value = this.model.get( 'value' );
		this.model.set({ value: !value });
	},

	toggle: function( model, disabled ) {
		this.$el.prop( 'disabled', disabled );
	},

	render: function( model, value ) {
		this.$el.prop( 'checked', value );
	}

});

//--------------------------------------------------------------------

class ProfitFormCheckboxController {

	init() {
		let el = document.getElementById( 'refback' );

		this.model = new Model();
		this.view = new View({ el, model: this.model });
	}

	setValues( plan ) {
		this.model.set({
			disabled: plan.refbackPercent === 0,
			value: false
		});
	}

	getValue() {
		return this.model.get( 'value' );
	}

}

export default ProfitFormCheckboxController;