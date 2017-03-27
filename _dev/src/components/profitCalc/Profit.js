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

class Profit {

	constructor( mediator, chart, form ) {
		_.extend( this, Backbone.Events );

		this.mediator = mediator;
		this.chart = chart;
		this.form = form;

		this.listenTo( mediator, 'ui:profitForm:submit', this.setModule );
		this.listenTo( mediator, 'ui:profitChart:created', this.setModuleValues );
	}

	init() {
		this.chart.init();
		this.form.init();
	}

	setModuleValues() {
		this.setModuleOptions( plans );
		this.setModule( plans[0], plans[0].minDeposit );
	}

	setModuleOptions( plans ) {
		this.form.setOptions( plans );
	}

	setModule( plan, deposit, refback ) {
		this.form.setActiveValues( plan, deposit );
		this.chart.drawChart( plan, deposit, refback );
	}

}

export default Profit;