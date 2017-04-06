class ModelMapper {

	constructor( plansList, 
				 profitCalcChart,
				 postTabs,
				 windowModel ) {
		this.plansList = plansList;
		this.profitCalcChart = profitCalcChart;
		this.postTabs = postTabs;
		this.windowModel = windowModel;
	}

	initCommon() {
		this.postTabs.init();
		this.windowModel.init();
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