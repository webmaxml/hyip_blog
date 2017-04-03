import Backbone from 'backbone';

let ProfitCalcPlanSelect = Backbone.Model.extend({

	defaults: {
		open: false,
	},

	toggleOpen: function() {
		this.set({ open: !this.get( 'open' ) });
	}

});

export default ProfitCalcPlanSelect;