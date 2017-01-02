import Backbone from 'backbone';

let HyipItemChartView = Backbone.View.extend({

	initialize: function( options ) {
		this.state = options.state;
		this.listenTo( this.model, 'change:formData', this.drawChart );

		this.loadChartApi();
	},

	loadChartApi: function() {
		let createChart = this.createChart.bind( this );

		google.charts.load(
			'current', 
			{
				packages: ['corechart', 'line'],
				language: 'ru',
				callback: createChart
			}
		);
	},

	createChart: function() {
		let chart = new google.visualization.LineChart( this.el );
		this.model.set({ chartInstance: chart });

		// change module state after loading & creating chart 
		this.state.initialize();
	},

	getOptions: function() {
		return {
			lineWidth: 3,
			vAxis: {
				title: '$'
			},
			hAxis: {
			    title: 'Дни'
			},
			legend: 'none',
			series: {
				0: { color: '#ff5b24' }
			},
			animation:{
				startup: true,
		        duration: 400,
		        easing: 'out',
		    },
		};
	},

	createRows: function( formData ) {
		let rows = [];

		let deposit = +formData.deposit;
		let planId = +formData.plan;
		let plan = _.find( this.model.get( 'plans' ), plan => planId === plan.id );
		let refback = formData.refback === 'on' ? plan.refbackPercent : 0;

		let money = -deposit;

		if ( refback ) {
			money += deposit * ( refback / 100 );
		};

		for ( let i = 1; i < plan.period; i++ ) {
			money += deposit * ( plan.percent / 100 );

			rows.push([ i, money ]);
		};

		// last day

		if ( plan.depositInPayments ) {
			money += deposit * ( plan.percent / 100 );

			rows.push([ plan.period, money ]);
		} else {
			money += deposit * ( plan.percent / 100 );
			money += deposit;

			rows.push([ plan.period, money ]);
		}

		return rows;
	},

	createData: function( formData ) {
		let data = new google.visualization.DataTable();
		data.addColumn( 'number', 'Дни' );
		data.addColumn( 'number', '$' );
		data.addRows( this.createRows( formData ) );

		return data;
	},

	drawChart: function( model, formData ) {
		let chart = model.get( 'chartInstance' );
		let data = this.createData( formData );
		let options = this.getOptions();

		chart.draw(data, options);
	}

});

export default HyipItemChartView;