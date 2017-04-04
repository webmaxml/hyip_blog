class ModelMapper {

	constructor( plansList, 
				 profitCalcChart,
				 postTabs ) {
		this.plansList = plansList;
		this.profitCalcChart = profitCalcChart;
		this.postTabs = postTabs;
	}

	initCommon() {
		this.postTabs.init();
	}

	initRoot() {
		this.initCommon();
	}

	initPostItem() {
		this.initCommon();
	}

	initHyipItem() {
		this.initCommon();
		this.plansList.init();
		this.profitCalcChart.init();
	}

	initHyipIndex() {
		this.initCommon();
	}

	initUser() {
		this.initCommon();
	}

}

export default ModelMapper;