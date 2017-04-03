class ModelMapper {

	constructor( plansList, profitCalcChart ) {
		this.plansList = plansList;
		this.profitCalcChart = profitCalcChart;
	}

	initCommon() {

	}

	initRoot() {
		
	}

	initPostItem() {
		
	}

	initHyipItem() {
		this.plansList.init();
		this.profitCalcChart.init();
	}

	initHyipIndex() {
		
	}

	initUser() {
		
	}

}

export default ModelMapper;