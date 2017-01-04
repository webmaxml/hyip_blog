class ProfitChartController {

	constructor() {
		this.chart = null;
		this.parent = null;
	}

	setParent( parent ) {
		this.parent = parent;
	}

	init() {
		let createChart = this.createChart.bind( this );

		google.charts.load(
			'current', 
			{
				packages: ['corechart', 'line'],
				language: 'ru',
				callback: createChart
			}
		);
	}

	createChart() {
		this.chart = new google.visualization.LineChart( document.getElementById( 'chart' ));

		// change module state after loading & creating chart 
		this.parent.initialize();
	}

	getOptions() {
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
	}

	createRows( plan, deposit, refback ) {
		let rows = [];

		let money = -deposit;

		if ( refback ) {
			money += deposit * ( plan.refbackPercent / 100 );
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
	}

	createData( plan, deposit, refback ) {
		let data = new google.visualization.DataTable();
		data.addColumn( 'number', 'Дни' );
		data.addColumn( 'number', '$' );
		data.addRows( this.createRows( plan, deposit, refback ) );

		return data;
	}

	drawChart( plan, deposit, refback ) {
		let data = this.createData( plan, deposit, refback );
		let options = this.getOptions();

		this.chart.draw(data, options);
	}
}

export default ProfitChartController;