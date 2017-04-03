import Backbone from 'backbone';

let ProfitCalcDepositView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementById( 'deposit' );
		this.$el = $( this.el );

		this.delegateEvents({
			input: 'handleChange'
		});

		this.$tooltip = this.$el.tooltipster({
			theme: 'tooltipster-borderless',
			side: 'right',
			trigger: 'custom',
			maxWidth: 200,
			distance: 20
		});
	},

	handleChange: _.debounce( function( event ) { this.controller.handleChange( event ); }, 500 ),

	render: function( value ) {
		this.$el.tooltipster( 'close' );
		this.$el.val( value );
	},

	renderError: function( error ) {
		this.$el.tooltipster( 'content', error );
		this.$el.tooltipster( 'open' );
	}


});

export default ProfitCalcDepositView;