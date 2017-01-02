import Backbone from 'backbone';

let InputModel = Backbone.Model.extend({

	defaults: {
		minValue: null,
		maxValue: null,
		value: null
	},

	validate: function( attrs ) {
		let validValue = attrs.value >= attrs.minValue &&
						 attrs.value <= attrs.maxValue;

		if ( !validValue ) {
			return 'Значение вклада должно быть число больше '+attrs.minValue+' и меньше '+attrs.maxValue;
		}
	}					

});

//--------------------------------------------------------------------

let InputView = Backbone.View.extend({

	events: {
		input: 'changeHandler'
	},

	initialize: function( options ) {
		this.listenTo( this.model, 'change:value', this.render );
		this.listenTo( this.model, 'invalid', this.renderError );

		this.$tooltip = this.$el.tooltipster({
			theme: 'tooltipster-borderless',
			side: 'right',
			trigger: 'custom',
			maxWidth: 200,
			distance: 20
		});
	},

	changeHandler: _.debounce( function( e ) {
		this.model.set( { value: +this.$el.val() }, { validate: true } );
	}, 500 ),

	render: function( model, value ) {
		this.$el.tooltipster( 'close' );
		this.$el.val( value );

		return this;
	},

	renderError: function( model, error ) {
		this.$el.tooltipster( 'content', error );
		this.$el.tooltipster( 'open' );
	}


});

//--------------------------------------------------------------------

class ProfitFormInputController {

	init() {
		let el = document.getElementById( 'deposit' );

		this.model = new InputModel();
		this.view = new InputView({ el, model: this.model });
	}

	setValues( plan ) {
		this.model.set({
			minValue: plan.minDeposit,
			maxValue: plan.maxDeposit,
			value: plan.minDeposit
		});
	}

	setValue( deposit ) {
		this.model.set({ value: deposit });
	}

	getValue() {
		return this.model.get( 'value' );
	}

}

export default ProfitFormInputController;