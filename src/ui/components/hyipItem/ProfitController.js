import StateMachine from 'javascript-state-machine';

class ProfitController {

	constructor( domainFacade, chart, form ) {
		this.domainFacade = domainFacade;
		this.chart = chart;
		this.form = form;
	}

	init() {
		this.start();
	}

	oncreate() {
		this.chart.setParent( this );
		this.form.setParent( this );

		this.chart.init();
		this.form.init();
	}

	oninit() {
		this.domainFacade.retrievePlans( this.setModuleValues.bind( this ) );
	}

	setModuleValues( plans ) {
		this.setModuleOptions( plans );
		this.setModule( plans[0], plans[0].minDeposit );

		this.setToWork();
	}

	setModuleOptions( plans ) {
		this.form.setOptions( plans );
	}

	setModule( plan, deposit ) {
		this.form.setActiveValues( plan, deposit );
		this.chart.drawChart( plan, deposit );
	}

}

StateMachine.create({
	target: ProfitController.prototype,
	events: [
		{ name: 'start', from: 'none', to: 'create' },
		{ name: 'initialize', from: 'create', to: 'init' },
		{ name: 'setToWork', from: 'init', to: 'work' }

	]
});

export default ProfitController;