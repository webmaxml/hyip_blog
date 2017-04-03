import Backbone from 'backbone';

let ProfitCalcChart = Backbone.Model.extend({

	defaults: {
		_plansListInstance: null,
		_depositInstance: null,
		_refbackInstance: null,
		chartElem: null,
		chartInstance: null,
		options: {
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
		}
	},

	initialize: function( attrs ) {
		this.set({
			_plansListInstance: attrs._plansListInstance,
			_depositInstance: attrs._depositInstance,
			_refbackInstance: attrs._refbackInstance
		})
	},

	init: function() {
		google.charts.load(
			'current', 
			{
				packages: ['corechart', 'line'],
				language: 'ru',
				callback: () => {
					this.createChartInstance();
					this.drawChart();
				}
			}
		);
	},

	setChartElem: function( elem ) {
		this.set({ chartElem: elem });
	},

	createChartInstance: function() {
		if ( this.get( 'chartElem' ) === null ) {
			throw new Error( 'ProfitCalc chart element is no set' );
		}

		let instance = new google.visualization.LineChart( this.get( 'chartElem' ) );
		this.set({ chartInstance: instance });
	},

	drawChart: function() {
		let chart = this.get( 'chartInstance' );
		let data = this.createData();
		let options = this.get( 'options' );

		chart.draw(data, options);
	},

	createData: function() {
		let data = new google.visualization.DataTable();
		let activePlan = this.get( '_plansListInstance' ).get( 'activePlan' );
		let deposit = this.get( '_depositInstance' ).get( 'value' );
		let refback = this.get( '_refbackInstance' ).get( 'value' );

		data.addColumn( 'number', 'Дни' );
		data.addColumn( 'number', '$' );
		data.addRows( this.createRows( activePlan, deposit, refback ) );

		return data;
	},

	createRows: function( plan, deposit, refback ) {
		let rows = [];

		let money = -deposit;

		if ( refback ) {
			money += deposit * ( plan.refbackPercent / 100 );
		};

		for ( let i = 1; i < plan.period; i++ ) {
			money += +( deposit * ( plan.percent / 100 ) ).toFixed(2);

			rows.push([ i, money ]);
		};

		// last day

		if ( plan.depositInPayments ) {
			money += +( deposit * ( plan.percent / 100 ) ).toFixed(2);

			rows.push([ plan.period, money ]);
		} else {
			money += +( deposit * ( plan.percent / 100 ) ).toFixed(2);
			money += deposit;

			rows.push([ plan.period, money ]);
		}

		return rows;
	}

	
				
});

export default ProfitCalcChart;