import Backbone from 'backbone';

let ProfitCalcFormView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'hyipItemProfit__form' )[0];
		this.$el = $( this.el );

		this.delegateEvents({
			submit: 'handleSubmit'
		});
	},

	handleSubmit: function( event ) { this.controller.handleSubmit( event ); },

});

export default ProfitCalcFormView;