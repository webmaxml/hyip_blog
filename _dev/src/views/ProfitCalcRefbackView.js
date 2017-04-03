import Backbone from 'backbone';

let ProfitCalcRefbackView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementById( 'refback' );
		this.$el = $( this.el );

		this.delegateEvents({
			change: 'handleChange'
		});
	},

	handleChange: function( event ) { this.controller.handleChange( event ); },

	disable: function() { 
		this.$el.prop( 'disabled', true );
	},

	enable: function() { 
		this.$el.prop( 'disabled', false );
	},

	render: function( value ) {
		this.$el.prop( 'checked', value );
	}

});

export default ProfitCalcRefbackView;