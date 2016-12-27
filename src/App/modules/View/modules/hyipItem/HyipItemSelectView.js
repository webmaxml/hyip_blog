import Backbone from 'backbone';
// templates
import optionTemplate from './optionItem.pug';
import optionPseudoTemplate from './optionPseudoItem.pug';

let HyipItemSelectView = Backbone.View.extend({

	events: {
		'click .hyipItemProfit__select': 'toggleOptions',
		'click .hyipItemProfit__option': 'setActiveOption'
	},

	initialize: function( options ) {
		this.state = options.state;
		
		this.$selectInput = this.$el.find( '#plan' );
		this.$selectPseudoValue = this.$el.find( '.hyipItemProfit__select-value' );
		this.$optionsPseudo = this.$el.find( '.hyipItemProfit__option-box' );

		this.listenTo( this.model, 'change:plans', this.setOptions );
		this.listenTo( this.model, 'change:optionsOpen', this.renderOptions );
		this.listenTo( this.model, 'change:activePlanId', this.renderActiveOption );
	},


	// ----------------------- on user input -------------------------


	toggleOptions: function( e ) {
		let open = this.model.get( 'optionsOpen' );
		this.model.set({ optionsOpen: !open });
	},

	setActiveOption: function( e ) {
		let value = $( e.target ).data( 'value' );
		let plans = this.model.get( 'plans' );
		let activePlan = _.find( plans, plan => plan.id === value );

		this.model.set({ activePlanId: activePlan.id });
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

	renderActiveOption: function( model, activePlanId ) {
		let plans = this.model.get( 'plans' );
		let activePlan = _.find( plans, plan => plan.id === activePlanId );

		this.$selectInput.val( activePlan.id );
		this.$selectPseudoValue.html( activePlan.name );
	}

});

export default HyipItemSelectView;