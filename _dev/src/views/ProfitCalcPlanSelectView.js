import Backbone from 'backbone';
// templates
import optionTemplate from '../templates/profitCalcSelectOption.pug';
import optionPseudoTemplate from '../templates/profitCalcSelectPseudoOption.pug';

let ProfitCalcPlanSelectView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'hyipItemProfit__select-wrap' )[0];
		this.$el = $( this.el );

		this.$selectInput = this.$el.find( '#plan' );
		this.$selectPseudoValue = this.$el.find( '.hyipItemProfit__select-value' );
		this.$optionsPseudo = this.$el.find( '.hyipItemProfit__option-box' );

		this.delegateEvents({
			'click .hyipItemProfit__select': 'handleSelectClick',
			'click .hyipItemProfit__option': 'handleSelectOptionClick'
		});
	},

	handleSelectClick: function( event ) { this.controller.handleSelectClick( event ); },
	handleSelectOptionClick: function( event ) { this.controller.handleSelectOptionClick( event ); },

	setOptions: function( data ) {
		if ( !Array.isArray( data ) ) {
			throw new Error( 'profitCalc select options must be array of objects' );
		}

		let realOptionsHtml = data.map( item => optionTemplate( item ) ).join('');
		let pseudoOptionsHtml = data.map( item => optionPseudoTemplate( item ) ).join('');

		this.$selectInput.html( realOptionsHtml );
		this.$optionsPseudo.html( pseudoOptionsHtml );
	},

	showOptions: function() {
		this.$optionsPseudo.addClass( 'hyipItemProfit__option-box--open' );
	},

	hideOptions: function() {
		this.$optionsPseudo.removeClass( 'hyipItemProfit__option-box--open' );
	},

	renderActiveOption: function( option ) {
		if ( typeof option !== 'object' ) {
			throw new Error( 'profitCalc select active option must be object' );
		}

		this.$selectInput.val( option.id );
		this.$selectPseudoValue.html( option.name );
	}

});

export default ProfitCalcPlanSelectView;