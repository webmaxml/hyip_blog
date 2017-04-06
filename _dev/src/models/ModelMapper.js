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
		this.windowModel.init();
	}

	initRoot() {
		this.initCommon();
		this.postTabs.init();
	}

	initPostItem() {
		this.initCommon();
		this.postTabs.init();
	}

	initHyipItem() {
		this.initCommon();
		this.postTabs.init();
		this.plansList.init();
		this.profitCalcChart.init();
	}

	initHyipIndex() {
		this.initCommon();
		this.postTabs.init();
	}

	initUser() {
		this.initCommon();
	}

}

export default ModelMapper;