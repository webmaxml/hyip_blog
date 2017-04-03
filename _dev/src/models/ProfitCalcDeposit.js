import Backbone from 'backbone';

let ProfitCalcDeposit = Backbone.Model.extend({

	defaults: {
		_plansListInstance: null,
		minValue: null,
		maxValue: null,
		value: null
	},

	initialize: function( attrs ) {
		this.listenTo( attrs._plansListInstance, 'change:activePlan', this.setValues );
	},

	setValues: function( model, activePlan ) {
		this.set({
			minValue: activePlan.minDeposit,
			maxValue: activePlan.maxDeposit,
			value: activePlan.minDeposit
		});
	},

	validate: function( attrs ) {
		let validValue = attrs.value >= attrs.minValue &&
						 attrs.value <= attrs.maxValue;

		if ( !validValue ) {
			return 'Значение вклада должно быть число от '+attrs.minValue+' до '+attrs.maxValue;
		}
	}					

});

export default ProfitCalcDeposit;