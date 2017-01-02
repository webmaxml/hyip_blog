import StateMachine from 'javascript-state-machine';
import Backbone from 'backbone';
import Bottle from 'bottlejs';
import HyipItemFormView from './HyipItemFormView';
import HyipItemSelectView from './HyipItemSelectView';
import HyipItemChartView from './HyipItemChartView';
import HyipItemInputView from './HyipItemInputView';
import HyipItemModel from './HyipItemModel';
// templates
import optionTemplate from './optionItem.pug';
import optionPseudoTemplate from './optionPseudoItem.pug';



class State {

	constructor() {
		this.start();
	}

	oncreate() {
		let form = document.getElementsByClassName( 'hyipItemProfit__form' )[0];
		let chart = document.getElementById( 'chart' );
		let select = document.getElementsByClassName( 'hyipItemProfit__select-wrap' )[0];
		let input = document.getElementById( 'deposit' );

		let formModel = this.model = new HyipItemModel();

		this.formView = new HyipItemFormView({ el: form, model: formModel, state: this });
		this.chartView = new HyipItemChartView({ el: chart, model: formModel, state: this });
		this.selectView = new HyipItemSelectView({ el: select, model: formModel, state: this });
		this.inputView = new HyipItemInputView({ el: input, model: formModel, state: this });
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


//--------- testing



//--------------------------------------------------------------------



//--------------------------------------------------------------------



//--------------------------------------------------------------------





//--------------------------------------------------------------------




//--------------------------------------------------------------------



//--------------------------------------------------------------------



//--------------------------------------------------------------------