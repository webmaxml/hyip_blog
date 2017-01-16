import Backbone from 'backbone';
// templates
import optionTemplate from './optionItem.pug';
import optionPseudoTemplate from './optionPseudoItem.pug';

let SelectModel = Backbone.Model.extend({

	defaults: {
		plans: null,
		open: false,
		activePlan: ''
	}

});

//--------------------------------------------------------------------

let SelectView = Backbone.View.extend({

	events: {
		'click .hyipItemProfit__select': 'toggleOptions',
		'click .hyipItemProfit__option': 'setActiveOption'
	},

	initialize: function() {	
		this.$selectInput = this.$el.find( '#plan' );
		this.$selectPseudoValue = this.$el.find( '.hyipItemProfit__select-value' );
		this.$optionsPseudo = this.$el.find( '.hyipItemProfit__option-box' );

		this.listenTo( this.model, 'change:plans', this.setOptions );
		this.listenTo( this.model, 'change:open', this.renderOptions );
		this.listenTo( this.model, 'change:activePlan', this.renderActiveOption );
	},


	// ----------------------- on user input -------------------------


	toggleOptions: function( e ) {
		let open = this.model.get( 'open' );
		this.model.set({ open: !open });
	},

	setActiveOption: function( e ) {
		let value = $( e.target ).data( 'value' );
		let plans = this.model.get( 'plans' );
		let activePlan = _.find( plans, plan => plan.id === value );

		this.model.set({ activePlan });
	},

	// ----------------------- on model change -------------------------


	setOptions: function( model, plans ) {
		let options = [];
		let optionsPseudo = [];

		plans.forEach( plan => {

			options.push( optionTemplate({
				value: plan.id,
				text: plan.name,
			}) );

			optionsPseudo.push( optionPseudoTemplate({
				value: plan.id,
				text: plan.name,
			}) );

		} );

		this.$selectInput.html( options.join("") );
		this.$optionsPseudo.html( optionsPseudo.join("") );
	},

	renderOptions: function( model, open ) {
		if ( open ) {
			this.$optionsPseudo.addClass( 'hyipItemProfit__option-box--open' );
		} else {
			this.$optionsPseudo.removeClass( 'hyipItemProfit__option-box--open' );
		}
	},

	renderActiveOption: function( model, activePlan ) {
		this.$selectInput.val( activePlan.id );
		this.$selectPseudoValue.html( activePlan.name );
	}

});

//--------------------------------------------------------------------

class ProfitFormSelectController {

	constructor( mediator ) {
		_.extend( this, Backbone.Events );

		this.mediator = mediator;
	}


	init() {
		let el = document.getElementsByClassName( 'hyipItemProfit__select-wrap' )[0];

		this.model = new SelectModel();
		this.view = new SelectView({ el, model: this.model });

		this.listenTo( this.model, 'change:activePlan', this.changeActivePlan );
	}

	setOptions( plans ) {
		this.model.set({ plans });
	}

	setActivePlan( plan ) {
		this.model.set({ activePlan: plan });
	}

	getActivePlan() {
		return this.model.get( 'activePlan' );
	}

	changeActivePlan( model, activePlan ) {
		this.mediator.trigger( 'ui:profitFormSelect:changePlan', activePlan );
	}

}

export default ProfitFormSelectController;