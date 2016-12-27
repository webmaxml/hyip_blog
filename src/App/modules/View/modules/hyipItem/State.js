import StateMachine from 'javascript-state-machine';
import HyipItemFormView from './HyipItemFormView';
import HyipItemSelectView from './HyipItemSelectView';
import HyipItemChartView from './HyipItemChartView';
import HyipItemModel from './HyipItemModel';

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
		refbackPercent: 5,
		minDeposit: 1000,
		maxDeposit: 3000
	}
];

class State {

	constructor() {
		this.start();
	}

	oncreate() {
		let form = document.getElementsByClassName( 'hyipItemProfit__form' )[0];
		let chart = document.getElementById( 'chart' );
		let select = document.getElementsByClassName( 'hyipItemProfit__select-wrap' )[0];

		let model = this.model = new HyipItemModel();

		this.formView = new HyipItemFormView({ el: form, model, state: this });
		this.chartView = new HyipItemChartView({ el: chart, model, state: this });
		this.selectView = new HyipItemSelectView({ el: select, model, state: this });
	}

	oninit() {
		this.model.set({ plans });
		this.model.set({ activePlanId: plans[0].id });
		this.model.set({ formData: {
			plan: plans[0].id,
			deposit: plans[0].minDeposit
		} });

		this.setToWork();
	}

}

StateMachine.create({
	target: State.prototype,
	events: [
		{ name: 'start', from: 'none', to: 'create' },
		{ name: 'initialize', from: 'create', to: 'init' },
		{ name: 'setToWork', from: 'init', to: 'work' }

	]
});

export default State;