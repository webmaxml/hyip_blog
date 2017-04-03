import Backbone from 'backbone';

class ProfitCalcChartController {

	constructor( chart, chartView, formView ) {
		_.extend( this, Backbone.Events );

		this.chart = chart;
		this.chartView = chartView;
		this.formView = formView;
	}

	init() {
		this.chartView.init( this );
		this.formView.init( this );

		this.chart.setChartElem( this.chartView.el );
	}

	//------------------------------ View callbacks -------------------------------

	handleSubmit( event ) {
		event.preventDefault();
		this.chart.drawChart();
	}

}

export default ProfitCalcChartController;