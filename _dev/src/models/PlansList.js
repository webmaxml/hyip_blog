import Backbone from 'backbone';

const plans = [
	{
		id: 1,
		name: 'Silver',
		percent: 2,
		depositInPayments: true,
		paymentsFrequency: 1,
		period: 75,
		refbackPercent: 5,
		minDeposit: 10,
		maxDeposit: 299
	},

	{
		id: 2,
		name: 'Gold',
		percent: 2.3,
		depositInPayments: true,
		paymentsFrequency: 1,
		period: 77,
		refbackPercent: 5,
		minDeposit: 300,
		maxDeposit: 999
	},

	{
		id: 3,
		name: 'Platinum',
		percent: 1.1,
		depositInPayments: false,
		paymentsFrequency: 1,
		period: 80,
		refbackPercent: 0,
		minDeposit: 1000,
		maxDeposit: 3000
	}
];

let PlansList = Backbone.Model.extend({

	defaults: {
		plansList: null,
		activePlan: null
	},

	init: function() {
		this.set({
			plansList: plans,
			activePlan: plans[0]
		})
	},

	setActivePlan: function( planId ) {
		if ( typeof planId !== 'number' ) {
			throw new Error( 'to set active plan, you should provide plan id number' );
		}

		let activePlan = _.find( this.get( 'plansList' ), plan => plan.id === planId );
		this.set({ activePlan });
	}

});

export default PlansList;