import Backbone from 'backbone';

let ProfitCalcRefback = Backbone.Model.extend({

	defaults: {
		_plansListInstance: null,
		disabled: null,
		value: null
	},

	initialize: function( attrs	) {
		this.listenTo( attrs._plansListInstance, 'change:activePlan', this.setDisabling );
	},

	setDisabling: function( model, activePlan ) {
		this.set({
			disabled: activePlan.refbackPercent === 0,
			value: false
		})
	},

	toggleValue: function() {
		this.set({ value: !this.get( 'value' ) });
	}				

});

export default ProfitCalcRefback;