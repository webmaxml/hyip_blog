import Backbone from 'backbone';

let ProfitCalcChartView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementById( 'chart' );
		this.$el = $( this.el );
	}

});

export default ProfitCalcChartView;