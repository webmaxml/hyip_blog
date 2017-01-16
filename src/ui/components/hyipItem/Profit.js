import Backbone from 'backbone';

class Profit {

	constructor( domainFacade, mediator, chart, form ) {
		_.extend( this, Backbone.Events );

		this.domainFacade = domainFacade;
		this.mediator = mediator;
		this.chart = chart;
		this.form = form;

		this.listenTo( mediator, 'domain:plansList:loaded', this.setModuleValues );
		this.listenTo( mediator, 'ui:profitForm:submit', this.setModule );
		this.listenTo( mediator, 'ui:profitChart:created', this.loadData );
	}

	init() {
		this.chart.init();
		this.form.init();
	}

	loadData() {
		this.domainFacade.loadPlans();
	}

	setModuleValues( plans ) {
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