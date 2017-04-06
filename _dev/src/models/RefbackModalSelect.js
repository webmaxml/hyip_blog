import Backbone from 'backbone';

let RefbackModalSelect = Backbone.Model.extend({

	defaults: {
		open: false,
		value: null
	},

	init: function( value ) {
		this.set({ value });
	},

	toggleOpen: function() {
		this.set({ open: !this.get( 'open' ) });
	}

});

export default RefbackModalSelect;