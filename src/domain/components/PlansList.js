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

class PlansList {

	constructor( mediator ) {
		this.mediator = mediator;
	}

	loadPlans() {
		this.mediator.trigger( 'domain:plansList:loaded', plans );
	}

}

export default PlansList;